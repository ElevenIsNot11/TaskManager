
import {EmployeeReplacer, StatReplacer} from '../../helpers/util.js';
import EmployeeModel from './employeeModel.js';
import taskConditionModel from './taskConditionModel.js';
import taskPriorityModel from './taskPriorityModel.js';
import taskTypeModel from './taskTypeModel.js';
import projectModel from './projectModel.js';


class TaskModel{
    constructor() {
    }

    // Получить задачи
    getTasks() { 
        let response = fetch('/task/read')
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response.then(async data =>{
            for(const p of data) {
            if (p.employee !== undefined)
            {
                p.employee = await EmployeeReplacer(EmployeeModel.getEmployeeById(p.employee), p.employee);
            }

            if (p.watcher !== undefined)
            {
                p.watcher = await EmployeeReplacer(EmployeeModel.getEmployeeById(p.watcher), p.watcher);
            }

            if (p.creator !== undefined)
            {
                p.creator = await EmployeeReplacer(EmployeeModel.getEmployeeById(p.creator), p.creator);
            }
            if (p.condition !== undefined)
            {
                p.condition = await StatReplacer(taskConditionModel.getTaskConditionById(p.condition), p.condition);
            }

            if (p.priority !== undefined)
            {
                p.priority = await StatReplacer(taskPriorityModel.getTaskPriorityById(p.priority), p.priority);
            }

            if (p.type !== undefined)
            {
                p.type = await StatReplacer(taskTypeModel.getTaskTypeById(p.type), p.type);
            }

            if (p.project !== undefined)
            {
                p.project = await StatReplacer(projectModel.getProjectById(p.project), p.project);
            }
        };
        return response});

    }


    getTaskById(id){
        let response = fetch('/task/get/'+id)
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response;
    }

    async createTask(data){
        console.log(data);
        let response = await fetch('/task/createupdate', {
            type: "POST",
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
          });
        return response;
    }

    async updateTask(data){
        console.log(data);
        let response = await fetch('/task/createupdate', {
            type: "POST",
            method: "POST",
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data),
          });
        return response;
    }

    deleteTask(id){
        let response = fetch('task/delete/'+id);
        return response;
    }





}






const taskModel = new TaskModel();
export default taskModel