class View {
  _calender = document.querySelector(".calender");

  _todosContainer = document.querySelector(".todo-app__todos");
  _form = document.querySelector(".todo-app__form");
  _importance = document.querySelector("#importance");
  _todo = document.querySelector(".todo-app__input");
  _filter = document.querySelector(".todo__filter");
  _deadlineInput = document.querySelector(".todo-app__deadline__input");

  _deleteAllBtn = document.querySelector(".todo__footer--deleteall");

  _modal = document.querySelector(".modal");
  _modalOverlay = document.querySelector(".modal__overlay");

  constructor() {
    this._deadlineInput.addEventListener(
      "click",
      this._deadlineHandler.bind(this)
    );

    this._deleteAllBtn.addEventListener(
      "click",
      this._deleteAllHandeler.bind(this)
    );

    this._todosContainer.addEventListener(
      "click",
      this._handleTodoClick.bind(this)
    );
  }

  _deadlineHandler(e) {
    this._calender.style.display = "block";
    setTimeout(() => this._calender.classList.add("calender--active"), 100);
  }

  _submitHandler(handler) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _loadHandler(handler) {
    window.addEventListener("load", handler);
  }

  _handelTodoBtn(handler) {
    this._todosContainer.addEventListener(
      "click",
      function (e) {
        if (this._calender.classList.contains("calender--active")) return;

        handler(e);
      }.bind(this)
    );
  }

  _handleTodoClick(e) {
    if (e.target.classList.contains("todo__btn")) return;

    const todo = e.target.closest(".todo");
    todo
      .querySelector(".todo__description")
      .classList.toggle("todo__description--active");
  }

  _markup(data) {
    return `
    <li class="todo ${
      data.importance === "important" ? "" : "todo--important"
    } ${data.checked ? "todo--checked" : ""}" data-id="${data.id}">
            <p class="todo__deadline">
            ${data.deadline}
            </p>
            <p class="todo__description">
              ${data.description}
            </p>
            <button class="todo__btn todo__btn--check">
              <i class="fa-solid fa-clipboard-check"></i>
            </button>
            <button class="todo__btn todo__btn--delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </li>
    
    
    `;
  }

  _clear() {
    this._todosContainer.textContent = "";
  }

  render(data) {
    const html = this._markup(data);
    this._todosContainer.insertAdjacentHTML("beforeend", html);
  }

  _handelFilter(handler) {
    this._filter.addEventListener("change", handler);
  }

  _deleteAllHandeler() {
    if (this._calender.classList.contains("calender--active")) return;

    this._modal.classList.remove("modal__hidden");
    this._modalOverlay.classList.remove("modal__overlay__hidden");
  }

  _hideModal() {
    this._modal.classList.add("modal__hidden");
    this._modalOverlay.classList.add("modal__overlay__hidden");
  }
  _confirmDeleteHandler(handler) {
    this._modal.addEventListener(
      "click",
      function (e) {
        const btn = e.target.closest(".modal__btn");

        if (!btn) return;

        console.log(btn);
        btn.classList.contains("modal__close") && this._hideModal();

        if (btn.classList.contains("modal__deleteAll")) {
          handler();
          this._hideModal();
          this._todosContainer.textContent = "";
        }
      }.bind(this)
    );
  }
}

export default new View();
