

class EmployeeModel {
    constructor() {
    }

    // Получить сотрудников
    getEmployees() {  
    let response = fetch('/employee/read')
    .then(response => response.text())
    .then(data => JSON.parse(data))
    return response;
    }

    getEmployeeById(id) {  
        let response = fetch('/employee/get/'+id)
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response;
        }

    async createEmployee(data){
        let response = await fetch('/employee/createupdate', {
            type: "POST",
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
          });
        return response;
    }

    async updateEmployee(data){
        let response = await fetch('/employee/createupdate', {
            type: "POST",
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
          });
        return response;
    }

    deleteEmployee(id){
        let response = fetch('employee/delete/'+id);
        return response;
    }
}

const employeeModel = new EmployeeModel();
export default employeeModel