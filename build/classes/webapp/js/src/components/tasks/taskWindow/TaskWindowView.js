
export function TaskWindowView(){
    return {
        view: "window",
        id: "addTask",
        head: "Добавление задачи",
        width: 500,
        modal: true,
        position: "center",
        height: 600,
        body: {
            view: "form",
            id: "taskForm",
            elements: [
                { view: "text", id: "tNameInput", label: "Название", name: "name", required: true, width: 300},
                { view: "richselect", id: "tProjectInput", label: "Проект", name: "project", required: true, options: ["Проект1", "Проект2", "Проект3" ], width: 300 },
                { view: "richselect", id: "tTypeInput", label: "Тип", name: "type", required: true, options:["Тест", "Создание", "Изменение", "Исправление ошибок"], width: 300 },
                { view: "textarea", id: "tDescInput", label: "Описание", name: "desc", required: true, width: 300, height: 100, },
                { view: "richselect", id: "tPriorityInput", label: "Приоритет", name: "priority", required: true, options:["Низкий", "Средний", "Высокий", "Важно"], width: 300, },
                { view: "richselect", id: "tEmployeeInput", label: "Сотрудник", name: "employee", 
                options:["", "Сотрудник 1", "Сотрудник 2", "Сотрудник 3", 
                "Сотрудник 4", "Сотрудник 5", "Сотрудник 6", "Сотрудник 7", 
                "Сотрудник 8", "Сотрудник 9", "Сотрудник 10", "Сотрудник 11"], 
                width: 300 },
                { view: "text", id: "tExpTimeInput", label: "Запл. время", name: "expectedTime", width: 300 },
                { view: "text", id: "tConditionInput", name: "condition", hidden: true},
                {
                    cols: [
                        { view: "button", id: "tCancelButton", value: "Отмена", css: "webix_primary", width: 100 },
                        { view: "button", id: "tClearButton", value: "Очистить", css: "webix_primary", width: 100 },
                        { view: "button", id: "tAddButton", value: "Добавить", css: "webix_primary", width: 100 }
                    ]
                }
            ],
            rules:{
                "name":webix.rules.isNotEmpty,
                "project":webix.rules.isNotEmpty,
                "type":webix.rules.isNotEmpty,
                "desc":webix.rules.isNotEmpty,
                "priority":webix.rules.isNotEmpty,
            }
        }
    }
}
