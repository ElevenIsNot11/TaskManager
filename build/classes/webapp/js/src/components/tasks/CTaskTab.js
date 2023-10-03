import { TaskTabView, TaskTabContextMenu } from './TaskTabView.js'
import taskModel from '../../models/taskModel.js'
import { CTaskWindow } from './taskWindow/CTaskWindow.js'
import { TaskInfoWindow} from './taskInfo/TaskInfoWindow.js'

export class CTaskTab {
    constructor() {
        this.view
        this.window
        this.infowindow
    }

    init() {
        this.window = new CTaskWindow() 
        this.infowindow = new TaskInfoWindow()
    }

    config() {
        webix.ui(this.window.config())
        this.window.init()
        webix.ui(TaskTabContextMenu())
        return TaskTabView(this.infowindow)
    }

    attachEvents() {
        this.view = {
            datatable: $$('taskTable'),
            contextmenu: $$('taskTabContextMenu'),
            modalWindow: $$('addTask'),
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
            this.view.selectedID = id 
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
            }else
            {
                this.view.contextmenu.enableItem("Удалить")
            }
        })

        // Нажатие по элементу контекстного меню
        this.view.contextmenu.attachEvent("onMenuItemClick", (id) =>{
            var option = this.view.contextmenu.getItem(id).value;
            if (option === "Добавить")
            {
                this.view.modalWindow.show();
            }
            else if (option === "Удалить")
            {
                this.delete()
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
            taskModel.getTasks().then((tasks) => {
                this.view.datatable.clearAll()
                this.view.datatable.parse(tasks)
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
        taskModel.getTaskByID(item.id).then((task) => {
            if (!task) {
                return
            }
            taskModel.deleteTask(task)
        })

        }
    }


}