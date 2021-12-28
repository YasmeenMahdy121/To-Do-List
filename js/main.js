var clear=document.querySelector('.fa-refresh');
var date=document.querySelector('#date');
var list=document.querySelector('.list');
var input=document.querySelector('#input');
var addToDoBtn=document.querySelector('.fa-plus-circle');
var completeToDo=document.querySelectorAll('.complete');
var toDoList=[];
var data=JSON.parse(localStorage.getItem("todos"));
if(data){
    toDoList=data;
}
// get date
const options={weekday:"long", month:"short", day:"numeric"};
const today=new Date();
date.innerHTML=today.toLocaleDateString("en-US",options);

//  input field
input.addEventListener('click',function(){
    input.style.border="solid 1px #c5cce7";
});

// style of complete and uncomplete todo
const check="fa-check-circle";
const uncheck="fa-circle-thin";
const line_through="lineThrough";

//  start fuction
function start(){
    if(toDoList){
        for(let i=0; i<toDoList.length;i++){
                const DONE=toDoList[i].done ? check : uncheck;
                const LINE=toDoList[i].done ? line_through : "";
                var text='<li class="item"><i class="fa '+DONE+' complete" id="'+toDoList[i].id+'"></i> <p class="text '+LINE+'"> '+toDoList[i].name+' </p> <i class="fa fa-trash-o delete" id="'+toDoList[i].id+'"></i></li>';
                list.insertAdjacentHTML("beforeend",text);
        }

        deleteAndCompleteActions();
    }
    clear.addEventListener('click',clearToDo);
    
}

// add new toDo event click
addToDoBtn.addEventListener('click',function(){
    var toDo=input.value;
    if(toDo){
        addToDo(toDo,toDoList.length);
    }
    input.value=null;
});

// add toDo function
function addToDo(toDo,id){
    // push new todo to the toDoList
    toDoList.push(
        {
            name: toDo,
            id: id,
            done: false,
            trash: false
        }
    );
    var text='<li class="item"><i class="fa '+uncheck+' complete" id="'+id+'"></i> <p class="text"> '+toDo+' </p> <i class="fa fa-trash-o delete" id="'+id+'"></i></li>';
    list.insertAdjacentHTML("beforeend",text);
    // set new toDo in localstorage
    setNewItems();

    deleteAndCompleteActions();
}

// set new toDo
function setNewItems(){
    localStorage.setItem("todos", JSON.stringify(toDoList));
}
// delete and complete icons Actions
function deleteAndCompleteActions(){
    completeToDo=document.querySelectorAll('.complete');
    for(let i=0; i<completeToDo.length;i++){
        completeToDo[i].addEventListener('click',completeToDoF);
    }
    deleteToDoBtn=document.querySelectorAll('.delete');
    for(let i=0; i<deleteToDoBtn.length;i++){
        deleteToDoBtn[i].addEventListener('click',deleteToDo);
    }
}

// complete toDo
function completeToDoF(){
    this.classList.toggle(check);
    this.classList.toggle(uncheck);
    this.parentNode.querySelector('.text').classList.toggle(line_through);
    var DONE=toDoList[this.id].done ? false : true;
    toDoList[this.id].done=DONE;

    // set new toDo in localstorage
    setNewItems();
}
//  delete toDo
function deleteToDo(){
    toDoList.splice(this.id, 1);
    for(let i=this.id; i<toDoList.length;i++){
        toDoList[i].id=i;
    }
    this.parentNode.remove();

    // set new toDo in localstorage
    setNewItems();
}
// clear toDos
function clearToDo(){
        list.innerHTML="";
        toDoList=[];

        // set new toDo in localstorage
        setNewItems();
}

start();

