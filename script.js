let taskForm = document.querySelector("#task-form");
let taskList = document.querySelector("ul");
let clearTask = document.querySelector("#clear");
let filterTask = document.querySelector("#filter-task");
let newTask = document.querySelector("#new-task");

const taskSubmitHandler = (event) => {
  console.log(event);
  if (newTask.value == "") {
    alert("Enter Task!");
  } else {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(newTask.value + " "));
    let deleteTask = document.createElement("a");
    deleteTask.setAttribute("href", "#");
    deleteTask.innerHTML = "x";
    li.appendChild(deleteTask);
    taskList.appendChild(li);
    newTask.value = "";
  }
  event.preventDefault();
};

const removeTaskHandler = (event) => {
  if (event.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      let selectedElement = event.target.parentElement;
      selectedElement.remove();
    }
  }
};

const clearTaskHandler = (event) => {
  if (taskList.firstChild === null) {
    alert("There is no task to remove!");
  } else {
    if (confirm("Are you sure?")) {
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }
    }
  }
};

taskForm.addEventListener("submit", taskSubmitHandler);
taskList.addEventListener("click", removeTaskHandler);
clearTask.addEventListener("click", clearTaskHandler);
