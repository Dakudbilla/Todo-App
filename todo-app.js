"use strict";
const todos = getSavedTodos();

const filters = {
  searchText: "",
};

//Renderes todos
renderTodos(todos, filters);

document.querySelector("#search-text").addEventListener("input", function (e) {
  filters.searchText = e.target.value;

  renderTodos(todos, filters);
});

//Make new todo
createTodo(todos);

//check box listener for completed task
document.querySelector("#check-completed").addEventListener("change", (e) => {
  const filter = todos.filter((todo) => e.target.checked && !todo.completed);
  e.target.checked ? renderTodos(filter, filters) : renderTodos(todos, filters);
});
