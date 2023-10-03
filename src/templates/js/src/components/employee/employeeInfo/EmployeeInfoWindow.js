import employeeModel from '../../../models/employeeModel.js'
import { EmployeeInfoView } from './EmployeeInfoView.js'

export class EmployeeInfoWindow {
    constructor() {
        this.view
        this.onSelect
    }

    init() {
        this.attachEvents()
    }

    config() {
        return EmployeeInfoView()
    }

    attachEvents() {
        this.view = {
            form: $$('eInfoForm'),
            window: $$('employeeInfo'),
            button: {
                close: $$('eClose'),
                save: $$('eSave'),
            },
            input:{
                id: $$('eID'),
                firstName: $$('eFirstNameTB'),
                lastName: $$('eLastNameTB'),
                patronymic: $$('ePatronymicTB'),
                date: $$('eDatePicker'),
                adress: $$('eAdressTB')
            },        
        },

        // Нажатие на кнопку "Закрыть"
        this.view.button.close.attachEvent('onItemClick', () =>{
            this.hide()
        }),

        // Нажатие на кнопку "Сохранить"
        this.view.button.save.attachEvent('onItemClick', () =>{
            let date = this.view.input.date.getValue()
            // Создание даты для проверки
            let mindate = new Date("01.01.1901")
            let maxdate = new Date()
            if (this.view.form.validate() && (date == null || (date > mindate && date < maxdate)))
            {
                webix.message("Сохранение")
                //...
                console.log(this.fetch());
                employeeModel.updateEmployee(this.fetch())
            }
        })
    }

    // Отобразить элемент таблицы в окне с информацией
    show(Item) {
        this.view.window.show();
        this.view.input.id.setValue(Item.id);
        this.view.input.firstName.setValue(Item.firstName);
        this.view.input.lastName.setValue(Item.lastName);
        this.view.input.patronymic.setValue(Item.patronymic);
        this.view.input.date.setValue(new Date(Item.date));
        this.view.input.adress.setValue(Item.adress);
    }

    // Скрыть окно
    hide() {
        this.view.window.hide()
        this.view.form.clearValidation()
    }

    // Получить данные
    fetch() {
        let temp = this.view.form.getValues();
        if (temp.date !== null) temp.date = temp.date.toISOString().split('T')[0]
        return temp;
    }

}