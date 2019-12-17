"use strict";

function newBar() {
  let total1 = document.getElementById("total1").value;
  // let spent1 = document.getElementById("spent1").value;
  let spent1 = 50;
  // let total2 = document.getElementById("total2").value;
  // let spent2 = document.getElementById("spent2").value;


  let budget1 = "bills";
  // let budget2 = "food";

  let x = `<li> <div
      class="label-center"
      id="${budget1}"
      
      ></div><div></div>
      <h2>Bills</h2>
      <p>${spent1} of ${total1} Spent</p>
      </li>`;
  document.getElementById("insertBudget1").innerHTML = x;

  // let y = `<li> <div
  //   class="label-center"
  //   id="${budget2}"
    
  //   ></div><div></div>
  //   <h2>Food</h2>
  //   <p>${spent2} of ${total2} Spent</p>
  //   </li>`;
  // document.getElementById("insertBudget2").innerHTML = y;

  /* construct manually */
  let bar1 = new ldBar("#bills", { preset: "bubble" });
  // let bar2 = new ldBar("#food", { preset: "bubble" });
  // var bar2 = new ldBar("#entertainment", { preset: "bubble"});
  // var bar3 = new ldBar("#food", { preset: "bubble"});
  // var bar4 = new ldBar("#clothing", { preset: "bubble"});

  // divides total by spent to create percentage amount below 100
  let c = (spent1 / total1) * 100;
  // let d = (spent2 / total2) * 100;
  /* ldBar stored in the element */
  bar1.set(c);
  // bar2.set(d);
  // bar3.set(c);
  // bar4.set(c);
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
