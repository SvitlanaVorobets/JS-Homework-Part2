import { Team } from "./team.js";

document.getElementById("findAll").addEventListener("click", findAll);
document.getElementById("findById").addEventListener("click", findById);
document.getElementById("findTodosById").addEventListener("click", findTodosById);
document.querySelector('.close-popup').addEventListener("click", closePopup);

document.addEventListener('click', (e) => {
    if(e.target === popupBg) { 
        closePopup();
    }
});

const input = document.getElementById("input");
const popupBg = document.querySelector('.popup__bg');
const popup = document.querySelector('.popup');

const ul = document.getElementById('todos');
const list = document.createDocumentFragment();

let team = new Team();

findAll()

async function findAll() {
    team.clearTeam();
    await getAll();
    team.showTeam();
    team.showNumberOfTeam();
}

async function getAll(){
    const jsonData = await handleError("https://jsonplaceholder.typicode.com/users")
    jsonData.map(employee => {
        team.newEmployee(employee.id, employee.name, employee.phone, employee.email, employee.company.name, employee.website);
    })
}

async function findById(){
    if(input.value){
        team.clearTeam();
        await getById(input.value);
        team.showTeam();
        team.showNumberOfTeam();
    } else alert ("Empty value")
}

async function getById(item){
    const jsonData = await handleError("https://jsonplaceholder.typicode.com/users/" + item)
    team.newEmployee(jsonData.id, jsonData.name, jsonData.phone, jsonData.email, jsonData.company.name, jsonData.website);
}

async function findTodosById(){
    ul.innerHTML = '';
    if(input.value){
        await getTodosById(input.value)
    } else alert ("Empty value")
}

async function getTodosById(item){
    const jsonData = await handleError("https://jsonplaceholder.typicode.com/users/" + item + "/todos")
    jsonData.map(todo => {
        createTodo(todo);
    })
    ul.appendChild(list);
    popupBg.classList.add('active');
    popup.classList.add('active');
}

function createTodo(todo){
    let li = document.createElement('li');

    let title = document.createElement('p');
    let completed = document.createElement('span');
    title.innerHTML = `Title: ${todo.title}`;
    completed.innerHTML = `Done: ${todo.completed}`;

    li.appendChild(title);
    li.appendChild(completed);
    list.appendChild(li);
}

async function handleError(url){
    try{
        const response = await fetch(url);
        
        if(response.ok) {
            return await response.json();
            
        } else {
            throw new Error(JSON.stringify({ code: response.status, message: response.statusText }))
        }

    } catch (e) {
        alert("The problem: " + e);
    }
}

function closePopup(){
    popupBg.classList.remove('active'); 
    popup.classList.remove('active');
}
