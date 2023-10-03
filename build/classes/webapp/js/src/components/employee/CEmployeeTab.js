import { EmployeeTabView, EmployeeTabContextMenu } from './EmployeeTabView.js'
import employeeModel from '../../models/employeeModel.js'
import { CEmployeeWindow} from './employeeWindow/CEmployeeWindow.js'
import { EmployeeInfoWindow} from './employeeInfo/EmployeeInfoWindow.js'

export class CEmployeeTab {
    constructor() {
        this.view
        this.window
        this.infowindow
    }

    init(){
        this.window = new CEmployeeWindow()
        this.infowindow = new EmployeeInfoWindow()
    }

    config(){
        webix.ui(this.window.config())
        this.window.init()
        webix.ui(EmployeeTabContextMenu())
        return EmployeeTabView(this.infowindow)
    }

    attachEvents(){
        this.view = {
            datatable: $$('employeeTable'),
            contextmenu: $$('employeeTabContextMenu'),
            modalWindow: $$('addEmployee'),
            selectedID: -1
        }
        
        this.refreshTable()

        //Окно с информацией о проекте по клику
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

        //убрать
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
    refreshTable(employees){
        if (employees) {
            this.view.datatable.clearAll()
            this.view.datatable.parse(employees)
            return
        } else {
            employeeModel.getEmployees().then((employees) => {
                this.view.datatable.clearAll()
                this.view.datatable.parse(employees)
            })
        }
    }

    // Показать запись по её ID
    showByEmployeeId(){

    }

    create(){
        webix.message("Добавление задачи")
        // ...
        console.log(this.view.form.getValues())
        this.hide()
    }

    delete(){
        let ID = parseInt(this.view.selectedID)
        if (ID != -1)
        {
        webix.message('Удаление сотрудника с ID: '+ ID);
        //...

        let item = this.view.datatable.getSelectedItem()
        if (!item) {
            return
        }
        if (!item.id) {
            return
        }
        employeeModel.getEmployeeByID(item.id).then((employee) => {
            if (!task) {
                return
            }
            employeeModel.deleteEmployee(employee)
        })
        }
    }

}




