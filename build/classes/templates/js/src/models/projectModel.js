
import {EmployeeReplacer} from '../../helpers/util.js'
import EmployeeModel from './employeeModel.js';


class ProjectModel {
    constructor() {
    }

    // Получить проекты
        getProjects() {

        let response = fetch('/project/read')
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response.then(async data =>{
            for(const p of data) {
            if (p.lead !== undefined)
            {
                p.lead = await 
                EmployeeReplacer(EmployeeModel.getEmployeeById(p.lead), p.lead);
            }
            
        };
        return response});
    }

    getProjectById(id){
        let response = fetch('/project/get/'+id)
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response;
    }

    async createProject(data){
        let response = await fetch('/project/createupdate', {
            type: "POST",
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
          });
        return response;
    }

    deleteProject(id){
        let response = fetch('project/delete/'+id);
        return response;
    }


    async updateProject(data){
        let response = await fetch('/project/createupdate', {
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

const projectModel = new ProjectModel();
export default projectModel