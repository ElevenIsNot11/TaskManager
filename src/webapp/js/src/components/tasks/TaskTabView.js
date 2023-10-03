export function TaskTabView(InfoWindow) {
    return {
        id: "taskTab",
        css: "",
        cols: [
            {
                view: "datatable",
                css: "datatable webix_header_border webix_data_border select_disabled",
                select: "row",
                id: "taskTable",
                height: 545,
                widthAuto: true,
                data: "",
                columns: [
                    { id: "id", hidden: true },
                    { id: "number", header: "Номер", width: 75, sort: "int" },
                    { id: "name", header: ["Название", { content: "textFilter" }], width: 150, sort: "string" },
                    { id: "project", header: ["Проект", { content: "selectFilter" },], width: 100, sort: "string" },
                    { id: "type", header: ["Тип", { content: "selectFilter" },], width: 160, sort: "string" },
                    { id: "desc", header: ["Описание", { content: "textFilter" }], width: 200, sort: "string" },
                    { id: "priority", header: ["Приоритет", { content: "selectFilter" },], width: 100, name: "priority", sort: "string" },
                    { id: "employee", header: ["Сотрудник", { content: "textFilter" },], width: 100, sort: "string" },
                    { id: "exptime", css: "align_center", header: "Ожидаемое время", width: 150, sort: "int", },
                    { id: "time", css: "align_center", header: "Фактическое время", width: 150, sort: "int" },
                    { id: "condition", header: ["Состояние", { content: "selectFilter" },], width: 120, sort: "string" }
                ],
                scheme: {
                    $init:function(obj){
                        obj.number = number
                        number++
                        var priority = obj.priority
                        var cssstyle = ""
                        if (priority === "Важно")
                        {
                            cssstyle = "priority_important"
                        }
                        else if (priority === "Высокий")
                        {
                            cssstyle = "priority_high"
                        }
                        else if (priority === "Средний")
                        {
                            cssstyle = "priority_medium"
                        }
                        else if (priority === "Низкий")
                        {
                            cssstyle = "priority_low"
                        }
                        obj.$css = cssstyle

                    }
                }
            },
            InfoWindow.config()
        ]
    }
}

let number = 1

export function TaskTabContextMenu() {
    return {
        view: "contextmenu",
        id: "taskTabContextMenu",
        data: ["Добавить", "Удалить"],
    }
}
