"use strict";

let colors = ["red", "green", "blue", "orange", "violet", "yellow"];

class PortionBar {
    constructor (element, size, ...portions) {
        this.element = element;
        this.size = size;
        element.style.width = size + "px";
        this.portions = {};
        for(let i = 0; i < portions.length; i++) {
            let portyElement = document.createElement("div");
            let porty = new Portion (portions[i], portyElement);
            this.portions[portions[i]] = porty;
            this.element.appendChild(portyElement);
            portyElement.classList.add("portion");
            porty.setColor(colors[i]);
        }
        this.total = 0;
    }

    setTotal (number) {
        this.total = number;
    }

    resizePortions () {
        for(let i = 0; i < this.portions.length; i++) {
            let porty = this.portions[i];
            porty.style[width] = "100px";
        }
    }
}

class Portion {
    constructor (name, element) {
        this.name = name;
        this.element = element;
    }

    setColor (color) {
        this.element.style["background-color"] = color;
    }
}

let babar = new PortionBar(document.getElementById("babar"), 300, "Food", "Owls", "Coffee");
babar.setTotal(100);
console.log(babar.portions);
