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
        exitbutton: $$('exitButton'),
        projectForm: $$('addProject'),
        taskForm: $$('addTask'),
        employeeForm: $$('addEmployee'),
        tabbar: $$('tabbar1')
    },

    // Выход
    this.view.exitbutton.attachEvent('onItemClick', function(){document.location.href = 'auth.html'})

    // Нажатие на кнопку "Добавить" в тулбаре
    $$('addButton').attachEvent('onItemClick', () =>{
        var tab = (this.view.tabbar.getValue());
        if (tab === 'projectTab')
        {
            this.view.projectForm.show();
        }else if (tab === 'taskTab')
        {
            this.view.taskForm.show();
        }else if (tab === 'employeeTab')
        {
            this.view.employeeForm.show();
        }
        })
        
    // Нажатие на кнопку удалить в тулбаре
    $$('deleteButton').attachEvent('onItemClick', () =>{
        var tab = (this.view.tabbar.getValue());
        if (tab === 'projectTab')
        {
            this.projectTab.delete()
        }else if (tab === 'taskTab')
        {
            this.taskTab.delete()
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

}
