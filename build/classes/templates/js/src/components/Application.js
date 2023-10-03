import MainWindowView from './ApplicationView.js'
import { CEmployeeTab } from './employee/CEmployeeTab.js'
import { CProjectTab } from './projects/CProjectTab.js'
import { CTaskTab } from './tasks/CTaskTab.js'
import { CMainWindow } from './mainWindow/CMainWindow.js'
import { CToolbarWindow } from './toolBar/CToolbarWindow.js'
import { Employee } from '../models/entities/employee.js'

export class Application {
    constructor() {
        this.view
        this.employeeTab = new CEmployeeTab()
        this.taskTab = new CTaskTab()
        this.projectTab = new CProjectTab()
        this.mainWindow = new CMainWindow()
        this.toolBar = new CToolbarWindow()
    }
    


    init() {
        this.taskTab.init()
        this.projectTab.init()
        this.employeeTab.init()

    }

    attachEvents() {
        this.taskTab.attachEvents()
        this.projectTab.attachEvents()
        this.employeeTab.attachEvents()


    this.view = {
        addbutton: $$('addButton'),
        deletebutton: $$('deleteButton'),
        addbutton: $$('addButton'),
        exitbutton: $$('exitButton'),
        projectForm: $$('addProject'),
        taskForm: $$('addTask'),
        employeeForm: $$('addEmployee'),
        tabbar: $$('tabbar1')
    },


    // Нажатие на кнопку "Добавить" в тулбаре
    $$('addButton').attachEvent('onItemClick', () =>{
        var tab = (this.view.tabbar.getValue());
        if (tab === 'projectTab')
        {
            if (sessionStorage.getItem("userName") === "admin") this.view.projectForm.show();
            else webix.message("У вас недостаточно прав");
        }else if (tab === 'taskTab')
        {
            if (sessionStorage.getItem("Projects") === true) this.view.taskForm.show();
            else webix.message("У вас недостаточно прав");
        }else if (tab === 'employeeTab')
        {
            this.view.employeeForm.show();
        }
        })

    $$('exitButton').attachEvent('onItemClick', () =>{
        sessionStorage.setItem("userName", null);
        sessionStorage.setItem("userID", null);
        document.location.href = '/auth';
    })

        
    // Нажатие на кнопку удалить в тулбаре
    $$('deleteButton').attachEvent('onItemClick', () =>{
        var tab = (this.view.tabbar.getValue());
        if (tab === 'projectTab')
        {
            if (sessionStorage.getItem("userName") === "admin") this.projectTab.delete();
            else webix.message("У вас недостаточно прав");
        }else if (tab === 'taskTab')
        {
            if (sessionStorage.getItem("Projects") === true) this.taskTab.delete();
            else webix.message("У вас недостаточно прав");
        }else if (tab === 'employeeTab')
        {
            this.employeeTab.delete()
        }
    })
    }


    config() {
        return  MainWindowView(this.projectTab, this.taskTab, this.employeeTab, this.toolBar);
    }
}


window.onload = function(){
    console.log(sessionStorage.getItem("Projects"));
    if(sessionStorage.getItem("userName") === null){
        document.location.href = '/auth';
    }
}
