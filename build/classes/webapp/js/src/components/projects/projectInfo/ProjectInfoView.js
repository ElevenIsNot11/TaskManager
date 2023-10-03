
export function ProjectInfoView(){
    return {
        id: "projectInfo",
        css: "info_window",
        width: 350,
        hidden: true,
        body: {
            rows: [
                    // Заголовок
                {
                    view: "template", 
                    css: "header",
                    template: "Информация",
                    id: "pHeader", 
                    type: "header",
                },
                {
                    view: "form",
                    css: "transparent_bg",
                    id: "pInfoForm",
                    elements: [
                        // Неизменяемое поле ID
                        {
                            view: "text", 
                            name: "id",
                            id: "pID", 
                            css: "tb text",
                            width: 170,
                            height: 35,
                            disabled: true,
                            label:"ID",
                            labelWidth: 110   
                        },
                        // Название проекта
                        {
                            view: "text",
                            name: "name",
                            id: "pNameTB",
                            css: "tb text",
                            width: 300,
                            height: 35,
                            label: "Название",
                            labelWidth: 110,
                        },
                        // Тимлид
                        {
                            view: "richselect",
                            name: "teamlead",
                            id: "pTeamLeadPicker",
                            css: "cb",
                            width: 300,
                            height: 35,
                            select: true,
                            label: "Тимлид",
                            labelWidth: 110,
                            value:"Тимлид 1", 
                            options:["Тимлид 1", "Тимлид 2", "Тимлид 3"]
                        },
                        // Описание проекта
                        {
                            view: "textarea",
                            name: "description",
                            id: "pDescTB",
                            css: "tb",
                            width: 300,
                            height: 195,
                            label: "Описание",
                            labelWidth: 110,
                            labelPosition: "left"
                        },
                        {},
                        {
                            cols: [
                            // Кнопка сохранить
                            {
                                view: "button",
                                id: "pClose",
                                css: "button",
                                value: "Закрыть",
                                width: 150,
                            },
                            {
                                
                            },
                            // Кнопка удалить
                            {
                                view: "button",
                                id: "pSave",
                                css: "button",
                                value: "Сохранить",
                                width: 150,
                            },
                            ],
                        }
                    ],
                    rules:{
                        "name":webix.rules.isNotEmpty,
                        "description":webix.rules.isNotEmpty
                    }
                }],
        },

    }
}
