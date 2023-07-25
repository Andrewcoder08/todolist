//select todo input
const todoInput = document.querySelector(".todo-input");
//select todo button
const todoButton = document.querySelector(".todo-button");
//select todo list
const todoList = document.querySelector(".todo-list");
//select filter option
const filterOption = document.querySelector(".filter-todo");

// DOMContentLoaded event fires when the HTML document has been completely parsed and all deferred scripts have been downloaded and execute, it does not wait for stylesheets to load
//when DOMContentLoaded event is called which means when htmnl has completely parsed I want to getLocalTodos
// step 1: functionality to get all localtodos
document.addEventListener("DOMContentLoaded", getLocalTodos);
// step 2: functionality to add a todo
todoButton.addEventListener("click", addTodo);
// step 3: functionality to delete a todo
todoList.addEventListener("click", deleteCheck);
// step 4: functionality to filter todo
filterOption.addEventListener("change", filterTodo);

function getLocalTodos() {
  let todos;
  // if there are no todo items in my localstorage, todos will be empty array
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    // if there are todo items I want to append all those todos by first getting them and then with a for loop appending them to div that contains all todos
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //   now we iterate over each todo
  todos.forEach(function (todo) {
    // we create a main div that will contain all LIs
    const todoDiv = document.createElement("div");
    // style we want to add to our todoDiv
    todoDiv.classList.add("todo");
    // we create li
    const newTodo = document.createElement("li");
    //since we are iterating over all todos we set it to the value we received
    newTodo.innerText = todo;
    // style we want to add to our todoitem
    newTodo.classList.add("todo-item");
    // now we add are newly created todo to the div with help of append child
    todoDiv.appendChild(newTodo);

    // create complete button, add icon to it, styling to it and add it to same div
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    // create trash button, add icon to it, styling it and add it to same div
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // now we add this entire div to the todoList which we selected at the start
    todoList.appendChild(todoDiv);
  });
}

function addTodo(event) {
  event.preventDefault();
  //The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur, preventing submit
  // create a todoDiv, add styling to it
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create a li, li will have the value inputted by  the user add styling to it and append it to div
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //   use localstorage to add the inputed todo to save in localstorages
  if (!(todoInput.value === "")) {
    saveLocalTodos(todoInput.value);
    // create complete button, add icon to it, add styling to it and add it in div
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // create trash button, add icon to it, add styling to it and add it in div
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // add the main div to our list

    todoList.appendChild(todoDiv);
    // empty the input field

    todoInput.value = "";
  }
}
function deleteCheck(event) {
  // now when we click on trash button we get array whose 0th index contains class treah-btn
  const item = event.target;

  //   when we click on complete button
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
  //   when clicked on trash button
  if (item.classList[0] === "trash-btn") {
    // access the parent element
    const todo = item.parentElement;

    todo.classList.add("slide");
    // function to remove from localstorage as well
    removeLocalTodos(todo);
    // The transitionend event is fired when a CSS transition has completed.
    todo.addEventListener("transitionend", function () {
      // The remove() method removes an element (or node) from the document.
      todo.remove();
    });
  }
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //   pushing the todovalue we recieved in an array
  todos.push(todo);
  //   setting this value in localstorage by pushing the array
  localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (event.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // accessing the text in li and finding its index
  const todoIndex = todo.children[0].innerText;
  // at mentioned index we remove 1 item, we modify the array
  todos.splice(todos.indexOf(todoIndex), 1);
  // now we set the new array
  localStorage.setItem("todos", JSON.stringify(todos));
}
