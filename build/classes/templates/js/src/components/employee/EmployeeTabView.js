
export function EmployeeTabView(InfoWindow) {
    return {
        id: "employeeTab",
        css: "",
        cols: [
            {
                view: "datatable",
                css: "datatable webix_header_border webix_data_border select_disabled",
                select: "row",
                id: "employeeTable",
                height: 545,
                widthAuto: true,
                data: "",
                columns: [
                    { id: "id", hidden: true },
                    { id: "number", header: "Номер", width: 75, sort: "int" },
                    { id: "lastName", header: ["Фамилия", { content: "textFilter" },], fillspace: 4, sort: "string" },
                    { id: "firstName", header: ["Имя", { content: "textFilter" },], fillspace: 4, sort: "string" },
                    { id: "patronymic", header: ["Отчество", { content: "textFilter" },], fillspace: 4, sort: "string" },
                    { id: "date", header: "Дата рождения", fillspace: 3, sort: "date" },
                    { id: "adress", header: "Адрес", fillspace: 3, sort: "string" }
                ],
                scheme: {
                    $init: function (obj) {
                        obj.number = number
                        number++
                    }
                }
            },
            InfoWindow.config()
        ]
    }
}

let number = 1

export function EmployeeTabContextMenu() {
    return {
        view: "contextmenu",
        id: "employeeTabContextMenu",
        data: ["Добавить", "Удалить"]
    }
}
