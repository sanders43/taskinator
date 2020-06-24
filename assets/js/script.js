const formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");
let taskIdCounter = 0;


const taskFormHandler = (event) => {

    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    };

    formEl.reset();


    let taskDataObj = {
        // package data as object
        name: taskNameInput,
        type: taskTypeInput
    };

    //send as an argument
    createTaskEl(taskDataObj);
    
    
};

const createTaskEl = (taskDataObj) => {
// create list item
let listItemEl = document.createElement("li");
listItemEl.className = "task-item";

listItemEl.setAttribute("data-task-id", taskIdCounter);

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
    
