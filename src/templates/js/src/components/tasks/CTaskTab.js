import { TaskTabView, TaskTabContextMenu } from './TaskTabView.js'
import taskModel from '../../models/taskModel.js'
import { CTaskWindow } from './taskWindow/CTaskWindow.js'
import { CTaskPage} from './taskPage/CTaskPage.js'
import { TaskInfoWindow} from './taskInfo/TaskInfoWindow.js'
import projectModel from '../../models/projectModel.js'

export class CTaskTab {
    constructor() {
        this.view
        this.window
        this.page;
        this.infowindow
    }

    init() {
        this.window = new CTaskWindow() 
        this.infowindow = new TaskInfoWindow()
        this.page = new CTaskPage();
    }

    config() {
        webix.ui(this.window.config())
        this.window.init()
        webix.ui(this.page.config())
        this.page.init()
        webix.ui(TaskTabContextMenu())
        return TaskTabView(this.infowindow)
    }

    attachEvents() {
        this.view = {
            datatable: $$('taskTable'),
            contextmenu: $$('taskTabContextMenu'),
            modalWindow: $$('addTask'),
            task: $$('task'),
            selectedID: -1
        }

        this.refreshTable()

        // Окно с информацией о проекте по клику
        this.view.datatable.attachEvent('onItemClick', (id) =>{
            var Item = this.view.datatable.getItem(id);
            this.infowindow.show(Item)
            if (parseInt(this.view.selectedID) == id)
            {
                this.view.datatable.unselectAll()
                this.view.selectedID = -1
            }else
            {
            this.view.selectedID = id; 
            }
        })
    
    
        // убрать
        this.infowindow.init()

        // Привязка контекстного меню
        this.view.contextmenu.attachTo(this.view.datatable.$view)

        // Отключить кнопку "Удалить" если не выбран элемент таблицы
        this.view.contextmenu.attachEvent("onBeforeShow", () =>{
            if (this.view.selectedID == -1)
            {
                this.view.contextmenu.disableItem("Удалить")
                this.view.contextmenu.disableItem("Открыть")
            }else
            {
                this.view.contextmenu.enableItem("Удалить")
                this.view.contextmenu.enableItem("Открыть")
            }
        })

        // Нажатие по элементу контекстного меню
        this.view.contextmenu.attachEvent("onMenuItemClick", (id) =>{
            var option = this.view.contextmenu.getItem(id).value;
            if (option === "Добавить")
            {
                if (sessionStorage.getItem("Projects") === true) this.view.modalWindow.show();
                else webix.message("У вас недостаточно прав");
            }
            else if (option === "Удалить")
            {
                if (sessionStorage.getItem("Projects") === true) this.delete;
                else webix.message("У вас недостаточно прав");
            }
            else if (option === "Открыть")
            {
                this.view.task.show();
                let tempId = this.view.datatable.getItem(this.view.selectedID);
                this.page.show(tempId);
            }
        })

    }

    // Обновление таблицы
    refreshTable(tasks) {
        if (tasks) {
            this.view.datatable.clearAll()
            this.view.datatable.parse(tasks)
            return
        } else {
            this.view.datatable.clearAll()
            taskModel.getTasks().then((tasks) => {
                let userName = sessionStorage.getItem("userName");
                let userID = sessionStorage.getItem("userID");
                if (userName !== "admin")
                {
                    projectModel.getProjects().then((projects) => {
                        if (sessionStorage.getItem("Projects") == true)
                        tasks = tasks.filter(o => projects.find(p => p.lead === userName && p.name === o.project) !== undefined);
                        else
                        tasks = tasks.filter(o => o.employee === userName || o.watcher === userName || o.creator === userName);
                        this.view.datatable.parse(tasks)
                    })
                }else{
                    this.view.datatable.parse(tasks);
                }
            })
        }
    }

    delete()
    {
        let ID = parseInt(this.view.selectedID)
        if (ID != -1)
        {
        webix.message('Удаление задачи c ID: '+ ID);
        //...

        let item = this.view.datatable.getSelectedItem()
        if (!item) {
            return
        }
        if (!item.id) {
            return
        }
        taskModel.deleteTask(item.id) 
        this.refreshTable(); 
        

        }
    }


}