const buttonEL = document.querySelector("#save-task");
let tasksToDoEl = document.querySelector("#tasks-to-do");


const createTaskHandler = () => {
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};


buttonEL.addEventListener("click",createTaskHandler);
    
