import employeeModel from "../../../models/employeeModel.js";
import commentModel from "../../../models/commentModel.js";


export function TaskPageView(){
    let employees = getEmployees();
    
    
    return {
        view: "window",
        id: "task",
        head: "Информация",
        modal: true,
        body: {
            view:"layout", //optional line
            responsive:true, 
            width: 1200,
            height: 950,
            rows:[
                    {
                        cols:[
                            { view: "form",
                            id: "taskHolder",
                            align:"center,middle",
                            elements: [
                                { view: "text", id: "tId", label: "Id", name: "id", width: 300, disabled: true, hidden: true},
                                { view: "text", id: "tName", label: "Название", name: "name", width: 300, disabled: true},
                                { view: "text", id: "tProject", label: "Проект", name: "project", width: 300, disabled: true},
                                { view: "text", id: "tType", label: "Тип", name: "type", width: 300 , disabled: true},
                                { view: "textarea", id: "tDesc", label: "Описание", name: "desc", width: 300, height: 100, disabled: true},
                                { view: "text", id: "tPriority", label: "Приоритет", name: "priority", width: 300, disabled: true},
                                { view: "text", id: "tEmployee", label: "Сотрудник", name: "employee", width: 300, disabled: true},
                                { view: "text", id: "tWatcher", label: "Наблюдатель", name: "watcher", width: 300, disabled: true},
                                { view: "richselect", id: "tCreator", label: "Создатель", name: "creator", width: 300, disabled: true},
                                { view: "text", id: "tTime", label: "Запл. время", name: "time", width: 300 , disabled: true},
                                { view: "text", id: "tFactTime", label: "Факт. время", name: "factTime", width: 300 , disabled: true},
                                { view: "text", id: "tCondition", label: "Состояние", name: "condition", width: 300, disabled: true},
                            ],
                            rules:{
                                "name":webix.rules.isNotEmpty,
                                "project":webix.rules.isNotEmpty,
                                "type":webix.rules.isNotEmpty,
                                "desc":webix.rules.isNotEmpty,
                                "priority":webix.rules.isNotEmpty,
                            }},
                            {
                                view:"comments",
                                id: "commentsHolder",
                                data:[
                                ],
                                users:employees
                            }
                        ],
                       
                    },
                    {},
                    { 
                        cols:[{rows:[
                            {
                                view:"template", 
                                template:"Необходимо выполнить прежде", 
                                type:"header",
                                width: 300
                            },
                            {
                                view:"richselect",
                                id: "beforeList",
                                width:300,
                            }
                        ]
                        },
                        {},
                        {rows:[
                            {
                                view:"template", 
                                template:"Необходимо выполнить после", 
                                type:"header",
                                width: 300
                            },
                            {
                                view:"richselect",
                                id: "afterList",
                                width:300,
                            }
                        ]

                        }
                ]          

                    },
                    {       
                        view: "button",
                        id: "pageClose",
                        css: "button",
                        value: "Закрыть",
                        width: 150,
                                                 
                    },
                    {}
                ],

            
        }
    }
}

function getEmployees(){
    let employees = [];
    employeeModel.getEmployees().then(data => {
        for (const row of data){
            employees.push({id: row.id, value: row.firstName+' '+row.lastName+' '+row.patronymic});
        }})
    return employees;
}

