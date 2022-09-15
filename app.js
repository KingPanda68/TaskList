const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

// Load all Event Listeners
function loadEventListeners() {
  // DOM load task
  document.addEventListener("DOMContentLoaded", getTasks);

  // add task
  form.addEventListener("submit", addTask);

  // remove task
  taskList.addEventListener("click", removeTask);

  // clear tasks
  clearBtn.addEventListener("click", clearTasks);

  // filter tasks
  filter.addEventListener("keyup", filterTasks);
}

// Get task
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    //   create li
    const li = document.createElement("li");

    //   add a class
    li.className = "collection-item";

    //   create text node and append
    li.appendChild(document.createTextNode(task));

    // create link
    const link = document.createElement("a");

    // add a class
    link.className = "delete-item secondary-content";

    //   add icon
    link.innerHTML = '<i class="fa-solid fa-trash"></i>';

    // append
    li.appendChild(link);

    //   append li to ul
    taskList.appendChild(li);
  });
}

// add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a Task");
  }
  //   create li
  const li = document.createElement("li");

  //   add a class
  li.className = "collection-item";

  //   create text node and append
  li.appendChild(document.createTextNode(taskInput.value));

  // create link
  const link = document.createElement("a");

  // add a class
  link.className = "delete-item secondary-content";

  //   add icon
  link.innerHTML = '<i class="fa-solid fa-trash"></i>';

  // append
  li.appendChild(link);

  //   append li to ul
  taskList.appendChild(li);

  // store
  storeTask(taskInput.value);

  //   clear input
  taskInput.value = "";

  e.preventDefault();
}

// store task
function storeTask(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("You are about to remove a Task, confirm?")) {
      e.target.parentElement.parentElement.remove();

      // remove from storage
      removeTaskFromStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove from storage
function removeTaskFromStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// clear tasks
function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from storage
  clearTaskFromStorage();
}

// clear from storage
function clearTaskFromStorage() {
  localStorage.clear();
}

// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
