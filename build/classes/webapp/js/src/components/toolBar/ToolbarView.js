

export function ToolbarView(){
    return {
        view: "toolbar",
        css: "toolbar",
        id: "toolBar",
        widthAuto: true,
        width: 1291,
        cols:[
            { view: "button", id: "addButton", value: "Добавить", width: 100, align: "left"},
            { view: "button", id: "deleteButton", value: "Удалить", width: 100, align: "left"},
            {},
            { view: "template", width: 250, align:"right", css: "user_template", template: "Имя пользователя"},
            { view:"button", id: "exitButton", value:"Выход", width:100, align:"right" },
        ]
    }
}
