
   export default function MainWindowView(projectTab, taskTab, employeeTab, toolBar){
    let options = [];
    if (sessionStorage.getItem("userName") === "admin")
    {
        options = [
            { id:'taskTab',  value:'Задачи'},
            { id:'projectTab', value:'Проекты'},
            { id:'employeeTab', value:'Сотрудники'}
            ];
    }else{
        if (sessionStorage.getItem("Projects") === "true" || sessionStorage.getItem("Projects") === "true")
        {
            options = [
                { id:'taskTab',  value:'Задачи'},
                { id:'projectTab', value:'Проекты'}
                ];
        }else{
            options = [
                ];
        }
    }
    var tabs = {
        css: "tabbar",
        view:"tabbar", 
        id:"tabbar1",
        type: "clean",
        value:"taskTab",
        width: 400,
        height: 32,
        borderless: true,
        multiview: true,
        options: options
    }

    var multiView = {
        css: "multiview",
        cells: [
            // Задачи        
                taskTab.config(),
            // Проекты
                projectTab.config(),
            // Сотрудники
                employeeTab.config(),
        ]
    }


   return {
        css: "main_div transparent_bg" ,
        id: "maindiv",
        type: "space",
        rows: [
            // Тулбар            
            toolBar.config(), 
            {
            css: "multiview",
            rows: [
                // Вкладки
                tabs,
                multiView
            ]
        }]
    }
}