"use strict";

//Fetch Existing todos from localStorage
const getSavedTodos = () => {
  const todoJson = localStorage.getItem("todos");
  try {
    return todoJson ? JSON.parse(todoJson) : [];
  } catch (error) {
    return [];
  }
};

//Save a new Todo
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

//Render Application todos based on filters
const renderTodos = function (todos, filters) {
  if (todos.length !== 0) {
    //Filter Todoes based on user search term
    const filteredTodos = todos.filter(function (todo) {
      return todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
    });

    //Takes incompleted todos
    const incompleteTodos = filteredTodos.filter(function (todo) {
      return !todo.completed;
    });

    //Clear todos on dom
    document.querySelector("#todos").innerHTML = "";
    generateSummaryDOM(incompleteTodos);

    filteredTodos.forEach(function (todo) {
      generateTodoDOM(todo);
    });
  } else {
    document.querySelector("#todos").innerHTML = "";
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("empty-message");
    emptyMessage.textContent = "No todos to show, free day!!!";
    document.querySelector("#todos").appendChild(emptyMessage);
  }
};

//Remove todo from list
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => {
    return (todo.id = id);
  });
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

//Get DOM elements for an individual note
const generateTodoDOM = (todo) => {
  const todoParent = document.createElement("div");
  const ContainerEl = document.createElement("div");

  //setup checkbox

  const completed = document.createElement("input");

  completed.setAttribute("type", "checkbox");
  ContainerEl.appendChild(completed);
  //set checkbox state to state of todo i.e completed or not
  completed.checked = todo.completed;
  completed.addEventListener("change", (e) => {
    todo.completed = e.target.checked;
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  //setup todo text
  const todoText = document.createElement("span");

  todoText.textContent = todo.text;
  ContainerEl.appendChild(todoText);

  //setup remove todo
  const button = document.createElement("button");
  button.textContent = "remove";
  // button.style.position = "absolute";
  // button.style.right = "400px";
  button.classList.add("button", "button--text");

  button.addEventListener("click", (e) => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  todoParent.appendChild(ContainerEl);
  todoParent.appendChild(button);
  ContainerEl.classList.add("list-item__container");
  todoParent.classList.add("list-item");
  document.querySelector("#todos").appendChild(todoParent);
};

//Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  summary.classList.add("list-title");
  if (incompleteTodos.length === 0) {
    summary.textContent = `You have ${incompleteTodos.length} todos left`;
  } else if (incompleteTodos.length === 1) {
    summary.textContent = `You have ${incompleteTodos.length} todo left`;
  } else {
    summary.textContent = `You have ${incompleteTodos.length} todos left`;
  }

  document.querySelector("#todos").appendChild(summary);
};

const createTodo = (todos) => {
  document.querySelector("#new-todo").addEventListener("submit", function (e) {
    e.preventDefault();
    const inputContent = e.target.elements.text.value;
    if (inputContent.trim()) {
      todos.push({
        id: uuidv4(),
        text: inputContent,
        completed: false,
      });
      console.log(todos);
      //Render updated todos
      renderTodos(todos, filters);

      //save updated todos to localStorage
      saveTodos(todos);
    }
    e.target.elements.text.value = "";
  });
};
