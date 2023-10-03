import Model from '../../helpers/model.js';

let tempProjects = [
    { id: "10", name: "Название1", teamlead: "Тимлид 1", desc: "Описание1" },
    { id: "3", name: "Название2", teamlead: "Тимлид 2", desc: "Описание2" },
    { id: "11", name: "Название3", teamlead: "Тимлид 3", desc: "Описание3" },
];


class ProjectModel extends Model {
    constructor() {
        super()
    }

    // Получить проекты
    getProjects() {
        return Promise.resolve(tempProjects)
        //return this.get('/project/all')
    }
}

const projectModel = new ProjectModel();
export default projectModel