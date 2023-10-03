
import {EmployeeReplacer} from '../../helpers/util.js'
import EmployeeModel from './employeeModel.js';


class LinkedTaskModel {
    constructor() {
    }

    // Получить проекты
        getLinkedTasks() {
        let response = fetch('/linkedtask/read')
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response.then(async data =>{
            if (data !== null)
            {
                for(const p of data) {
                    if (p.lead !== undefined)
                    {
                        p.employee = await 
                        EmployeeReplacer(EmployeeModel.getEmployeeById(p.employee), p.employee);
                    }
            }  
        };
        return response});
    }

    getLinkedTaskById(id){
        let response = fetch('/linkedTask/get/'+id)
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response;
    }

    async createLinkedTask(data){
        let response = await fetch('/linkedTask/createupdate', {
            type: "POST",
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
          });
        return response;
    }

    deleteLinkedTask(id){
        let response = fetch('linkedTask/delete/'+id);
        return response;
    }


    async updateLinkedTask(data){
        let response = await fetch('/linkedTask/createupdate', {
            type: "POST",
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
          });
        return response;
    }

}

const linkedTaskModel = new LinkedTaskModel();
export default linkedTaskModel