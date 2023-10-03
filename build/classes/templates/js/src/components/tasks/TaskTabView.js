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
                    { id: "number", header: "Номер", fillspace:true, sort: "int"},
                    { id: "name", header: ["Название", { content: "textFilter" }], fillspace:2, sort: "string" },
                    { id: "project", header: ["Проект", { content: "selectFilter" },], fillspace:true, sort: "string" },
                    { id: "type", header: ["Тип", { content: "selectFilter" },],fillspace:2, sort: "string" },
                    { id: "desc", header: ["Описание", { content: "textFilter" }],fillspace:2, sort: "string" },
                    { id: "priority", header: ["Приоритет", { content: "selectFilter" },], name: "priority", width: 75, fillspace:true, sort: "string" },
                    { id: "employee", header: ["Сотрудник", { content: "textFilter" },], fillspace:2, sort: "string" },
                    { id: "watcher", header: ["Наблюдатель", { content: "selectFilter" },], fillspace:true, sort: "string", hidden: true },
                    { id: "creator", header: ["Создатель", { content: "selectFilter" },], fillspace:true, sort: "string", hidden: true },
                    { id: "time", css: "align_center", header: "Ожидаемое время", fillspace:true, sort: "int", },
                    { id: "factTime", css: "align_center", header: "Фактическое время", fillspace:true, sort: "int" },
                    { id: "condition", header: ["Состояние", { content: "selectFilter" },], fillspace:true, sort: "string" }
            
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
        data: [ "Открыть","Добавить", "Удалить"]
    }
}
