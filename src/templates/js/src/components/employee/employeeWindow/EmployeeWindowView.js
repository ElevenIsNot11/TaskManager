
export function EmployeeWindowView()
{
    return {
        view: "window",
        id: "addEmployee",
        head: "Добавление сотрудника",
        width: 500,
        modal: true,
        position: "center",
        height: 600,
        body: {
            view: "form",
            id: "employeeForm",
            elements: [
                { view: "text", id: "eFirstNameInput", label: "Имя", name: "firstName", width: 300, sort: "string" },
                { view: "text", id: "eLastNameInput", label: "Фамилия", name: "lastName", width: 300 },
                { view: "text", id: "ePatronymicInput", label: "Отчество", name: "patronymic", width: 300 },
                { view: "datepicker", id: "eDateInput", label: "Дата рожд.", format:"%d.%m.%Y", name: "date", width: 300 },
                { view: "text", id: "eAdressInput", label: "Адрес", name: "adress", width: 300 },

                {
                    cols: [
                        { view: "button", id: "eCancelButton", value: "Отмена", css: "webix_primary", width: 100 },
                        { view: "button", id: "eClearButton", value: "Очистить", css: "webix_primary", width: 100 },
                        { view: "button", id: "eAddButton", value: "Добавить", css: "webix_primary", width: 100 }
                    ]
                }
            ],
            rules:{
                "firstName":webix.rules.isNotEmpty,
                "lastName":webix.rules.isNotEmpty,
                "patronymic":webix.rules.isNotEmpty,
            }
        }
    }
}
