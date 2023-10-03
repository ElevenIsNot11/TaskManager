export function TaskInfoView(){
    return {
        id: "taskInfo",
        css: "info_window",
        hidden: true,
        width: 350,
        body: {
            rows: [
                    // Заголовок
                {
                    view: "template", 
                    css: "header",
                    id: "tHeader",
                    template: "Информация", 
                    type: "header",
                },
                {
                    view: "form",
                    css: "transparent_bg",
                    id: "tInfoForm",
                    elements: [
                        // Неизменяемое поле ID
                        {
                            view: "text", 
                            name: "id",
                            id: "tID", 
                            css: "tb text",
                            width: 170,
                            height: 35,
                            disabled: true,
                            label:"ID",
                            labelWidth: 110    
                        },
                        // Название задачи
                        {
                            view: "text",
                            name: "name",
                            id: "tNameTB",
                            css: "tb text",
                            width: 300,
                            height: 35,
                            label: "Название",
                            labelWidth: 110,
                        },
                        // Проект, к которому относится задача
                        {
                            view: "richselect",
                            name: "project",
                            id: "tProjectPicker",
                            css: "cb",
                            width: 300,
                            height: 35,
                            select: true,
                            label: "Проект",
                            labelWidth: 110,
                            value:"Проект 1", 
                            options:["Проект 1", "Проект 2", "Проект 3"]
                        },
                        // Тип задачи
                        {
                            view: "richselect",
                            name: "type",
                            id: "tTypePicker",
                            css: "cb",
                            width: 300,
                            height: 35,
                            select: true,
                            label: "Тип",
                            labelWidth: 110,
                            value:"Тип 1", 
                            options:["Тест", "Создание", "Изменение", "Исправление ошибок"]
                        },
                        // Описание задачи
                        {
                            view: "textarea",
                            name: "description",
                            id: "tDescTB",
                            css: "tb",
                            width: 300,
                            height: 35,
                            label: "Описание",
                            labelWidth: 110,
                            labelPosition: "left"
                        },
                        // Приоритет задачи
                        {
                            view: "richselect",
                            name: "priority",
                            id: "tPriorityPicker",
                            css: "cb",
                            width: 300,
                            height: 35,
                            select: true,
                            label: "Приоритет",
                            value:"Приоритет 1", 
                            options:["Низкий", "Средний", "Высокий", "Важно"],
                            labelWidth: 110,
                        },
                        // Сотрудник, назначенный выполнять задачу
                        {
                            view: "richselect",
                            name: "employee",
                            id: "tEmployeePicker",
                            css: "cb",
                            width: 300,
                            height: 35,
                            select: true,
                            label: "Сотрудник",
                            labelWidth: 110,
                            value:"", 
                            options:[" ", "Сотрудник 1", "Сотрудник 2", "Сотрудник 3", 
                            "Сотрудник 4", "Сотрудник 5", "Сотрудник 6", "Сотрудник 7", 
                            "Сотрудник 8", "Сотрудник 9", "Сотрудник 10", "Сотрудник 11"]
                        },
                        // Запланированное время решения задачи
                        {
                            view: "text", 
                            name: "expected_time",
                            id: "tExpTimeTB",
                            css: "tb text",
                            disabled: true,
                            width: 300,
                            height: 35,
                            label: "Запл. время (час)",
                            labelWidth: 110,
                        },
                        // Фактическое время решения задачи
                        {
                            view: "text",
                            name: "time",
                            id: "tTimeTB",
                            css: "tb text",
                            disabled: true,
                            width: 300,
                            height: 35,
                            label: "Факт. время (час)",
                            labelWidth: 110,
                        },
                        // Состояние задачи
                        {
                            view: "richselect",
                            name: "condition",
                            id: "tConditionPicker",
                            css: "cb",
                            disabled: true,  
                            width: 300,
                            height: 35,
                            select: true,
                            label: "Состояние",
                            labelWidth: 110,
                            value:"Состояние 1", 
                            options:["Не назначена", "Назначена", "В работе", "Пауза", "Решено", "Согласование"],
                        },
                        {
                            cols: [
                            // Кнопка сохранить
                            {                                        
                                view: "button",
                                id: "tClose",
                                css: "button",
                                value: "Закрыть",
                                width: 150,
                            },
                            {},
                            // Кнопка удалить
                            {
                                view: "button",
                                id: "tSave",
                                css: "button",
                                value: "Сохранить",
                                width: 150,
                            },
                            ],
                        },
                    ],
                    rules:{
                        "name":webix.rules.isNotEmpty,
                        "description":webix.rules.isNotEmpty,
                    }
                }
            ]           
        },
    }
}