"use strict";

function newBar() {
    let a = document.getElementById("total").value;
    let b = document.getElementById("spent").value;
    let budget = "bills";
    let spent = b;
    let total = a;
  
    let x = `<li> <div
      class="label-center"
      id="${budget}"
      
      ></div><div></div>
      <h2>Entertainment</h2>
      <p>${spent} of ${total} Spent</p>
      </li>`;
    document.getElementById("insertBudget").innerHTML = x;
  
    /* construct manually */
    var bar1 = new ldBar("#bills", { preset: "fan" });
  
    // divides total by spent to create percentage amount below 100
    // *********DOES NOT WORK FOR LARGE NUMBERS JAVASCRIPT ISSUE???*********
    let c = a / b;
    
    /* ldBar stored in the element */
    bar1.set(c);
  }
  