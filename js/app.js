const modal = document.querySelector(".modal-screen");
const openModalBtn = document.querySelector(".open-modal-button");
const cancelTodoBtn = document.querySelector(".cancel");
const createTodoBtn = document.querySelector(".create");
const todoInput = document.querySelector(".input");
const todosContainer = document.querySelector(".todos-container");
const sortBtns = document.querySelectorAll(".sort-menu button");
const sortTypeElem = document.querySelector(".sort-type");

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
  showTodos(todos);
  hideModal();
}

function showTodos(shownTodos) {
  todosContainer.innerHTML = "";

  if (shownTodos.length) {
    shownTodos.forEach(function (todo) {
      todosContainer.insertAdjacentHTML(
        "beforeend",
        `
          <article class="todo ${todo.isComplete ? "complete" : ""}">
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
              <button class="delete" onclick="removeTodo(${todo.id
        })">حذف</button>
              <button class="complete" onclick="completeTodo(${todo.id
        })">تکمیل</button>
            </div>
          </article>
        `
      );
    });
  } else {
    todosContainer.innerHTML = `<h1 style="text-align:center;">تودویی یافت نشد</h1>`;
  }
}

function removeTodo(todoId) {
  const mainTodoIndex = todos.findIndex(function (todo) {
    return todo.id === todoId;
  });

  todos.splice(mainTodoIndex, 1);
  showTodos(todos);
  saveInToLocalStorage(todos);
}

function completeTodo(todoId) {
  todos.some(function (todo) {
    if (todo.id === todoId) {
      todo.isComplete = true;
      return true;
    }
  });

  saveInToLocalStorage(todos);
  showTodos(todos);
}

function saveInToLocalStorage(todosArray) {
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

function getDataFromLocalStorage() {
  const localTodos = JSON.parse(localStorage.getItem("todos"));

  if (localTodos) {
    todos = localTodos;
  }

  showTodos(todos);
}

function todoSortHandler(event) {
  const sortType = event.target.value;
  const sortTitle = event.target.innerHTML;

  switch (sortType) {
    case "completed": {
      const completedTodos = todos.filter(function (todo) {
        return todo.isComplete === true;
      });

      sortTypeElem.innerHTML = sortTitle;
      showTodos(completedTodos);
      break;
    }

    case "uncompleted": {
      const unCompletedTodos = todos.filter(function (todo) {
        return todo.isComplete === false;
      });

      sortTypeElem.innerHTML = sortTitle;
      showTodos(unCompletedTodos);
      break;
    }

    default: {
      sortTypeElem.innerHTML = sortTitle;
      showTodos(todos);
    }
  }
}

sortBtns.forEach(function (sortBtn) {
  sortBtn.addEventListener("click", todoSortHandler);
});

openModalBtn.addEventListener("click", showModal);
cancelTodoBtn.addEventListener("click", hideModal);
createTodoBtn.addEventListener("click", addTodo);
