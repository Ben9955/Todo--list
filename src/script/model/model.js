class TodoData {
  _todos = [];

  _addTodo(todo) {
    this._todos.push(todo);
    this._todos.sort((a, b) => a.id - b.id);

    this._addtodoLocalstorage();
  }

  _removeTodo(index) {
    this._todos.splice(index, 1);
    this._addtodoLocalstorage();
  }

  _addtodoLocalstorage() {
    localStorage.setItem("todos", JSON.stringify(this._todos));
  }

  _getLocalStorageTodos() {
    const storage = localStorage.getItem("todos");
    if (storage) this._todos = JSON.parse(storage);
  }
}

export default new TodoData();
