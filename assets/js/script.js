const formEl = document.querySelector("#task-form");
let tasksToDoEl = document.querySelector("#tasks-to-do");


const createTaskHandler = (event) => {

    event.preventDefault();
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // create list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    let taskInfoEl = document.createElement("div");
    //assign class name
    taskInfoEl.className = "task-info";
    // add html content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);
    
    
    tasksToDoEl.appendChild(listItemEl);
};


formEl.addEventListener("submit",createTaskHandler);
    
