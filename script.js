"use strict";

let categories = {};
let babar;
let total;

class Category {
  constructor(allocation, progressBar) {
    this.allocation = allocation;
    this.spent = 0;
    this.progressBar = progressBar;
  }

  addSpent(expenditure) {
    let newSpent = (this.spent += expenditure);
    if (newSpent > this.allocation) {
      return false;
    } else {
      this.spent = newSpent;
      this.progressBar.set((newSpent / this.allocation) * 100);
      return true;
    }
  }

  undoSpent(expenditure) {
    let newSpent = (this.spent -= expenditure);
    if (newSpent < 0) {
      //TODO - squib undo?
    } else {
      this.spent = newSpent;
      this.progressBar.set((newSpent / this.allocation) * 100);
    }
  }
}

// creates each tracker bubble
function newBar(budget, total) {
  let newBudget = `<ul id="${budget}-box" class="budgetBox">
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

//functions for opening and closing the new budget interface
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

// takes all information from entered budgets and populates categories{}
function submit() {
  let cats = document.getElementsByClassName("data-entry");
  document.getElementById("insertBudget").innerHTML = ""; //Clears array
  for (let arry of cats) {
    if (arry.value) {
      let bar = newBar(arry.name, arry.value);
      categories[arry.name] = new Category(Number(arry.value), bar);
    }
  }
  // inserts users name at top
  let userName = document.getElementById("userName");
  let addName = document.createElement("h1");
  if (userName.value) {
    addName.innerHTML = userName.value + "'s Budget";
  } else {
    addName.innerHTML = "My Budget";
  }

  //set the total to the user's entered value unless the sum of the categories is higher
  //if so, use that value instead
  total = document.getElementById("total").value;
  let catTotal = 0;
  for (let catto in categories) {
    catTotal += categories[catto].allocation;
  }
  if (total < catTotal) {
    total = catTotal;
  }

  document.getElementById("insertName").innerHTML = addName.outerHTML;

  babar = new PortionBar(document.getElementById("babar"), categories);
  refreshTotal();
}

// adds all created budgets to add button
function addCatToButton() {
  let catHtml = "";
  for (const cat in categories) {
    catHtml += `<li class="right">${cat} <input id=${cat} class="right" type="number"><button onclick="plusSpent('${cat}')">Add</button></li>`;
  }
  document.getElementById("addCat").innerHTML = catHtml;
}

function plusSpent(cat) {
  let inputIncome = document.getElementById(cat).value; //string
  inputIncome = Number.parseFloat(inputIncome); //number
  //check if the expense exceeds the category allocation
  if (categories[cat].addSpent(inputIncome)) {
    let oldSpent = Number(
      document
        .getElementById(`${cat}-spent`)
        .innerText.slice(
          1,
          document.getElementById(`${cat}-spent`).innerText.length
        )
    );
    let newSpent = oldSpent + inputIncome;
    document.getElementById(`${cat}-spent`).innerText = `$${newSpent} `;
    refreshTotal();
  } else {
    console.log("Blocked overspending");  
  }
}

// adds all created budgets to edit button
function addCatToButton2() {
  let catHtml = "";
  for (const cat in categories) {
    catHtml += `<li class="right">${cat}<button id=${cat} onclick="undoSpent('${cat}')">Undo</button></li>`;
  }
  document.getElementById("addCat2").innerHTML = catHtml;
}

/**
 * @todo only will work once after used once on a certain category it will return NaN
 */
function undoSpent(cat) {
  let inputIncome = document.getElementById(cat).value; //string
  inputIncome = Number.parseFloat(inputIncome); //number
  categories[cat].undoSpent(inputIncome);
  let oodles = document.getElementById(`${cat}-spent`).innerText;
  document.getElementById(`${cat}-spent`).innerText =
    Number(oodles.slice(1, oodles.length)) - inputIncome;
  refreshTotal();
}

// adds all created budgets to remove button
function addCatToButton3() {
  let catHtml = "";
  for (const cat in categories) {
    catHtml += `<li class="right">${cat}<button onclick="minusCat('${cat}')">Remove Budget</button></li>`;
  }
  document.getElementById("addCat3").innerHTML = catHtml;
}

// remove category created by user
function minusCat(cat) {
  document.getElementById(cat + "-box");
  let takeCat = document.getElementById(cat + "-box");
  takeCat.parentNode.removeChild(takeCat);
  delete categories[cat];
  babar.portions[cat].element.remove();
  delete babar.portions[cat];
  refreshTotal();
}

function totalSpent() {
  let toto = 0;
  for (let catto in categories) {
    toto += categories[catto].spent;
  }
  return toto;
}

//function to refresh portionbar and the Total text
function refreshTotal() {
  babar.setTotal(total);
  babar.resizePortions();
  document.getElementById("totalDisp").innerText = `Total Budget: $ ${totalSpent()} / $ ${total}`;
  if (totalSpent() >= total) {
    alert("Budget is Full");
  }
}
