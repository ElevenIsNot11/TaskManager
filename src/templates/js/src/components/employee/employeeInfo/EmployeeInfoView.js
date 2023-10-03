
export function EmployeeInfoView() {
    return {
        id: "employeeInfo",
        css: "info_window",
        width: 350,
        hidden: true,
        body: {
            rows: [
                    // Заголовок
                {
                    view: "template", 
                    css: "header",
                    id: "eHeader",
                    template: "Информация", 
                    type: "header",
                },
                {
                    view: "form",
                    css: "transparent_bg",
                    id: "eInfoForm",
                    elements: [
                        // Неизменяемое поле ID
                        {
                            view: "text", 
                            name: "id",
                            id: "eID", 
                            css: "tb text",
                            width: 170,
                            height: 35,
                            disabled: true,
                            label:"ID",
                            labelWidth: 110                     
                        },
                        // Имя сотрудника
                        {
                            view: "text",
                            name: "firstName",
                            css: "tb text",
                            id: "eFirstNameTB",
                            width: 300,
                            height: 35,
                            label: "Имя",
                            labelWidth: 110,
                        },
                        // Фамилия сотрудника
                        {
                            view: "text",
                            name: "lastName",
                            css: "tb text",
                            id: "eLastNameTB",
                            width: 300,
                            height: 35,
                            label: "Фамилия",
                            labelWidth: 110,
                        },
                        // Отчество сотрудника
                        {
                            view: "text",
                            name: "patronymic",
                            css: "tb text",
                            id: "ePatronymicTB",
                            width: 300,
                            height: 35,
                            label: "Отчество",
                            labelWidth: 110,
                        },
                        // Дата рождения сотрудника
                        {
                            view: "datepicker",
                            name: "date",
                            css: "cb tb text",
                            id: "eDatePicker",
                            width: 300,
                            height: 35,
                            label: "Дата рождения",
                            format:"%d.%m.%Y",
                            labelWidth: 110,
                        },
                        // Адрес сотрудника
                        {
                            view: "text",
                            name: "adress",
                            css: "tb text",
                            id: "eAdressTB",
                            width: 300,
                            height: 35,
                            label: "Адрес",
                            labelWidth: 110,
                        },
                        {},
                        {
                            cols: [
                            // Кнопка сохранить
                            {
                                view: "button",
                                id: "eClose",
                                css: "button",
                                value: "Закрыть",
                                width: 150,
                            },
                            {},
                            // Кнопка удалить
                            {
                                view: "button",
                                id: "eSave",
                                css: "button",
                                value: "Сохранить",
                                width: 150,
                            },
                            ],
                        },
                    ],
                    rules: {
                        "firstName":webix.rules.isNotEmpty,
                        "lastName":webix.rules.isNotEmpty,
                        "patronymic":webix.rules.isNotEmpty,
                    }
                }
            ]
        },
    }
}
