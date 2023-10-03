import { ProjectTabView, ProjectTabContextMenu } from './ProjectTabView.js'
import projectModel from '../../models/projectModel.js'
import { CProjectWindow } from './projectWindow/CProjectWindow.js'
import { ProjectInfoWindow} from './projectInfo/ProjectInfoWindow.js'

//import { Project } from '../../models/entities/project.js';
//import projectModel from '../../models/projectModel.js';


export class CProjectTab {
    constructor() {
        this.view
        this.window
        this.infowindow
    }

    init() {
        this.window = new CProjectWindow()
        this.infowindow = new ProjectInfoWindow()
    }

    config() {
        webix.ui(this.window.config())
        this.window.init()
        webix.ui(ProjectTabContextMenu())
        return ProjectTabView(this.infowindow)   
    }

    attachEvents() {
        this.view = {
            datatable: $$('projectTable'),
            contextmenu: $$('projectTabContextMenu'),
            modalWindow: $$('addProject'),
            selectedID: -1
        }

        this.refreshTable()

        // Окно с информацией о проекте по клику
        this.view.datatable.attachEvent('onItemClick', (id) =>{
            let Item = this.view.datatable.getItem(id);
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
            let option = this.view.contextmenu.getItem(id).value;
            if (option === "Добавить")
            {
                if (sessionStorage.getItem("userName") === "admin") this.view.modalWindow.show();
                else webix.message("У вас недостаточно прав");
            }
            else if (option === "Удалить")
            {
                if (sessionStorage.getItem("userName") === "admin") this.delete()
                else webix.message("У вас недостаточно прав");
            }
        });  
        
    }

    // Обновить таблицу
    refreshTable(projects) {
        if (projects) {
            this.view.datatable.clearAll()
            this.view.datatable.parse(projects)
            return
        } else {
            projectModel.getProjects().then((projects) => {
                this.view.datatable.clearAll()
                let userName = sessionStorage.getItem("userName");
                if (userName !== "admin")
                projects = projects.filter(o => o.lead===userName)
                this.view.datatable.parse(projects)
            })
        }
    }

    delete() {
        let ID = parseInt(this.view.selectedID)
        if (ID != -1)
        {
        webix.message('Удаление проекта c ID: '+ ID);
        //...

        let item = this.view.datatable.getSelectedItem()
        if (!item) {
            return
        }
        if (!item.id) {
            return
        }
            projectModel.deleteProject(item.id) 
            this.refreshTable(); 
        }
    }
}