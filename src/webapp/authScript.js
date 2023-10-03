webix.ready(function () {
    CreateElements();
    AttachEvents();
})

function CreateElements() {
    webix.ui({
            view: "form",
            css: "form",
            width: 300,
            height: 230,
            elements: [
                { view: "template", css: "auth_header", template: "Авторизация", type: "header",},
                { view: "text", id: "LoginInput", label: "Введите логин", labelPosition: "top", name: "name", width: 300 },
                { view: "text", type: "password", id: "PasswordInput", label: "Введите пароль", labelPosition: "top", name: "pass", width: 300},
                {
                    cols: [
                        {},
                        {},
                        { view: "button", id: "OkButton", value: "Вход", css: "webix_primary", width: 100 }
                    ]
                }
            ],
        
    })
}

function AttachEvents(){

    // Кнопка авторизации
    $$('OkButton').attachEvent("onItemClick",function (){

        // Проверка данных

        document.location.href = 'index.jsp';
    })


}