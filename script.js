"use strict";

function newBar() {
  let total = document.getElementById("total").value;
  // let spent = document.getElementById("spent").value;


  let budget = "bills";

  let x = `<li> <div
      class="label-center"
      id="${budget}"
      
      ></div><div></div>
      <h2>Bills</h2>
      <p>${spent} of ${total} Spent</p>
      </li>`;
  document.getElementById("insertBudget").innerHTML = x;

  /* construct manually */
  let bar = new ldBar("#bills", { preset: "bubble" });

  // divides total by spent to create percentage amount below 100
  let c = (spent / total) * 100;
  // let d = (spent2 / total2) * 100;
  /* ldBar stored in the element */
  bar.set(c);
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function submit() { 
  let cats = document.getElementsByClassName("data-entry").value;

  for(arry in cats) {
    if(arry.value == true) {
      newBar();
    }
  }
}