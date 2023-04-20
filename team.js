import { Employee } from "./employee.js";

const ul = document.getElementById('users');
const list = document.createDocumentFragment();

export class Team{
    constructor(){
        this.team = [];
    }

    newEmployee(id, name, phone, email, companyName, website){
        let employee = new Employee(id, name, phone, email, companyName, website);
        this.team.push(employee);
    }

    getTeam(){
        return this.team;
    }

    getNumberOfEmployees(){
        return this.team.length;
    }

    showTeam(){
        this.team.forEach(it => {
            let li = document.createElement('li');

            for (const [key, value] of Object.entries(it)) {
                let temp = document.createElement('p');
                temp.innerHTML = `${key}: ${value}`
                li.appendChild(temp);
            }

            list.appendChild(li);
        })

        ul.appendChild(list);
    }

    showNumberOfTeam(){
        let quantity = document.getElementById('quantity');
        quantity.innerHTML = this.team.length;
    }

    clearTeam(){
        ul.innerHTML = '';
        this.team = [];
    }
}