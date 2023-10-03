import taskModel from '../../../models/taskModel.js'
import { TaskPageView } from './TaskPageView.js'
import employeeModel from '../../../models/employeeModel.js'
import projectModel from '../../../models/projectModel.js'
import taskTypeModel from '../../../models/taskTypeModel.js'
import taskPriorityModel from '../../../models/taskPriorityModel.js'
import taskConditionModel from '../../../models/taskConditionModel.js'
import commentModel from '../../../models/commentModel.js'
import linkedTaskModel from '../../../models/linkedTasksModel.js'

export class CTaskPage{
    constructor() {
        this.view
        this.onChange // ?
    }

    init() {
        this.attachEvents()
    }

    config() {
        return TaskPageView()
    }

    attachEvents() {
        this.view = {
            window: $$('task'),
                id: $$('tId'),
                name: $$('tName'),
                project: $$('tProject'),
                type: $$('tType'),
                desc: $$('tDesc'),
                priority: $$('tPriority'),
                employee: $$('tEmployee'),
                watcher: $$('tWatcher'),
                creator: $$('tCreator'),
                time: $$('tTime'),
                factTime: $$('tFactTime'),
                condition: $$('tCondition'),
            comments: $$('commentsHolder'),
            closeButton: $$('pageClose'),
            beforeList: $$('beforeList'),
            afterList: $$('afterList')
        }

    this.view.closeButton.attachEvent('onItemClick', () => {
            this.hide()
     }),


    this.view.window.attachEvent('onShow', async () => {
    })



    }


    hide() {
        this.view.window.hide()
        this.view.form.clearValidation()
    }

    async show(Item) {
        this.view.id.setValue(Item.id);
        this.view.name.setValue(Item.name);
        this.view.project.setValue(Item.project);
        this.view.type.setValue(Item.type);
        this.view.desc.setValue(Item.desc);
        this.view.priority.setValue(Item.priority);
        this.view.employee.setValue(Item.employee);
        this.view.watcher.setValue(Item.watcher);
        this.view.creator.setValue(Item.creator);
        this.view.time.setValue(Item.time);
        this.view.factTime.setValue(Item.factTime);
        this.view.condition.setValue(Item.condition);
        
        let comments = []
        let users = [];
        let text = "";
        let employees = [];
        let beforeList = [];
        let afterList = [];

        let sendField = this.view.comments.queryView("texthighlight");
        sendField.hide();

        await commentModel.getComments(Item.id).then(data => {
                for (const row of data){
                    text = "";
                    if (row.change !== null) text = '\t'+row.change+'\n';
                    text+=row.comment;
                    comments.push({id: row.id, user_id: row.employee, date: row.date, text: text});
                    users.push({id: row.employee, value:"finding"});
                }
        });

        await employeeModel.getEmployees().then(data => {
            for (const row of data){
                employees.push({id: row.employee, value: row.firstName+' '+row.lastName+' '+row.patronymic});
            }
        });

        await linkedTaskModel.getLinkedTasks().then(async data => {
            for (const row of data){
                if (row.task1 === Item.id)
                {
                    await taskModel.getTaskById(row.task1).then(data => {
                       beforeList.push(data.id + ' -- '+data.name);
                    })
                }else if (row.task2 === Item.id)
                {
                    await taskModel.getTaskById(row.task1).then( data => {
                        afterList.push(data.id + ' -- '+data.name);
                     })
                }
            }
        });



        for (const user of users){
            user.value = employees.find(o => o.id = user.id).value;
        }




       // this.view.comments.define("users", users);
        this.view.comments.define("data", []);
        this.view.comments.define("data", comments);
        this.view.afterList.define("options", afterList);
        this.view.afterList.setValue(afterList[0]);
        this.view.beforeList.define("options", beforeList);
        this.view.beforeList.setValue(beforeList[0]);




        
    }

    // Скрыть окно
    hide() {
        this.view.window.hide()
    }


}