const createTaskHtml = (name,description,assignedTo,dueDate,status,id) => { 
    const display = status == "TODO" ? "" : "d-none";   
    const color = status == "TODO" ? "btn btn-outline-warning" : "btn-success";
    const html = `<li class="list-group-item">
                  <div class="task" data-task-id=${id}>
                    <div class="task-top">
                      <div>
                        <span class="task-title"><strong> Task Name: </strong>${name}</span>
                      </div>
                      <div>
                          <span class="btn btn-pill ${color} task-status">${status}</span>
                      </div>
                    </div>
                    <div class="task-desc">
                      <p><strong> Description: </strong>${description}</p>
                    </div>
                    <div>
                      <span class="task-assign"><strong> Assigned to: </strong>: ${assignedTo}</span>
                    </div>
                    <div>
                      <span class="task-date"><strong> Due to: </strong> ${dueDate}</span>
                    </div>
                    <div class="task-bottom">
                      <div>
                        </span>
                        <span class="${display} btn btn-outline-success mark as done-button">Mark as Done 
                        </span> 
                      </div>
                      <div>
                        <span class="btn btn-outline-danger delete-button">Delete </span>
                      </div>
                    </div>
                  </div>
                </li>`
    return html;  }
   class TaskManager {
        constructor(currentId=0) {
            this.tasks = []
            this._currentId=currentId
        }
        addTask(name,description,assignedTo,dueDate,status="TODO") {
            this.tasks.push({
                id: this._currentId,
                name: name,
                description: description,
                assignedTo: assignedTo,
                dueDate: dueDate,
                status: status
            })
            this._currentId++;
        }
        render() {
            const tasksHtmlList = []
            this.tasks.forEach((e,i)=>{
                e.id=i
                const date = new Date(e.dueDate);
                const formattedDate = date.toDateString();
                const taskHtml = createTaskHtml(e.name,e.description,e.assignedTo,formattedDate,e.status,i);
                tasksHtmlList.push(taskHtml);
            })
            const tasksHtml = tasksHtmlList.join("\n");
            $('#tasks').html(tasksHtml)
        }
        getTaskById(taskId) {
            let foundTask;
            this.tasks.forEach(e=>{
                const task = e
                if (task.id==taskId){
                    foundTask = task
                    }
            })
            return foundTask
        }
        save() {
            const tasksJson = JSON.stringify(this.tasks)
            localStorage.setItem('tasks',tasksJson)
            localStorage.setItem('currentID',JSON.stringify(this._currentId))
        }
        load() {
            if (localStorage.getItem('tasks') !== null){
                const tasksJson = localStorage.getItem('tasks')
                this.tasks = JSON.parse(tasksJson)
            }
            if (localStorage.getItem("currentID") !== null){
                this._currentId = +localStorage.getItem('currentID')
            }
        }
        deleteTask (taskId) {
            this.tasks.splice(taskId,1)
            this._currentId--
        }
    }
    
    module.exports = TaskManager