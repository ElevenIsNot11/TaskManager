import taskModel from '../../../models/taskModel.js'
import { TaskInfoView } from './TaskInfoView.js'

export class TaskInfoWindow {
    constructor() {
        this.view
        this.onSelect
        this.lastcondition = ""
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
                exptime: $$('tExpTimeTB'),
                time: $$('tTimeTB'),
                condition: $$('tConditionPicker')
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
        this.view.input.exptime.attachEvent('onChange', () => {
            this.inputCheck()
        })
        this.view.input.time.attachEvent('onChange', () => {
            this.inputCheck()
        })

        // Обработка нажатия на кнопку закрыть
        this.view.button.close.attachEvent('onItemClick', () => {
            this.hide()
        }),

            // Обработка нажатия на кнопку сохранить
            this.view.button.save.attachEvent('onItemClick', () => {
                let exptime = this.view.input.exptime.getValue()
                let time = this.view.input.time.getValue()
                if (this.view.form.validate() && (this.IsValidation(exptime, true) && this.IsValidation(time, true))) {
                    webix.message("Сохранение")
                    //...
                    webix.message(TaskInfoView)
                }
            })

    }

    // Метод выбора статуса при ручном выборе значения в списке
    switchStatus() {
        let employee = this.view.input.employee.getValue()
        let exptime = this.view.input.exptime.getValue()
        let time = this.view.input.time.getValue()
        let condition = this.view.input.condition.getValue()
        let haveEmployee = (employee !== "")
        let haveExpTime = (this.IsValidation(exptime))
        let haveTime = (this.IsValidation(time))

        this.view.input.condition.getList().enableItem(Conditions.Work.description)
        this.view.input.condition.getList().enableItem(Conditions.Pause.description)
        this.view.input.condition.getList().enableItem(Conditions.Done.description)
        this.view.input.condition.getList().enableItem(Conditions.Reconc.description)
        if (this.lastcondition === "") {
            this.lastcondition = condition
        }

        {
            switch (condition) {
                case Conditions.Appointed.description:
                    if (this.lastcondition !== Conditions.Not_Appointed.description)
                        this.view.input.condition.setValue(this.lastcondition)
                    break;
                case Conditions.Not_Appointed.description:
                    this.view.input.condition.setValue(this.lastcondition)
                    break;
                case Conditions.Pause.description:
                    if (this.lastcondition !== Conditions.Work.description) {
                        this.view.input.condition.setValue(this.lastcondition)
                    } else {
                        this.view.input.condition.getList().disableItem(Conditions.Done.description)
                        this.view.input.condition.getList().disableItem(Conditions.Reconc.description)
                    }
                    break;
                case Conditions.Work.description:
                    if (this.lastcondition === Conditions.Pause.description || this.lastcondition === Conditions.Appointed.description 
                        || this.lastcondition === Conditions.Reconc.description) {
                    } else {
                        this.view.input.condition.setValue(this.lastcondition)
                    }
                    break;
                case Conditions.Done.description:
                    if (haveExpTime && haveTime && haveEmployee && this.lastcondition === Conditions.Work.description) {
                        this.view.input.condition.getList().disableItem(Conditions.Work.description)
                        this.view.input.condition.getList().disableItem(Conditions.Pause.description)
                        this.view.input.condition.getList().disableItem(Conditions.Done.description)
                        this.view.input.condition.getList().disableItem(Conditions.Reconc.description)
                    } else {
                        this.view.input.condition.setValue(this.lastcondition)
                        webix.message("Невозможно перевести задачу в состояние 'Решено'")
                    }
                    break;
                case Conditions.Reconc.description:
                    if (this.lastcondition !== Conditions.Work.description) {
                        this.view.input.condition.setValue(this.lastcondition)
                    }else
                    {
                        this.view.input.condition.getList().disableItem(Conditions.Pause.description)
                        this.view.input.condition.getList().disableItem(Conditions.Done.description)
                    }
                    break;
            }
        }

        this.lastcondition = ""
    }

    // Метод выбора статуса при изменении значений в инпутах
    inputCheck() {
        let employee = this.view.input.employee.getValue()
        let exptime = this.view.input.exptime.getValue()
        let condition = this.view.input.condition.getValue()
        let haveEmployee = (employee != " ")
        let haveExpTime = (this.IsValidation(exptime))

        if (haveEmployee) {
            this.view.input.exptime.enable()
            if (haveExpTime) {
                this.view.input.time.enable()
                if (condition === Conditions.Appointed.description || condition === Conditions.Work.description 
                    || condition === Conditions.Not_Appointed.description) {
                    this.view.input.condition.setValue(Conditions.Work.description)
                    this.view.input.condition.enable()
                    this.view.input.condition.getList().disableItem(Conditions.Not_Appointed.description)
                    this.view.input.condition.getList().disableItem(Conditions.Appointed.description)
                }
                else {
                    this.view.input.condition.setValue(Conditions.Appointed.description)
                    this.view.input.time.enable()
                    this.view.input.condition.disable()
                }
            }
            else if (condition === Conditions.Appointed.description || condition === Conditions.Work.description) {
                this.view.input.time.disable()
                this.view.input.condition.setValue(Conditions.Appointed.description)
                this.view.input.condition.disable()
            }
        } else {
            this.view.input.exptime.disable()
            this.view.input.time.disable()
            this.view.input.condition.setValue(Conditions.Not_Appointed.description)
            this.view.input.condition.disable()
        }
    }

    // Отображение элемента таблицы в окне с информацией
    show(Item) {
        this.view.window.show();
        this.view.input.id.setValue(Item.id);
        this.view.input.name.setValue(Item.name);
        this.view.input.project.setValue(Item.project);
        this.view.input.type.setValue(Item.type);
        this.view.input.desc.setValue(Item.desc);
        this.view.input.priority.setValue(Item.priority);
        this.view.input.employee.setValue(Item.employee);
        this.view.input.exptime.setValue(Item.exptime);
        this.view.input.time.setValue(Item.time);
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
        return this.view.form.getValues() 
    }

}

// Возможные состояния задачи
const Conditions = {
    Not_Appointed: Symbol("Не назначена"),
    Appointed: Symbol("Назначена"),
    Work: Symbol("В работе"),
    Pause: Symbol("Пауза"),
    Done: Symbol("Решено"),
    Reconc: Symbol("Согласование")
  }