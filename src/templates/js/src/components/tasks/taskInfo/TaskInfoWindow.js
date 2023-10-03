import taskModel from '../../../models/taskModel.js'
import { TaskInfoView } from './TaskInfoView.js'
import projectModel from '../../../models/projectModel.js'
import taskTypeModel from '../../../models/taskTypeModel.js'
import taskPriorityModel from '../../../models/taskPriorityModel.js'
import taskConditionModel from '../../../models/taskConditionModel.js'
import employeeModel from '../../../models/employeeModel.js'
import commentModel from '../../../models/commentModel.js'
import linkedTaskModel from '../../../models/linkedTasksModel.js'

export class TaskInfoWindow {
    constructor() {
        this.view
        this.onSelect
        this.firstcondition = ""
        this.lastcondition = ""
        this.employeeOptions = [{id: -1, name: ""}]
        this.priorityOptions = [{id: -1, name: ""}]
        this.typeOptions = [{id: -1, name: ""}]
        this.conditionOptions = [{id: -1, name: ""}]
        this.projectOptions = [{id: -1, name: ""}]
    }

    init() {
        this.attachEvents()
    }

    config() {
        return TaskInfoView()
    }

    attachEvents() {
        this.view = {
            window: $$('taskInfo'),
            form: $$('tInfoForm'),
            button: {
                close: $$('tClose'),
                save: $$('tSave'),
            },
            input: {
                id: $$('tID'),
                name: $$('tNameTB'),
                project: $$('tProjectPicker'),
                type: $$('tTypePicker'),
                desc: $$('tDescTB'),
                priority: $$('tPriorityPicker'),
                employee: $$('tEmployeePicker'),
                watcher: $$('tWatcherPicker'),
                creator: $$('tCreatorPicker'),
                time: $$('tTimeTB'),
                factTime: $$('tFactTimeTB'),
                condition: $$('tConditionPicker'),
                comment: $$('tCommentTB')
            },
        },

            // Обработка состояния при ручном выборе состояния
            this.view.input.condition.attachEvent('onChange', () => {
                this.switchStatus()
            })
        // Получение значения инпута состояния
        this.view.input.condition.attachEvent('onFocus', () => {
            this.lastcondition = this.view.input.condition.getValue()
        })
        // Обработка состояния при изменении инпутов сотрудника, ожидаемого времени и фактического времени
        this.view.input.employee.attachEvent('onChange', () => {
            this.inputCheck()
        })
        this.view.input.time.attachEvent('onChange', () => {
            this.inputCheck()
        })
        this.view.input.factTime.attachEvent('onChange', () => {
            this.inputCheck()
        })

        // Обработка нажатия на кнопку закрыть
        this.view.button.close.attachEvent('onItemClick', () => {
            this.hide()
        }),

            // Обработка нажатия на кнопку сохранить
            this.view.button.save.attachEvent('onItemClick', async () => {
                let time = this.view.input.time.getValue()
                let factTime = this.view.input.factTime.getValue()
                let comment = this.view.input.comment.getValue();
                if (this.view.form.validate() && (this.IsValidation(time, true) && this.IsValidation(factTime, true)) && (comment.trim() !== "")) {
                    //...
                    let object = this.fetch();
                    let change = this.firstcondition + "->" + this.view.input.condition.getValue();
                    let id = sessionStorage.getItem("userID");
                    if(id !== null)
                    {
                        await linkedTaskModel.getLinkedTasks().then(data => {
                            let temp = data.find(o => o.task2.toString() === object.id);
                            if ((temp !== null && object.condition == "4") || (temp === null))
                            {
                                webix.message("Сохранение")
                                commentModel.createComment({task: object.id, comment: comment, change: change, employee: id, date: new Date()});
                                taskModel.updateTask(object)
                            }
                        });


                    }else webix.message("Ошибка");
                }
            })

    }

    // Метод выбора статуса при ручном выборе значения в списке
    switchStatus() {
        let employee = this.view.input.employee.getValue()
        let time = this.view.input.time.getValue()
        let factTime = this.view.input.factTime.getValue()
        let condition = this.view.input.condition.getValue()
        let haveEmployee = (employee !== "")
        let haveTime = (this.IsValidation(time))
        let haveFactTime = (this.IsValidation(factTime))

        this.view.input.condition.getList().enableItem(Conditions.Appointed.description)
        this.view.input.condition.getList().enableItem(Conditions.Pause.description)
        this.view.input.condition.getList().enableItem(Conditions.Closed.description)
        this.view.input.condition.getList().enableItem(Conditions.Reopened.description)
        if (this.lastcondition === "") {
            this.lastcondition = condition
        }

        {
            switch (condition) {
                case Conditions.Appointed.description:
                    if (this.lastcondition !== Conditions.Created.description)
                        this.view.input.condition.setValue(this.lastcondition)
                    break;
                case Conditions.Created.description:
                    this.view.input.condition.setValue(this.lastcondition)
                    break;
                case Conditions.Pause.description:
                    if (this.lastcondition !== Conditions.Appointed.description) {
                        this.view.input.condition.setValue(this.lastcondition)
                    } else {
                        this.view.input.condition.getList().disableItem(Conditions.Closed.description)
                        this.view.input.condition.getList().disableItem(Conditions.Reopened.description)
                    }
                    break;
                case Conditions.Appointed.description:
                    if (this.lastcondition === Conditions.Pause.description || this.lastcondition === Conditions.Appointed.description 
                        || this.lastcondition === Conditions.Reopened.description) {
                    } else {
                        this.view.input.condition.setValue(this.lastcondition)
                    }
                    break;
                case Conditions.Closed.description:
                    if (haveTime && haveFactTime && haveEmployee && this.lastcondition === Conditions.Appointed.description) {
                        this.view.input.condition.getList().disableItem(Conditions.Appointed.description)
                        this.view.input.condition.getList().disableItem(Conditions.Pause.description)
                        this.view.input.condition.getList().disableItem(Conditions.Closed.description)
                        this.view.input.condition.getList().disableItem(Conditions.Reopened.description)
                    } else {
                        this.view.input.condition.setValue(this.lastcondition)
                       // webix.message("Невозможно перевести задачу в состояние 'Решено'")
                    }
                    break;
                case Conditions.Reopened.description:
                    if (this.lastcondition !== Conditions.Appointed.description) {
                        this.view.input.condition.setValue(this.lastcondition)
                    }else
                    {
                        this.view.input.condition.getList().disableItem(Conditions.Pause.description)
                        this.view.input.condition.getList().disableItem(Conditions.Closed.description)
                    }
                    break;
            }
        }

        this.lastcondition = ""
    }

    // Метод выбора статуса при изменении значений в инпутах
    //Переделать
    inputCheck() {
        let employee = this.view.input.employee.getValue()
        let time = this.view.input.time.getValue()
        let condition = this.view.input.condition.getValue()
        let haveEmployee = (employee != " ")
        let haveTime = (this.IsValidation(time))

        if (haveEmployee) {
            this.view.input.time.enable()
            if (haveTime) {
                this.view.input.factTime.enable()
                if ( condition === Conditions.Appointed.description) {
                    this.view.input.condition.setValue(Conditions.Appointed.description)
                    this.view.input.condition.enable()
                    this.view.input.condition.getList().disableItem(Conditions.Created.description)
                    this.view.input.condition.getList().disableItem(Conditions.Appointed.description)
                }
                else {
                    this.view.input.condition.setValue(Conditions.Appointed.description)
                    this.view.input.time.enable()
                    this.view.input.condition.disable()
                }
            }
            else if (condition === Conditions.Appointed.description) {
                this.view.input.factTime.disable()
                this.view.input.condition.setValue(Conditions.Appointed.description)
                this.view.input.condition.disable()
            }
        } else {
            this.view.input.time.disable()
            this.view.input.factTime.disable()
            this.view.input.condition.setValue(Conditions.Not_Appointed.description)
            this.view.input.condition.disable()
        }
    }

    // Отображение элемента таблицы в окне с информацией
    async show(Item) {
        this.firstcondition = Item.condition;
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




        this.view.window.show();
        this.view.input.project.render();
        this.view.input.employee.render();
        this.view.input.watcher.render();
        this.view.input.creator.render();
        this.view.input.priority.render();
        this.view.input.type.render();
        this.view.input.condition.render();
        this.view.input.id.setValue(Item.id);
        this.view.input.name.setValue(Item.name);
        this.view.input.project.setValue(Item.project);
        this.view.input.type.setValue(Item.type);
        this.view.input.desc.setValue(Item.desc);
        this.view.input.priority.setValue(Item.priority);
        this.view.input.employee.setValue(Item.employee);
        this.view.input.watcher.setValue(Item.watcher);
        this.view.input.creator.setValue(Item.creator);
        this.view.input.time.setValue(Item.time);
        this.view.input.factTime.setValue(Item.factTime);
        this.view.input.condition.setValue(Item.condition);
    }


    /*
    Проверка на допустимость значения
    empty = true   - пустое значение = true; значение является числом = true; остальное = false
    стандарт       - значение является числом = true; остальное = false
    */
    IsValidation(value, empty) {
        if (webix.rules.isNumber(value)) {
            return true
        }
        else {
            if (empty) {
                if (value === "") {
                    return true
                }
                else {
                    return false
                }
            }
            else {
                return false
            }
        }
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
        if (temp.time.trim() === "") temp.time = null;
        if (temp.factTime.trim() === "") temp.factTime = null;
        return temp;
    }

}

// Возможные состояния задачи
const Conditions = {
    Created: Symbol("Создана"),
    Appointed: Symbol("Назначен исполнитель"),
    Check: Symbol("В проверке"),
    Block: Symbol("Заблокирована"),
    Closed: Symbol("Закрыта"),
    Pause: Symbol("Ожидание"),
    Reopened: Symbol("Повторно открыта")
  }