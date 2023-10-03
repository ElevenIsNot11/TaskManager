import employeeModel from '../../../models/employeeModel.js'
import { EmployeeWindowView } from './EmployeeWindowView.js'

export class CEmployeeWindow {
    constructor () {
        this.view
        this.onChange
    }

    init() {
        this.attachEvents()
    }

    config() {
        return EmployeeWindowView()
    }

    attachEvents(){
        this.view = {
            window: $$('addEmployee'),
            form: $$('employeeForm'),
            button: {
                clear: $$('eClearButton'),
                cancel: $$('eCancelButton'),
                add: $$('eAddButton'),
            }
        }
    // Очистка формы
    this.view.button.clear.attachEvent('onItemClick', () => {this.view.form.clear()})
    // Закрыть форму
    this.view.button.cancel.attachEvent('onItemClick', () => {this.hide()})
    // Добавление
    this.view.button.add.attachEvent('onItemClick', () => {
        var date = this.view.form.getValues().date
        // Создание даты для проверки
        var mindate = new Date("01.01.1901")
        var maxdate = new Date()
        if (this.view.form.validate() && (date == null || (date > mindate && date < maxdate)))
        {
            webix.message("Добавление задачи")
            // ...
            console.log(this.fetch()) // убрать
            employeeModel.createEmployee(this.fetch())
            this.hide()
        }
    })
    // Очистка формы при закрытии
    this.view.window.attachEvent('onHide', () => {this.view.form.clear()})
    }

    // Скрыть окно
    hide(){
        this.view.window.hide()
        this.view.form.clearValidation()
    }

    // Получить данные
    fetch(){
        return this.view.form.getValues()
    }
}

