import Model from '../../helpers/model.js';

let tempEmployee = [
    { id: "2", firstname: "И1", lastname: "Ф1", middlename: "О1", date: "01.01.2001", adress: "Адрес1"},
    { id: "3", firstname: "И2", lastname: "Ф2", middlename: "О2", date: "01.01.2021", adress: "Адрес2"},
    { id: "4", firstname: "И3", lastname: "Ф3", middlename: "О3", date: "01.01.2021", adress: "Адрес3"},
    { id: "5", firstname: "И4", lastname: "Д4", middlename: "О4", date: "01.01.2021", adress: "Адрес4"},
    { id: "6", firstname: "И5", lastname: "Ф5", middlename: "О5", date: "01.01.2021", adress: "Адрес5"},
    { id: "7", firstname: "И6", lastname: "Ф6", middlename: "О6", date: "01.01.2021", adress: "Адрес6"},
];

class EmployeeModel extends Model {
    constructor() {
        super()
    }

    // Получить сотрудников
    getEmployees() {
        return Promise.resolve(tempEmployee)
       // return this.get('employee/all')
    }
}

const employeeModel = new EmployeeModel();
export default employeeModel