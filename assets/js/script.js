const formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let pageContentEl = document.querySelector("#page-content");
let taskIdCounter = 0;
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");
let tasks = [];


const completeEditTask = (taskName, taskType, taskId) => {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }
    saveTasks();

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};


const taskFormHandler = (event) => {

    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    };

    formEl.reset();

    let isEdit = formEl.hasAttribute("data-task-id");
    
    if (isEdit) {
        let taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }

    else {
         let taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };

        createTaskEl(taskDataObj);
    }
    
    
    
};

const createTaskEl = (taskDataObj) => {
// create list item
let listItemEl = document.createElement("li");
listItemEl.className = "task-item";

listItemEl.setAttribute("data-task-id", taskIdCounter);
listItemEl.setAttribute("draggable", "true");

// create div to hold task info and add to list item
let taskInfoEl = document.createElement("div");
//assign class name
taskInfoEl.className = "task-info";
// add html content to div
taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

listItemEl.appendChild(taskInfoEl);

let taskActionsEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionsEl);



tasksToDoEl.appendChild(listItemEl);

taskDataObj.id = taskIdCounter;
tasks.push(taskDataObj);
saveTasks();

taskIdCounter++;
};

const createTaskActions = (taskId) => {
    let actionContainerEl = document.createElement("div")
    actionContainerEl.className = "task-actions";

    let editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id",taskId);
    actionContainerEl.appendChild(editButtonEl);

    let deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id",taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    let statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    let statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
        let statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};


formEl.addEventListener("submit",taskFormHandler);

const deleteTask = (taskId) => {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    let updatedTaskArr =[];
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    saveTasks();
};

const editTask = (taskId) => {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    let taskName = taskSelected.querySelector("h3.task-name").textContent;
    

    let taskType =  taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);

    
}

const taskButtonHandler = (event) => {

    let targetEl = event.target;

    if(targetEl.matches(".edit-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    else if (targetEl.matches(".delete-btn")) {
        let taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

const taskStatusChangeHandler = () => {
    let taskId = event.target.getAttribute("data-task-id");
    let statusValue = event.target.value.toLowerCase();
    let tasksSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(tasksSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(tasksSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(tasksSelected);
    }
    for (var i = 0; i < tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
};

const dragTaskHandler =(event) => {
    let taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    let getId = event.dataTransfer.getData("text/plain");

};

const dropZoneDragHandler = (event) => {
    let taskListEl = event.target.closest(".task-list");
    if (taskListEl){
    event.preventDefault();
    taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
};

const dropTaskHandler = (event) => {
    let id = event.dataTransfer.getData("text/plain");
    let draggableElement = document.querySelector("[data-task-id='" + id + "']");
    let dropZoneEl = event.target.closest(".task-list");
    let statusType = dropZoneEl.id;
    let statusSelectEl = draggableElement.querySelector("select[name='status-change']");
    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    }
    else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }
    dropZoneEl.removeAttribute("style");
    dropZoneEl.appendChild(draggableElement);

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
    }
    }
    saveTasks();

};

const dragLeaveTaskHandler = (event) => {
    let taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
};

const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
const loadTasks = () => {
    // get task items form local storage
    //convert tasks from stringified back to array
    // iterate through task array and creates task elements on page
};

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
pageContentEl.addEventListener("dragstart", dragTaskHandler);
pageContentEl.addEventListener("dragover", dropZoneDragHandler);
pageContentEl.addEventListener("drop", dropTaskHandler);
pageContentEl.addEventListener("dragleave", dragLeaveTaskHandler);
    
