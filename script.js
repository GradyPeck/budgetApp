"use strict";

let categories = {};

class Category {
  constructor(allocation, progressBar) {
    this.allocation = allocation;
    this.spent = 0;
    this.progressBar = progressBar;
  }
  
  addSpent(expenditure) {
    let newSpent = this.spent += expenditure;
    if (newSpent > this.allocation) {
      //squib expenditure
    }
    else {
      this.spent = newSpent;
      this.progressBar.set(newSpent/this.allocation * 100)
    }
  }
}

// creates each budget category
function newBar(budget, total) {
  
  let newBudget = 
  `<ul class="budgetBox">
    <li>
      <div class="label-center" id="${budget}"></div>
    </li>
    <li>
      <h2>${budget}</h2>
    </li>
    <li>
      <p>$ of ${total} Spent</p>
    </li>
  </ul>`;
  let node = document.createElement("li");
  node.innerHTML = newBudget;
  document.getElementById("insertBudget").appendChild(node);
  
  /* construct manually */
  let bar = new ldBar(`#${budget}`, { preset: "bubble" });
  
  // divides total by spent to create percentage amount below 100
  let c = (0 / total) * 100;
  /* ldBar stored in the element */
  bar.set(c);
  return bar;
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
// takes all information from entered budgets and creates new Category
function submit() {
  let cats = document.getElementsByClassName("data-entry");
  
  for (let arry of cats) {
    if (arry.value) {
      let bar = newBar(arry.name, arry.value);
      categories[arry.name] = new Category(Number(arry.value),bar);
    }
  }
  // inserts users name at top
  let userName = document.getElementById("userName");
  let addName = document.createElement("h1");
  if(userName.value){
    addName.innerHTML = userName.value + "'s Budget";
  } else {
    
  }
  
  document.getElementById("insertName").innerHTML = addName.outerHTML;
  
  let babar = new PortionBar(document.getElementById("babar"), categories);
}

function addCatToButton() {
  let catHtml='';
  for(const cat in categories) {
    catHtml += `<li>${cat}<input id="inputIncome" type="number"><button onclick="myFunc('${cat}')">Add</button>`
  }
  document.getElementById("addCat").innerHTML = catHtml;
}

function myFunc(cat){
  let inputIncome = document.getElementById("inputIncome").value; //string
  inputIncome = Number.parseFloat(inputIncome); //number
  categories[cat].addSpent(inputIncome);
}

