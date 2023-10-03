
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
                            name: "firstname",
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
                            name: "lastname",
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
                            name: "middlename",
                            css: "tb text",
                            id: "eMiddleNameTB",
                            width: 300,
                            height: 35,
                            label: "Отчество",
                            labelWidth: 110,
                        },
                        // Дата рождения сотрудника
                        {
                            view: "datepicker",
                            name: "dob",
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
                        "firstname":webix.rules.isNotEmpty,
                        "lastname":webix.rules.isNotEmpty,
                        "middlename":webix.rules.isNotEmpty,
                    }
                }
            ]
        },
    }
}
