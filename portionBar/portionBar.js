"use strict";

class PortionBar {
    constructor (element, size, ...portions) {
        this.element = element;
        this.size = size;
        element.style.width = size + "px";
        this.portions = {Aproperty: "blue"};
        for(let i = 0; i < portions.size; i++) {
            let portyElement = document.createElement("div");
            let porty = new Portion (portions[i], portyElement);
            this.portions[portions[i]] = porty;
            console.log(portions[i]);
        }
        this.total = 0;
    }

    setTotal (number) {
        this.total = number;
    }

    resizePortions (percentage) {
        let totalUsed = 0;
        for(let i = 0; i < this.portions.size; i++) {
            let porty = this.portions[i];
            porty.style[margin-left] = "100px";
        }
    }
}

class Portion {
    constructor (name, element) {
        this.name = name;
        this.element = element;
    }
}

let babar = new PortionBar(document.getElementById("babar"), 300, "Food", "Owls");
babar.setTotal(100);
console.log(babar.portions);
for(let porty in babar.portions) {
    console.log(porty);
}