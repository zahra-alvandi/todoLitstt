const modal = document.querySelector(".modal-screen");
const openModalBtn = document.querySelector(".open-modal-button");
const cancelTodoBtn = document.querySelector(".cancel");
const createTodoBtn = document.querySelector(".create");
const todoInput = document.querySelector(".input");
const todosContainer = document.querySelector(".todos-container");

let todos = [];

function showModal() {
  modal.classList.remove("hidden");
}

function hideModal() {
  modal.classList.add("hidden");
}

function addTodo() {
  const todoTitle = todoInput.value;

  const newTodo = {
    id: Math.floor(Math.random() * 9999),
    title: todoTitle,
    isComplete: false,
  };

  todos.push(newTodo);
  todoInput.value = "";

  saveInToLocalStorage(todos);
  showTodos();
  hideModal();
}

function showTodos() {
  todosContainer.innerHTML = "";

  if (todos.length) {
    todos.forEach(function (todo) {
      todosContainer.insertAdjacentHTML(
        "beforeend",
        `
          <article id="todo-${todo.id}" class="todo ${todo.isComplete ? "complete" : ""} ">
            <div class="todo-data">
              <div class="checkbox">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </span>
              </div>
              <div>
                <p class="todo-title">${todo.title}</p>
              </div>
            </div>
  
            <div class="todo-buttons">
              <button class="delete" onclick="removeTodo(${todo.id})">حذف</button>
              
              <button class="complete" onclick="completeTodo(${todo.id})">تکمیل</button>
            </div>
          </article>
        `
      );
    });

  } else {
    todosContainer.innerHTML = `<h1 style="text-align:center">تودویی یافت نشد</h1>`
  }
}

function removeTodo(todoId) {
  const mainTodoIndex = todos.findIndex(function (todo) {
    return todo.id === todoId;
  })

  todos.splice(mainTodoIndex, 1)
  showTodos();
  saveInToLocalStorage(todos);
}

function completeTodo(todoId) {
  todos.forEach(function (todo) {
    if (todo.id === todoId) {
      todo.isComplete = true
    }
  })
  saveInToLocalStorage(todos)
  showTodos()
}

function saveInToLocalStorage(todosArray) {
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

function getDataFromLocalStorage() {
  const localTodos = JSON.parse(localStorage.getItem("todos"))

  if (localTodos) {
    todos = localTodos
  }
  showTodos()
}

openModalBtn.addEventListener("click", showModal);
cancelTodoBtn.addEventListener("click", hideModal);
createTodoBtn.addEventListener("click", addTodo);

