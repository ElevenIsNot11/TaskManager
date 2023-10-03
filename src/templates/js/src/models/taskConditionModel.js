


class TaskConditionModel{
    constructor() {
    }

    // Получить задачи
    getTaskConditions() {  
        let response = fetch('/taskcondition/read')
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response;  
    }

    getTaskConditionById(id){
        let response = fetch('/taskcondition/get/'+id)
        .then(response => response.text())
        .then(data => JSON.parse(data))
        return response;
    }

}

const taskConditionModel = new TaskConditionModel();
export default taskConditionModel