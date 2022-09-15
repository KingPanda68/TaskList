const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

// Load all Event Listeners
function loadEventListeners() {
  // add task
  form.addEventListener("submit", addTask);
}

// add task
function addTask() {
  if (taskInput.value === "") {
    alert("Add a Task");
  }
  //   create li
  const li = document.createElement("li");
  //   add a class
  li.className = "collection-item";
  //   create tex node and append
  li.appendChild(document.createTextNode(taskInput.value));
  // create link
  const link = document.createElement("a");
  // add a class
  link.className = "delete-item secondary-content";
  //   add icon
  link.innerHTML = '<i class = "fa fa-remove"></i>';
  // append
  li.appendChild(link);
  //   append li to ul
  taskList.appendChild(li);

  //   clear input
  taskInput.value = "";

  e.preventDefault();
}
