document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-List");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((taskObj) => {
    renderTask(taskObj);
  });

  addTaskButton.addEventListener("click", function () {
    const tasktext = todoInput.value.trim();

    if (tasktext === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      text: tasktext,
      completed: false,
    };

    tasks.push(newTask);
    saveTask();
    todoInput.value = "";
    renderTask(newTask); // Render the new task
    console.log(tasks);
  });

  function renderTask(taskObj) {
    const li = document.createElement("li");
    li.setAttribute("data-id", taskObj.id);

    if (taskObj.completed) li.classList.add("completed");
    li.innerHTML = `
        <span>${taskObj.text}</span>
        <button>delete</button>
    `;

    li.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') return;
      taskObj.completed = !taskObj.completed;
      li.classList.toggle('completed');
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== taskObj.id);
      li.remove();
      saveTask();
    });

    todoList.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
