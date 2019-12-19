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


function newBar(budget, total) {
  
  let newBudget = `<div class="budgetBox"><div
  class="label-center"
  id="${budget}"
  
  ></div><div></div>
  <h2>${budget}</h2>
  <p>$0 of ${total} Spent</p></div>`;
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
  addName.innerHTML = userName.value;
  document.getElementById("insertName").innerHTML = addName.outerHTML;
  
  let babar = new PortionBar(document.getElementById("babar"), categories);
}

function addCatToButton() {
  let catHtml='';
  for(const cat in categories) {
    catHtml += `<li>${cat}<input><button onclick="myFunc('${cat}')">Add</button>`

    // console.log(cat);
    // let add = document.createElement("button");
    // add.innerHTML = cat;
    // add.value = cat
    // add.onclick = (e) => myFunc(e)
    // document.getElementById("addCat").appendChild(add);
  }
  document.getElementById("addCat").innerHTML = catHtml;
}

function myFunc(cat){
  categories[cat].addSpent()
}

