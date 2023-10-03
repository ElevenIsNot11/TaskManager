import taskModel from '../../../models/taskModel.js'
import { TaskWindowView } from './TaskWindowView.js'

export class CTaskWindow{
    constructor() {
        this.view
        this.onChange // ?
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
        }

    // Очистка формы
    this.view.button.clear.attachEvent('onItemClick', () => {this.view.form.clear()})
    // Закрыть форму
    this.view.button.cancel.attachEvent('onItemClick', () => {this.hide()})
    // Добавление
    this.view.button.add.attachEvent('onItemClick', () => {
        let exptime = this.fetch().expectedTime
        if (this.view.form.validate() && (exptime === "" || webix.rules.isNumber(exptime)))
        {
            webix.message("Добавление задачи")
            // ...
            // Выбор подходящего состояния задачи
            var value_object = this.view.form.getValues()
            if (value_object.employee === "")
            {
                value_object.condition = "Новая"
            }else if (value_object.expectedTime === "" && value_object.time === "")
            {
                value_object.condition = "Назначена"
            }else
            {
                value_object.condition = "В работе"
            }
            console.log(value_object)
            taskModel.createTask(value_object)
            this.hide()
        }
    })

    // Очистка окна при закрытии
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