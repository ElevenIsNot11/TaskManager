
import {EmployeeReplacer} from '../../helpers/util.js'
import EmployeeModel from './employeeModel.js';


class UserModel {
    constructor() {
    }

    // Получить проекты
        checkUser(login, password) {
        let response = fetch('/user/check/'+login+"/"+password)
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


}

const userModel = new UserModel();
export default userModel