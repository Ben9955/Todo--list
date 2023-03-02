import View from "../view/view";
import TodoData from "../model/model";

const controlSbmitHandler = function () {
  const todo = {
    deadline: View._deadlineInput.value,
    importance: View._importance.value,
    description: View._todo.value,
  };

  todo.id = new Date(todo.deadline).getTime();

  View._deadlineInput.value = View._todo.value = "";

  if (
    todo.id <
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ).getTime()
  ) {
    alert("The deadline must not be in the past");
    return;
  }

  if (todo.description === "") return;

  TodoData._addTodo(todo);

  View.render(todo);
};

const controlLoadHandler = function () {
  TodoData._getLocalStorageTodos();
  TodoData._todos.forEach((todo) => {
    View.render(todo);
  });
};

// remove todo

const removeTodo = function (target) {
  const IndexcurrentTodo = [...document.querySelectorAll(".todo")].findIndex(
    (todo) => todo === target.closest(".todo")
  );

  const currentTodo = [...document.querySelectorAll(".todo")].find(
    (todo) => todo === target.closest(".todo")
  );

  currentTodo.classList.add("todo--delete");

  setTimeout(() => {
    currentTodo.remove();
    TodoData._removeTodo(IndexcurrentTodo);
  }, 500);
};

const checkTodo = function (target) {
  const currentTodo = target.closest(".todo");
  const currentTodoData = TodoData._todos.find(
    (t) => t.id === +currentTodo.dataset.id
  );

  currentTodo.classList.toggle("todo--checked");

  currentTodo.classList.contains("todo--checked")
    ? (currentTodoData.checked = true)
    : (currentTodoData.checked = false);

  TodoData._addtodoLocalstorage();
};

const controlTodoBtn = function (e) {
  const target = e.target.closest(".todo__btn");
  if (!target) return;

  // add checked to the todo

  target.classList.contains("todo__btn--check") && checkTodo(target);

  // delete todo
  target.classList.contains("todo__btn--delete") && removeTodo(target);
};

const controlFilter = function () {
  const filterOption = document.querySelector(".todo__filter").value;
  View._clear();

  if (filterOption === "important" || filterOption === "very important")
    TodoData._todos
      .filter((todo) => todo.importance === filterOption)
      .forEach((todo, index) => {
        // View.render(todo);
        setTimeout(() => View.render(todo), 300 * index);
      });

  filterOption === "checked" &&
    TodoData._todos
      .filter((t) => t.checked === true)
      .forEach((todo, index) => {
        // View.render(todo);
        setTimeout(() => View.render(todo), 300 * index);
      });

  filterOption === "all" &&
    TodoData._todos.forEach((todo, index) => {
      setTimeout(() => View.render(todo), 300 * index);
    });
};

const controlDeleteAllTodos = function () {
  TodoData._todos = [];
  TodoData._addtodoLocalstorage();
};

export default init = function () {
  View._handelTodoBtn(controlTodoBtn);
  View._handelFilter(controlFilter);
  View._loadHandler(controlLoadHandler);
  View._submitHandler(controlSbmitHandler);
  View._confirmDeleteHandler(controlDeleteAllTodos);
};
