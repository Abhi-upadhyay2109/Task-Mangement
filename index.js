let tasks = [];
let currentFilter = 'All';

// Add Task Function
function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const description = document.getElementById("taskDescription").value.trim();
  const status = document.getElementById("taskStatus").value;

  if (!title || !description) {
    alert("Please fill in both the title and description.");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    description,
    status,
    completed: status === "Completed"
  };

  tasks.push(task);
  clearForm();
  renderTasks();
}

// Clear Form Function
function clearForm() {
  document.getElementById("taskTitle").value = '';
  document.getElementById("taskDescription").value = '';
  document.getElementById("taskStatus").value = 'Pending';
}

// Render Tasks Function
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => currentFilter === 'All' || task.status === currentFilter);
  filteredTasks.forEach(task => {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    if (task.completed) taskItem.classList.add("completed");

    taskItem.innerHTML = `
      <div>
        <strong>${task.title}</strong> - ${task.description} 
        <em>(${task.status})</em>
      </div>
      <div>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="toggleComplete(${task.id})">${task.completed ? "Unmark" : "Complete"}</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}

// Filter Tasks Function
function filterTasks(status) {
  currentFilter = status;
  renderTasks();
}

// Toggle Completion
function toggleComplete(taskId) {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Delete Task Function
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  renderTasks();
}

// Edit Task Function
function editTask(taskId) {
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    document.getElementById("taskTitle").value = task.title;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskStatus").value = task.status;

    deleteTask(taskId); // Remove the old task to prevent duplicate IDs
  }
}
