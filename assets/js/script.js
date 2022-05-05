var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  
// check if input values are empty strings
if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

// reset form fields for next task to be entered
document.querySelector("input[name='task-name']").value = "";
document.querySelector("select[name='task-type']").selectedIndex = 0;

  // package up data as an object
  var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
  };
  //send as an argument to createTaskEl
  createTaskEl(taskDataObj);
};


var createTaskEl = function(taskDataObj) {  
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";  
    listItemEl.appendChild(taskInfoEl);

    // create task actions (buttons and select) for task
    var taskActionsEl = createTaskActions(taskIdCounter);
    // add entire list item to list
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    // increase taskcounterforthenext unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";
  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);
  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  // create change status dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  statusSelectEl.className = "select-status";
  actionContainerEl.appendChild(statusSelectEl);
  // create status options
  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i< statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.setAttribute("value", statusChoices[i]);
    statusOptionEl.textContent = statusChoices[i];
    //append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
}


// create a new task
formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
  // get target element from event
  var targetEl = event.target;

  // if edit button is clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  
  // if delete button is clicked
  if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

// delete a task

var deleteTask=function(taskId) {
  // find task list element with taskId value and remove it
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
};

var editTask=function(taskId) {
  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  // set data attribute to the form with a value of the task's id so it knows which one is being edited
  formEl.setAttribute("data-task-id", taskId);
  
  // change "add task" button to say "save task"
  document.querySelector("#save-task").textContent = "Save Task";

};

pageContentEl.addEventListener("click", taskButtonHandler);