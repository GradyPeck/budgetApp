"use strict";

function newBar(budget, total) {

  let newBudget = `<div
      class="label-center"
      id="${budget}"
      
      ></div><div></div>
      <h2>${budget}</h2>
      <p>$0 of ${total} Spent</p>`;
      let node = document.createElement("li");
      node.innerHTML = newBudget;
  document.getElementById("insertBudget").appendChild(node);

  /* construct manually */
  let bar = new ldBar(`#${budget}`, { preset: "bubble" });

  // divides total by spent to create percentage amount below 100
  let c = (0 / total) * 100;
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
  let cats = document.getElementsByClassName("data-entry");

  for(let arry of cats) {
    if(arry.value) {
      newBar(arry.name, arry.value);
    }
  }

}