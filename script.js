const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const pendingTasksList = document.getElementById('pendingTasks');
const completedTasksList = document.getElementById('completedTasks');
const tasksLeftCounter = document.getElementById('tasksLeftCounter');
const completedTasksCounter = document.getElementById('completedTasksCounter');

let tasksLeft = 0; 

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});

function updateTasksLeft() {
  tasksLeft = pendingTasksList.querySelectorAll('li:not(.completed)').length;
  tasksLeftCounter.textContent = `${tasksLeft} tasks left`;
}

function updateCompletedTasks() {
  const completedTasks = completedTasksList.querySelectorAll('li').length;
  completedTasksCounter.textContent = `${completedTasks} tasks completed`;
}

function addTask() {
    const taskText = taskInput.value.trim();
  
    if (taskText !== '') {
      if (taskText.length > 25) {
        alert('Task should be 25 characters or fewer.');
      } else {
        const timestamp = new Date().toLocaleString();
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
          <span class="task-text">${taskText}</span>
          <span class="timestamp">Added on ${timestamp}</span>
          <button class="completeButton">Complete</button>
          <button class="editButton">Edit</button>
        `;
  
        const completeButton = taskItem.querySelector('.completeButton');
        completeButton.addEventListener('click', completeTask);
  
        const editButton = taskItem.querySelector('.editButton');
        editButton.addEventListener('click', editTask);
  
        pendingTasksList.appendChild(taskItem);
        taskInput.value = '';
  
        updateTasksLeft();
      }
    } else {
      alert('Please enter a task before adding.');
    }
  }
  
  function editTask(event) {
    const taskItem = event.target.parentElement;
    const taskTextElement = taskItem.querySelector('.task-text');
    const newText = prompt('Edit task:', taskTextElement.textContent);
  
    if (newText !== null) {
      taskTextElement.textContent = newText;
    }
  }

function completeTask(event) {
  const taskItem = event.target.parentElement;
  taskItem.classList.toggle('completed');

  if (taskItem.classList.contains('completed')) {
    const trashIcon = document.createElement('i');
    trashIcon.className = 'fas fa-trash trash-icon';
    trashIcon.addEventListener('click', deleteTask);

    taskItem.appendChild(trashIcon);
    completedTasksList.appendChild(taskItem);
    event.target.remove();
  } else {
    taskItem.querySelector('.trash-icon').remove();
    pendingTasksList.appendChild(taskItem);
  }

  updateTasksLeft();
  updateCompletedTasks();
}

function deleteTask(event) {
  const taskItem = event.target.parentElement;
  taskItem.remove();
  updateTasksLeft();
  updateCompletedTasks();
}

updateTasksLeft();
updateCompletedTasks();

var icon=document.getElementById("icon");
icon.onclick=function(){
    document.body.classList.toggle("darkmode");
    
}