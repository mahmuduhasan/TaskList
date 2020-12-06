let taskForm = document.querySelector("#task-form");
let taskList = document.querySelector("ul");
let clearTask = document.querySelector("#clear");
let filterTask = document.querySelector("#filter-task");
let newTask = document.querySelector("#new-task");

const localStorageHandler = (task) => {
  let allTasks;
  if (localStorage.getItem("allTasks") === null) {
    allTasks = [];
  } else {
    allTasks = JSON.parse(localStorage.getItem("allTasks"));
  }
  allTasks.push(task);
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
};

const taskSubmitHandler = (event) => {
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
    localStorageHandler(newTask.value);
    newTask.value = "";
  }
  event.preventDefault();
};

const removeTaskHandler = (event) => {
  if (event.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      let selectedElement = event.target.parentElement;
      selectedElement.remove();
      removeFromLocalStorage(selectedElement);
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
  localStorage.clear();
};

const filterTaskHandler = (event) => {
  let searchText = filterTask.value.toLowerCase();
  document.querySelectorAll("li").forEach((taskName) => {
    let taskItem = taskName.firstChild.textContent;
    if (taskItem.toLowerCase().indexOf(searchText) != -1) {
      taskName.style.display = "block";
    } else {
      taskName.style.display = "none";
    }
  });
};

const loadHandler = () => {
  let allTasks;
  if (localStorage.getItem("allTasks") === null) {
    allTasks = [];
  } else {
    allTasks = JSON.parse(localStorage.getItem("allTasks"));
  }
  allTasks.forEach((task) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));
    let deleteTask = document.createElement("a");
    deleteTask.setAttribute("href", "#");
    deleteTask.innerHTML = "x";
    li.appendChild(deleteTask);
    taskList.appendChild(li);
  });
};

const removeFromLocalStorage = (singleItem) => {
  let allTasks;
  if (localStorage.getItem("allTasks") === null) {
    allTasks = [];
  } else {
    allTasks = JSON.parse(localStorage.getItem("allTasks"));
  }

  let li = singleItem;
  li.removeChild(li.lastChild);

  allTasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      allTasks.splice(index, 1);
    }
  });
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
};
taskForm.addEventListener("submit", taskSubmitHandler);
taskList.addEventListener("click", removeTaskHandler);
clearTask.addEventListener("click", clearTaskHandler);
filterTask.addEventListener("keyup", filterTaskHandler);
document.addEventListener("DOMContentLoaded", loadHandler);
