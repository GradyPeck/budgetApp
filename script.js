"use strict";

let categories = {};
let babar;

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
      this.progressBar.set(newSpent/this.allocation * 100);
    }
  }

  undoSpent(expenditure) {
    let newSpent = this.spent -= expenditure;
    if (newSpent < 0) {
      //squib expenditure
    }
    else {
      this.spent = newSpent;
      this.progressBar.set(newSpent/this.allocation * 100);
    }
  }
}

// creates each budget category
function newBar(budget, total) {

  let newBudget = 
  `<ul id="${budget}-box" class="budgetBox">
    <li>
      <div class="label-center" id="${budget}"></div>
    </li>
    <li>
      <h2>${budget}</h2>
    </li>
    <li class="center">
      <p id=${budget}-spent>$0</p><p> of $${total} Spent</p>
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
  document.getElementById("insertBudget").innerHTML = ''; //Clears array
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
  
  babar = new PortionBar(document.getElementById("babar"), categories);
  let total = 0;
  for(let catto in categories) {
    total += categories[catto].allocation;
  }
  babar.setTotal(total);
}

// adds all created budgets to add button
function addCatToButton() {
  let catHtml='';
  for(const cat in categories) {
    catHtml += `<li class="right">${cat} <input id=${cat} class="right" type="number"><button onclick="plusSpent('${cat}')">Add</button></li>`
  }
  document.getElementById("addCat").innerHTML = catHtml;
}

function plusSpent(cat){
    let inputIncome = document.getElementById(cat).value; //string
    inputIncome = Number.parseFloat(inputIncome); //number
    categories[cat].addSpent(inputIncome);
    document.getElementById(`${cat}-spent`).innerText = `$${inputIncome} `;
    console.log(inputIncome);

    babar.resizePortions ();
}

// adds all created budgets to edit button
function addCatToButton2() {
  let catHtml='';
  for(const cat in categories) {
    catHtml += `<li class="right"><button id=${cat} onclick="undoSpent('${cat}')">Undo</button>${cat}</li>`
  }
  document.getElementById("addCat2").innerHTML = catHtml;
}

function undoSpent(cat){
  let inputIncome = document.getElementById(cat).value; //string
  inputIncome = Number.parseFloat(inputIncome); //number
  categories[cat].undoSpent(inputIncome);
  let oodles = document.getElementById(`${cat}-spent`).innerText;
  document.getElementById(`${cat}-spent`).innerText = Number(oodles.slice(1, oodles.length)) - inputIncome;
  babar.resizePortions();
}


// adds all created budgets to remove button
function addCatToButton3() {
  let catHtml='';
  for(const cat in categories) {
    catHtml += `<li class="right"><button onclick="minusCat('${cat}')">Remove Budget</button>${cat} </li>`
  }
  document.getElementById("addCat3").innerHTML = catHtml;
}

  // remove category created by user
function minusCat(cat) {
  document.getElementById(cat + "-box");
  let takeCat = document.getElementById(cat + "-box");
  takeCat.parentNode.removeChild(takeCat);
  delete categories[cat];
}

