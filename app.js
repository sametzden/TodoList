// elementleri secme kısmı

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const cardBody1 = document.querySelectorAll(".card-body")[0];
const cardBody2 = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const searchInput = document.querySelector("#todoSearch")

let todos = [];

runEvents()

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded());
    cardBody2.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",clearAllTodos);
    searchInput.addEventListener("keyup",search);// keyup klavyede basılı olan tuştan elimizi cektimizde çalışır
}

function search(e){
    const searchValue = e.target.value.toLowerCase().trim()//trim sagdan soldan boşlukları siler
    const todoListesi = document.querySelectorAll(".list-group-item");

    if(todoListesi.length>0){
        todoListesi.forEach(function(todo){
            if(todo.textContent.toLowerCase().trim().includes(searchValue)){
                todo.setAttribute("style","display : block")
            }else{
                todo.setAttribute("style","display : none !important")// bootsrapteki display özelliginin çalışmaması için !important kullanıldı
            }
        })
    }
    else{
        showAlert("warning","Filtreleme yapmak için en az bir todo olmalıdır")
    }

}


function clearAllTodos(){
    const allTodos = document.querySelectorAll(".list-group-item")
    if(allTodos.length>0){
        allTodos.forEach(function(todo){
            todo.remove();
            removeTodoToStorage(todo.textContent)
        })
    }
    else{
        showAlert("warning","Silmek için en az bir Todo olmalı")
    }
    
}
function removeTodoToUI(e){
    if(e.target.className == "fa fa-remove"){
        //çarpıya basıldıgında  ekrandan silme
        console.log(e.target)
        const todo = e.target.parentElement.parentElement;
        todo.remove();
        //storage dan silme
        removeTodoToStorage(todo.textContent);
        showAlert("success","Todo silindi");
        
    }
}
function removeTodoToStorage(removeTodo){
    checkToDoFromStroge();
    todos.forEach(function(todo,index){
        if(removeTodo === todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function pageLoaded(){

    checkToDoFromStroge();
    todos.forEach(function(todo){
        addTodoToUI(todo)
    })
}

function addTodo(e){
    const inputText = addInput.value.trim(); // trim sagından va solundan boşlukları kaldırır
    if(inputText == null || inputText == ""){
        //alert("lütfen bir değer giriniz")
        showAlert("warning","bir değer giriniz")
    }
    else{
    // arayüz ekleme
    addTodoToUI(inputText);
    // storage ekleme
    addTOdoStorage(inputText);

    showAlert("success","Todo eklendi")
    }
    
    
    e.preventDefault();// farklı bi  sayfaya yönlendirmesini engeller 
}

function addTodoToUI(newTodo){
//      <li class="list-group-item d-flex justify-content-between">Todo 1
//     <a href="#" class="delete-item">
//         <i class="fa fa-remove"></i>
//     </a>
// </li>
// <li class="list-group-item d-flex justify-content-between">Todo 2
//     <a href="#" class="delete-item">
//         <i class="fa fa-remove"></i>
//     </a>
// </li>

// Element oluşturma kısmı
 
const li = document.createElement("li");
li.className = "list-group-item d-flex justify-content-between";
li.textContent = newTodo;

const a = document.createElement("a");
a.href = "#";
a.className ="delete-item";


const i = document.createElement("i");
i.className = "fa fa-remove";

// i a'nın , a da li'nin içerisinde appendChild kullanarak iç içe ekliyoruz
a.appendChild(i);
li.appendChild(a);
todoList.appendChild(li);

addInput.value = "";

}
function addTOdoStorage(newTodo){
    checkToDoFromStroge();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));

}
function checkToDoFromStroge(){
    if(localStorage.getItem("todos")== null){
        todos = [];
    }   
    else{
        todos = JSON.parse(localStorage.getItem("todos")); // json.parse array seklinde almaya yarar 
        
    }
}

function showAlert(type,message){
    /*<div class="alert alert-warning" role="alert">
    This is a warning alert—check it out!
</div>*/
    const div = document.createElement("div");
    div.className = "alert alert-"+type;
    div.role = "alert";
    div.textContent = message;
    cardBody1.appendChild(div)

    setTimeout(function(){
        div.remove();
    }, 2000);
}

