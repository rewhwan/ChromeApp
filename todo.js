const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

//할일 목록을 삭제하는 함수
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);

    const cleanToDos = toDos.filter(function (toDo) {
        if(toDo.id !== parseInt(li.id)) {
            if(toDo.id > parseInt(li.id)) toDo.id = toDo.id -1;
            return true;
        }else {
            return false;
        }
    });
    toDos = cleanToDos;
    saveToDos();

    toDoList.querySelectorAll("li").forEach(function (toDo){
        if(toDo.id > parseInt(li.id)) li.id = --toDo.id;
    });
}

//할일 목록을 로컬환경에 저장하는 함수
function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    if(toDos.length >= 10) {
        toDoList.classList.add("overscroll");
    }else {
        toDoList.classList.remove("overscroll");
    }
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button")
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);

    //배열에 지금 추가된 할일 목록을 추가
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmitToDo(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmitToDo);
}

init();