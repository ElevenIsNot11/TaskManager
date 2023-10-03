import taskModel from '../../../models/taskModel.js'
import { TaskWindowView } from './TaskWindowView.js'
import employeeModel from '../../../models/employeeModel.js'
import projectModel from '../../../models/projectModel.js'
import taskTypeModel from '../../../models/taskTypeModel.js'
import taskPriorityModel from '../../../models/taskPriorityModel.js'
import taskConditionModel from '../../../models/taskConditionModel.js'

export class CTaskWindow{
    constructor() {
        this.view
        this.onChange // ?
        this.employeeOptions = [{id: -1, name: ""}];
        this.priorityOptions = [{id: -1, name: ""}];
        this.typeOptions = [{id: -1, name: ""}];
        this.conditionOptions = [{id: -1, name: ""}];
        this.projectOptions = [{id: -1, name: ""}];
    }

    init() {
        this.attachEvents()
    }

    config() {
        return TaskWindowView()
    }

    attachEvents() {
        this.view = {
            window: $$('addTask'),
            form: $$('taskForm'),
            button: {
                clear: $$('tClearButton'),
                cancel: $$('tCancelButton'),
                add: $$('tAddButton'),
            },
            input: {
                name: $$('tNameInput'),
                project: $$('tProjectInput'),
                type: $$('tTypeInput'),
                desc: $$('tDescInput'),
                priority: $$('tPriorityInput'),
                employee: $$('tEmployeeInput'),
                watcher: $$('tWatcherInput'),
                creator: $$('tCreatorInput'),
                time: $$('tTimeInput'),
                condition: $$('tConditionInput'),
            }
        }

    // Очистка формы
    this.view.button.clear.attachEvent('onItemClick', () => {this.view.form.clear()})
    // Закрыть форму
    this.view.button.cancel.attachEvent('onItemClick', () => {this.hide()})
    // Добавление
    this.view.button.add.attachEvent('onItemClick', () => {
        var obj = this.fetch();
        if (this.view.form.validate() && (obj.time === "" || webix.rules.isNumber(obj.time)))
        {
            webix.message("Добавление задачи")
            if (obj.employee === "")
            {
                obj.condition = 1;
            }else
            { 
                obj.condition = 2;
            }

            console.log(obj)
            taskModel.createTask(obj)
            this.hide()
        }
    })

    // Очистка окна при закрытии
    this.view.window.attachEvent('onHide', () => {this.view.form.clear()})
    this.view.window.attachEvent('onShow', async () => {
        let tempOptions1 = []; 
        let tempOptions2 = []; 
        let tempOptions3 = []; 
        let tempOptions4 = []; 
        let tempOptions5 = []; 
        await employeeModel.getEmployees().then(data => {
            for (const row of data){
                tempOptions1.push(row.firstName+' '+row.lastName+' '+row.patronymic);
                this.employeeOptions.push({id: row.id, name: row.firstName+' '+row.lastName+' '+row.patronymic});
            }
        });

        await projectModel.getProjects().then(data => {
            for (const row of data){
                tempOptions2.push(row.name);
                this.projectOptions.push({id: row.id, name: row.name});
            }
        });

        await taskTypeModel.getTaskTypes().then(data => {
            for (const row of data){
                tempOptions3.push(row.name);
                this.typeOptions.push({id: row.id, name: row.name});
            }
        });

        await taskConditionModel.getTaskConditions().then(data => {
            for (const row of data){
                tempOptions4.push(row.name);
                this.conditionOptions.push({id: row.id, name: row.name});
            }
        });

        await taskPriorityModel.getTaskPriorities().then(data => {
            for (const row of data){
                tempOptions5.push(row.name);
                this.priorityOptions.push({id: row.id, name: row.name});
            }
        });
        //Добавить стандартное значение создателя
        this.view.input.creator.define("options", tempOptions1);
        this.view.input.employee.define("options", tempOptions1);
        this.view.input.watcher.define("options", tempOptions1);
        this.view.input.project.define("options", tempOptions2);
        this.view.input.type.define("options", tempOptions3);
        this.view.input.condition.define("options", tempOptions4);
        this.view.input.priority.define("options", tempOptions5);
    })
    }

    // Скрыть окно
    hide() {
        this.view.window.hide()
        this.view.form.clearValidation()
    }

    // Получить данные
    fetch() {
        let temp = this.view.form.getValues();
        if (temp.creator.trim() !== "") temp.creator = this.employeeOptions.find(o => o.name === temp.creator).id;
        else temp.creator = null;
        if (temp.employee.trim() !== "")temp.employee = this.employeeOptions.find(o => o.name === temp.employee).id;
        else temp.employee = null;
        if (temp.watcher.trim() !== "")temp.watcher = this.employeeOptions.find(o => o.name === temp.watcher).id;
        else temp.watcher = null;
        if (temp.project.trim() !== "")temp.project = this.projectOptions.find(o => o.name === temp.project).id;
        else temp.project = null;
        if (temp.type.trim() !== "")temp.type = this.typeOptions.find(o => o.name === temp.type).id;
        else temp.type = null;
        if (temp.condition.trim() !== "")temp.condition = this.conditionOptions.find(o => o.name === temp.condition).id;
        else temp.condition = null;
        if (temp.priority.trim() !== "")temp.priority = this.priorityOptions.find(o => o.name === temp.priority).id;
        else temp.priority = null;
        return temp;
    }


}