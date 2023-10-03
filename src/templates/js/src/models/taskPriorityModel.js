


class TaskPriorityModel{
    constructor() {
    }

    // Получить задачи
    getTaskPriorities() {  
        let response = fetch('/taskpriority/read')
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response;  
    }

    getTaskPriorityById(id){
        let response = fetch('/taskpriority/get/'+id)
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response;
    }

}

const taskPriorityModel = new TaskPriorityModel();
export default taskPriorityModel