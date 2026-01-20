const taskInput = document.querySelector(".task-input");
const submitButton = document.querySelector(".button");
const tasksContainer = document.querySelector(".tasks");
const taskList = [];

// check if task already exists
const alreadyExists = (task) => {
  return taskList.includes(task);
};

// input validation
const isValid = () => {
  return taskInput.value.trim().length > 0;
};

// add task function
const AddTask = () => {
  const inputIsValid = isValid();
  const taskExists = alreadyExists(taskInput.value.trim());
  if (!inputIsValid) {
    return window.alert("Campo inválido!");
  } else if (taskExists) {
    return window.alert("Tarefa já existe!");
  }

  // add task to task list
  taskList.push(taskInput.value.trim());

  //add task cotainer
  const newTaskContainer = document.createElement("div");
  newTaskContainer.classList.add("task-item");

  // add task
  const newTask = document.createElement("p");
  newTask.innerText = taskInput.value;

  // complete task
  newTask.addEventListener("click", () => {
    newTask.classList.add("completed");

    updateLocalStorage();
  });

  // add edit icon
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid");
  editIcon.classList.add("fa-pencil");

  // edit task
  editIcon.addEventListener("click", () => {
    const editedTask = prompt("Edite a tarefa:", newTask.innerText);
    newTask.innerText = editedTask;

    updateLocalStorage();
  });

  // add bin icon
  const removeIcon = document.createElement("i");
  removeIcon.classList.add("fa-solid");
  removeIcon.classList.add("fa-trash");

  // remove task
  removeIcon.addEventListener("click", () => {
    tasksContainer.removeChild(newTaskContainer);

    updateLocalStorage();
  });

  //display content
  newTaskContainer.appendChild(newTask);
  newTaskContainer.appendChild(editIcon);
  newTaskContainer.appendChild(removeIcon);
  tasksContainer.appendChild(newTaskContainer);

  // clean input
  taskInput.value = "";
  taskInput.focus();

  updateLocalStorage();
};

// add event listener to submit button
const TaskSubmit = submitButton.addEventListener("click", () => AddTask());

// update local storage
const updateLocalStorage = () => {
  const tasks = tasksContainer.childNodes;

  const localStorageTasks = [...tasks].map((taskItem) => {
    const content = taskItem.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
};

// get tasks from local storage
const getLocalStorageTasks = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  // show stored tasks
  for (const task of storedTasks) {
    //add task cotainer
    const newTaskContainer = document.createElement("div");
    newTaskContainer.classList.add("task-item");

    // add task
    const newTask = document.createElement("p");
    newTask.innerText = task.description;

    // complete task
    newTask.addEventListener("click", () => {
      newTask.classList.add("completed");

      updateLocalStorage();
    });
    if (task.isCompleted) {
      newTask.classList.toggle("completed");
    }
    
    // add edit icon
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-pencil");

    // edit task
    editIcon.addEventListener("click", () => {
      const editedTask = prompt("Edite a tarefa:", newTask.innerText);
      newTask.innerText = editedTask;

      updateLocalStorage();
    });

    // add bin icon
    const removeIcon = document.createElement("i");
    removeIcon.classList.add("fa-solid");
    removeIcon.classList.add("fa-trash");

    // remove task
    removeIcon.addEventListener("click", () => {
      tasksContainer.removeChild(newTaskContainer);

      updateLocalStorage();
    });

    //display content
    newTaskContainer.appendChild(newTask);
    newTaskContainer.appendChild(editIcon);
    newTaskContainer.appendChild(removeIcon);
    tasksContainer.appendChild(newTaskContainer);
  }
};

getLocalStorageTasks();
