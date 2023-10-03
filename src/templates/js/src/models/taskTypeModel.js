


class TaskTypeModel{
    constructor() {
    }

    // Получить задачи
    getTaskTypes() {  
        let response = fetch('/tasktype/read')
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response;  
    }

    getTaskTypeById(id){
        let response = fetch('/tasktype/get/'+id)
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response;
    }

}

const taskTypeModel = new TaskTypeModel();
export default taskTypeModel