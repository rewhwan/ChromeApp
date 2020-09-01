const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const reset = document.querySelector(".reset-name")

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

//이름을 로컬스토리지에 저장시켜준다.
function saveName(text) {
    localStorage.setItem(USER_LS, text)
}

//form의 핸들러 함수
function handleSubmitName(event) {
    //기본 이벤트의 발생을 막는다.
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

//이름 정보가 없을때 처리 함수
function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmitName)
}

//이름 정보가 있을때 처리 함수
function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
    resetBtn();
}

//시스템 실행시에 사용자의 이름을 불러와주는 함수
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        //정보가 없을때
        askForName();
    } else {
        //정보가 있을때
        paintGreeting(currentUser);
        resetBtn();
    }
}

//리셋버튼 세팅
function resetBtn() {
    reset.classList.add(SHOWING_CN);
    reset.addEventListener("click", function () {
        localStorage.removeItem(USER_LS);
        reset.classList.remove(SHOWING_CN);
        greeting.classList.remove(SHOWING_CN);
        loadName();
    });
}

function init() {
    loadName();
}

init();