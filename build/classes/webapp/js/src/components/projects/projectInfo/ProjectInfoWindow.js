import projectModel from '../../../models/projectModel.js'
import { ProjectInfoView } from './ProjectInfoView.js'

export class ProjectInfoWindow {
    constructor() {
        this.view
        this.onSelect
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
                teamlead: $$('pTeamLeadPicker'),
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
                //projectModel.updateProject(this.fetch())
            }
        })
    }

    // Отобразить элемент таблицы в окне с информацией
    show(Item) {
        this.view.window.show();
        this.view.input.id.setValue(Item.id);
        this.view.input.name.setValue(Item.name);
        this.view.input.teamlead.setValue(Item.teamlead);
        this.view.input.desc.setValue(Item.desc);
    }

    // Скрыть окно с информацией
    hide() {
        this.view.window.hide()
        this.view.form.clearValidation()
    }

    // Получить данные
    fetch() { 
        return this.view.form.getValues()
    }

}