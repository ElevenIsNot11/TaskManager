import userModel from "./js/src/models/userModel.js";
import employeeModel from "./js/src/models/employeeModel.js";
import projectModel from "./js/src/models/projectModel.js";

webix.ready(function () {
    CreateElements();
    AttachEvents();
})

function CreateElements() {
    webix.ui({
            view: "form",
            css: "form",
            id: "authForm",
            width: 300,
            height: 230,
            elements: [
                { view: "template", css: "auth_header", template: "Авторизация", type: "header",},
                { view: "text", id: "LoginInput", label: "Введите логин", labelPosition: "top", name: "login", width: 300 },
                { view: "text", type: "password", id: "PasswordInput", label: "Введите пароль", labelPosition: "top", name: "password", width: 300},
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
    $$('OkButton').attachEvent("onItemClick",async function (){
        let user = $$('authForm').getValues();
        if (user.login.trim() !== "" && user.password.trim() !== "")
        {
            await userModel.checkUser(user.login, user.password).then(async data => {
                if (data.length !== 0)
                {
                    let id;
                    let userName = "";
                    if (user.login === "admin"){
                        userName = user.login;
                        id = -1;
                    }else{
                        id = data[0].employee;
                        await employeeModel.getEmployeeById(data[0].employee).then(data => {
                            userName +=data.firstName+' '+data.lastName+' '+data.patronymic;
                        });
                        await projectModel.getProjects(data[0].employee).then(data => {
                            let temp = data.find(o => o.lead === userName);
                            if (temp !== null && temp !== undefined)
                            {
                                sessionStorage.setItem("Projects", true);
                            }else
                            {
                                sessionStorage.setItem("Projects", false);
                            }
                        });
                    }
                    sessionStorage.setItem("userName", userName);
                    if (id !== null)
                    sessionStorage.setItem("userID", id); 
                    document.location.href = '/';
                }
            });
        }

        

    })


}