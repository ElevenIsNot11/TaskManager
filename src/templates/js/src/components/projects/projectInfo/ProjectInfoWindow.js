import projectModel from '../../../models/projectModel.js'
import { ProjectInfoView } from './ProjectInfoView.js'
import EmployeeModel from '../../../models/employeeModel.js';

export class ProjectInfoWindow {
    constructor() {
        this.view
        this.onSelect
        this.employeeOptions = [{id: -1, name: ""}];
    }

    init() {
        this.attachEvents()
    }

    config() {
        return ProjectInfoView()
    }

    attachEvents() {
        this.view = {
            form: $$('pInfoForm'),
            window: $$('projectInfo'),

            button: {
                close: $$('pClose'),
                save: $$('pSave'),
            },
            input: {
                id: $$('pID'),
                name: $$('pNameTB'),
                lead: $$('pTeamLeadPicker'),
                desc: $$('pDescTB')
            }
        },

        // Нажатие по кнопке "Закрыть"
        this.view.button.close.attachEvent('onItemClick', () =>{
            this.hide()
        }),

        // Нажатие по кнопке "Сохранить"
        this.view.button.save.attachEvent('onItemClick', () =>{
            if (this.view.form.validate())
            {
                webix.message("Сохранение")
                //...
                console.log(this.fetch())
                projectModel.updateProject(this.fetch())
            }
        })
    }

    // Отобразить элемент таблицы в окне с информацией
    async show(Item) {

        let options = []; 
        await EmployeeModel.getEmployees().then(data => {
            for (const row of data){
                options.push(row.firstName+' '+row.lastName+' '+row.patronymic);
                this.employeeOptions.push({id: row.id, lead: row.firstName+' '+row.lastName+' '+row.patronymic});
            }
        });


        this.view.window.show();
        this.view.input.id.setValue(Item.id);
        this.view.input.name.setValue(Item.name);
        this.view.input.lead.define("options", options);
        this.view.input.lead.render();
        this.view.input.lead.setValue(Item.lead);
        this.view.input.desc.setValue(Item.desc);
    }

    // Скрыть окно с информацией
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