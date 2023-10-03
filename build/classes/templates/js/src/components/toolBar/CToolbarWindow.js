import { Employee } from '../../models/entities/employee.js'
import { ToolbarView } from './ToolbarView.js'

export class CToolbarWindow {
    constructor() {
        this.view
        this.currentEmployee
    }

    init() {
    }

    config() {
        return ToolbarView()
    }

    // Обновление информации о сотруднике 


    refreshEmployeeLabel(employee) {

    }

    attachEvents() {
        
    }


}