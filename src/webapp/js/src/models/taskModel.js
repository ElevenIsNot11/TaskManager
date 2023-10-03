import Model from '../../helpers/model.js';

let tempTasks = [
    { id: "3", name: "Название1", project: "Проект 1", type: "Тест", desc: "Описание1", priority: "Низкий", employee: "Сотрудник 1", exptime: "5", time: "5", condition: "В работе" },
    { id: "2", name: "Название2", project: "Проект 2", type: "Создание", desc: "Описание2", priority: "Средний", employee: "Сотрудник 1", exptime: "7", time: "5", condition: "В работе" },
    { id: "5", name: "Название3", project: "Проект 3", type: "Тест", desc: "Описание3", priority: "Важно", employee: "Сотрудник 3", exptime: "3", time: "4", condition: "В работе" },
    { id: "4", name: "Название4", project: "Проект 2", type: "Создание", desc: "Описание4", priority: "Низкий", employee: " ", exptime: "", time: "", condition: "Не назначена" },
    { id: "90", name: "Название5", project: "Проект 2", type: "Исправление ошибок", desc: "Описание5", priority: "Средний", employee: "Сотрудник 1", exptime: "8", time: "5", condition: "В работе" },
    { id: "6", name: "Название6", project: "Проект 2", type: "Создание", desc: "Описание6", priority: "Важно", employee: "Сотрудник 5", exptime: "", time: "", condition: "Назначена" },
    { id: "7", name: "Название7", project: "Проект 3", type: "Изменение", desc: "Описание7", priority: "Высокий", employee: "Сотрудник 6", exptime: "3", time: "3", condition: "В работе" },
    { id: "8", name: "Название8", project: "Проект 1", type: "Исправление ошибок", desc: "Описание8", priority: "Низкий", employee: "Сотрудник 3", exptime: "4", time: "4", condition: "В работе" },
];

class TaskModel extends Model{
    constructor() {
        super()
    }

    // Получить задачи
    getTasks() {  
        return Promise.resolve(tempTasks) 
    //   return this.get('task/all')
    }
}

const taskModel = new TaskModel();
export default taskModel