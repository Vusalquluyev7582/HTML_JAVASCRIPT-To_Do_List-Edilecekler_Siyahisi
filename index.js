//Bütün Elementləri Seçmək

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filtrInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();

function runEvents() {

    form.addEventListener("submit", addTodo);

    document.addEventListener("DOMContentLoaded", pageLoaded);

    secondCardBody.addEventListener("click", removeTodoToUI);

    clearButton.addEventListener("click", addTodosEveryWhere);

    filtrInput.addEventListener("keyup", filtr);

};

function pageLoaded() {

    checkTodosFromStorage();
    todos.forEach(function (todo) {
        // console.log(todo)
        addTodoToUI(todo);
    });

};

function filtr(e) {

    const filtrValue = e.target.value.toLowerCase().trim();
    const todoSiyahısı = document.querySelectorAll(".list-group-item");

    if (todoSiyahısı.length > 0) {

        todoSiyahısı.forEach(function (todo) {
            if (todo.textContent.toLowerCase().trim().includes(filtrValue)) {
                todo.setAttribute("style", "display: block");
            }
            else {
                todo.setAttribute("style", "display: none !important");
            }
        });

    }
    else {
        showAlert("warning", "Filtrləmə etmək üçün ən az 1 Todo olmalıdır")
    }

};

function addTodosEveryWhere() {

    const todoSiyahısı = document.querySelectorAll(".list-group-item");
    // console.log(todoSiyahısı);

    if (todoSiyahısı.length > 0) {

        //Ekrandan Silmək
        todoSiyahısı.forEach(function (todo) {
            todo.remove();
        });

        //Storage'dən Silmək
        todos = [];
        localStorage.setItem("todos", JSON.stringify(todos));
        showAlert("success", "Uğurla silindi");

    }
    else {
        showAlert("warning", "Silmək üçün ən az bir Todo olmalıdır");
    }

};

function removeTodoToUI(e) {
    // console.log(e.target);

    if (e.target.className === "fa fa-remove") {

        //Ekrandan Silmək
        // console.log("X'ə klik etmişdir");

        const todo = e.target.parentElement.parentElement;
        todo.remove();
        showAlert("success", "Todo uğurla silindi");

        //Storage'dən Silmək
        removeTodoToStorage(todo.textContent);

    }

};

function removeTodoToStorage(removeTodo) {

    checkTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (removeTodo === todo) {
            todos.splice(index, 1)
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));

};

function addTodo(e) {

    const inputText = addInput.value.trim();

    if (inputText == null || inputText == "") {
        // alert("Zəhmət olmasa bir dəyər daxil edin");

        showAlert("danger", "Zəhmət olmasa bir dəyər daxil edin");
    }
    else {
        //Ekrana əlavə etmək
        addTodoToUI(inputText);

        addTodoToStorage(inputText);

        showAlert("success", "Todo əlavə edildi");
    }

    //Storage'ə əlavə etmək
    e.preventDefault();

};

function addTodoToUI(newTodo) {
    /*

    < li class="list-group-item d-flex justify-content-between" > Todo 1
        <a a href="#" class="delete-item" >
         <i class="fa fa-remove"></i>
        </a >
    </li >

*/

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = "";
};

function addTodoToStorage(newTodo) {

    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));

};

function checkTodosFromStorage() {

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

};

function showAlert(type, message) {

    /*
    <div class="alert alert-warning" role="alert">
        This is a primary alert—check it out!
    </div>
    */

    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;

    firstCardBody.appendChild(div);

    setTimeout(function () {
        div.remove();
    }, 2500)

};