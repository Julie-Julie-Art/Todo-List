//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);

//Functions
function addTodo(event) {
	//prevent form from submitting
	event.preventDefault();
	//CREATE todo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//CREATE todo LI 
	const newTodo = document.createElement("li");
	newTodo.innerText = todoInput.value;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	//ADD TODO TO LOCAL STORAGE
	saveLocalTodos(todoInput.value);
	//CREATE check mark BUTTON
	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"><\i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	//CREATE check trash BUTTON
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"><\i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	//APPEND to list in html
	todoList.appendChild(todoDiv);
	//CLEAR todo INPUT value 
	todoInput.value = "";
}

//DELETE   newItem.addEventListener("click", deleteItem);

function deleteCheck(e) {
	const item = e.target;
	//DELETE todo
	if (item.classList[0] === "trash-btn") {
		const todo = item.parentElement;
		//const todo = document.querySelector('.todo');
		//todo.remove();
		//}
		//ANIMATION
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function() {
			todo.remove();
		});
	}

	//COMPLETE todo
	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement;
		todo.classList.toggle('completed');
		}
	}
	
function filterTodo(e){
	const todos = todoList.childNodes;
	todos.forEach(function(todo){ //is it node only function?
		switch(e.target.value){
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				if (todo.classList.contains('completed')) {
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			case "uncompleted":
				if (!todo.classList.contains('completed')){
					todo.style.display = "flex";
				} else {
					todo.style.display = "none";
				}
				break;
			}
	});
}

//SAVE LOCAL TODOs

function saveLocalTodos(todo){
	//CHECK if i already HAVE smth here?
	let todos;
	if(localStorage.getItem('todos') === null){
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	//
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	//CHECK if i already HAVE smth here?
	let todos;
	if(localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	//
	todos.forEach(function(todo){
		//CREATE todo DIV
	const todoDiv = document.createElement("div");
	todoDiv.classList.add("todo");
	//CREATE todo LI 
	const newTodo = document.createElement("li");
	newTodo.innerText = todo;
	newTodo.classList.add("todo-item");
	todoDiv.appendChild(newTodo);
	//CREATE check mark BUTTON
	const completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check"><\i>';
	completedButton.classList.add("complete-btn");
	todoDiv.appendChild(completedButton);
	//CREATE check trash BUTTON
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"><\i>';
	trashButton.classList.add("trash-btn");
	todoDiv.appendChild(trashButton);
	//APPEND to list in html
	todoList.appendChild(todoDiv);
	});
}

function removeLocalTodos(todo) {
	//CHECK if i already HAVE smth here?
	let todos;
	if(localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	//ищем конкретный туду слова
	const todoIndex = todo.children[0].innerText;
	//удаляем один специфик элемент
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem('todos', JSON.stringify(todos));
}
