const modeBtn = document.getElementById('mode');
const body = document.querySelector('body');
const bgImg = document.querySelector('body');


bgImg.style.backgroundImage = 'url(./img/bg.png)';

const local = localStorage.getItem("key")

if (local) {
  dark()
}

// dark
function dark(){
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    localStorage.setItem("key", "dark")
    modeBtn.src = './img/sun.svg';
    modeBtn.alt = 'Switch to light mode';
    bgImg.style.backgroundImage = 'url(./img/dark.png)';
  } else {
    modeBtn.src = './img/moons.svg';
    modeBtn.alt = 'Switch to dark mode';
    bgImg.style.backgroundImage = 'url(./img/bg.png)';
    localStorage.setItem("key", "")

  }
}

modeBtn.addEventListener('click', dark);

let todos = [];

const todosEl = document.querySelector("#todos");
const inputEl = document.querySelector("input");
const pushValueEl = document.querySelector("#push_value");
const clearEl = document.querySelector("#clear");
const completedEl = document.querySelector("#completed");
const activeEl = document.querySelector("#active");


function updateUI() {
  let todosElement = "";
  let count = 0;
  todos.forEach((todo,index) =>{
    let qoshimchaClass = "";  
    if (todo.completed) {
      qoshimchaClass = "text-slate-500 line-through";
    } else {
      count++;
    }

    todosElement += `<div onclick='todoClick(${index})' type="text" class="bg-white ${qoshimchaClass} select-none cursor-pointer  w-[540px] h-16 rounded-[5px]  px-6">
    <h3 class="text-lg pt-4">${todo.text}</h3>
    </div>
    `
  });

  pushValueEl.textContent = `${count} items left`;
  todosEl.innerHTML = todosElement;

}

updateUI();

inputEl.addEventListener("keydown", e=>{
  if(e.key == "Enter" && inputEl.value !== "") {
    todos.push({
      text: inputEl.value,
      completed: false,
    });
    updateUI();
    inputEl.value = "";
  }
});

function todoClick(id) {
  todos = todos.map((todo,index) => {
    if (index == id){
      return{
        text:todo.text,
        completed:!todo.completed,
      };
    }else return todo;
  });

  updateUI();
}

clearEl.addEventListener("click", () => {
  todos = todos.filter(todo => !todo.completed);
  updateUI();
});
completedEl.addEventListener("click",()=>{
  todos = todos.filter(todo => todo.completed);
  updateUI();
})  
activeEl.addEventListener("click",()=>{
  todos = todos.filter(todo => !todo.completed);
  updateUI();
})  