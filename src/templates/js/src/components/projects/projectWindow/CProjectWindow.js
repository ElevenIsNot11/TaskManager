import projectModel from '../../../models/projectModel.js'
import { ProjectWindowView } from './ProjectWindowView.js' 
import employeeModel from '../../../models/employeeModel.js'


export class CProjectWindow {
    constructor() {
        this.view
        this.onChange
        this.employeeOptions = [{id: -1, name: ""}];
    }

    init() {
        this.attachEvents()
    }

    config() {
        return ProjectWindowView()
    }

    attachEvents() {
        this.view = {
            window: $$('addProject'),
            form: $$('projectForm'),
            button: {
                clear: $$('pClearButton'),
                cancel: $$('pCancelButton'),
                add: $$('pAddButton'),
            },
            input: {
                name: $$('pNameInput'),
                lead: $$('pTeamLeadInput'),
                desc: $$('pDescInput')
            }
        }
    // Очистка формы
    this.view.button.clear.attachEvent('onItemClick', () => {this.view.form.clear()})
    // Закрыть форму
    this.view.button.cancel.attachEvent('onItemClick', () => {this.hide()})
    // Добавление
    this.view.button.add.attachEvent('onItemClick', () => {
        if (this.view.form.validate())
        {
            webix.message("Добавление проекта")
            console.log(this.fetch()) //убрать
            projectModel.createProject(this.fetch())
            this.hide()
        }
    })
    this.view.window.attachEvent('onHide', () => {this.view.form.clear()})
    this.view.window.attachEvent('onShow', async () => {
        let options = []; 
        await employeeModel.getEmployees().then(data => {
            for (const row of data){
                options.push(row.firstName+' '+row.lastName+' '+row.patronymic);
                this.employeeOptions.push({id: row.id, lead: row.firstName+' '+row.lastName+' '+row.patronymic});
            }
        });
        this.view.input.lead.define("options", options);
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
        if (temp.lead.trim() !== "") temp.lead = this.employeeOptions.find(o => o.lead === temp.lead).id;
        temp.lead = null;
        return temp;
    }


}