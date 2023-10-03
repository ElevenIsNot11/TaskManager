
import {EmployeeReplacer} from '../../helpers/util.js'
import EmployeeModel from './employeeModel.js';


class CommentModel {
    constructor() {
    }

    // Получить проекты
        getComments(id) {
        let response = fetch('/comment/read/'+id)
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

    getCommentById(id){
        let response = fetch('/comment/get/'+id)
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response;
    }

    async createComment(data){
        let response = await fetch('/comment/createupdate', {
            type: "POST",
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
          });
        return response;
    }

    deleteComment(id){
        let response = fetch('comment/delete/'+id);
        return response;
    }


    async updateComment(data){
        let response = await fetch('/comment/createupdate', {
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

const commentModel = new CommentModel();
export default commentModel