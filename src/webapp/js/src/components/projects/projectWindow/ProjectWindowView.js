
export function ProjectWindowView()
{
    return {
        view: "window",
        id: "addProject",
        head: "Добавление проекта",
        width: 500,
        modal: true,
        position: "center",
        height: 600,
        body: {
            view: "form",
            id: "projectForm",
            elements: [
                { view: "text", id: "pNameInput", label: "Название", name: "name", width: 300},
                { view: "richselect", id: "pTeamLeadInput", label: "Тимлид", name: "teamlead", options: ["Тимлид1", "Тимлид2", "Тимлид3" ], width: 300},
                { view: "textarea", id: "pDescInput", label: "Описание", name: "desc", width: 300, height: 200},
                {
                    cols: [
                        { view: "button", id: "pCancelButton", value: "Отмена", css: "webix_primary", width: 100, },
                        { view: "button", id: "pClearButton", value: "Очистить", css: "webix_primary", width: 100 },
                        { view: "button", id: "pAddButton", value: "Добавить", css: "webix_primary", width: 100,}
                    ],
                    
                }
            ],
            rules:{
                "name":webix.rules.isNotEmpty,
                "teamlead":webix.rules.isNotEmpty,
                "desc":webix.rules.isNotEmpty
            }
        }
    }
}
