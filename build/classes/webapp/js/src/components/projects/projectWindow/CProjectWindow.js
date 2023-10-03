import projectModel from '../../../models/projectModel.js'
import { ProjectWindowView } from './ProjectWindowView.js' 


export class CProjectWindow {
    constructor() {
        this.view
        this.onChange
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
    }

    // Скрыть окно
    hide() {
        this.view.window.hide()
        this.view.form.clearValidation()
    }

    // Получить данные
    fetch() {
        return this.view.form.getValues()
    }


}