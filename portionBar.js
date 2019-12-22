"use strict";

let colors = ["red", "green", "blue", "orange", "violet", "yellow"];
<<<<<<< HEAD
let sizes = {Food: 100, Flutes: 600, Coffee: 50, Owls: 150};

class PortionBar {
    constructor (element, ...portions) {
=======
//let sizes = {Food: 100, Flutes: 600, Coffee: 50, Owls: 150};

class PortionBar {
    constructor (element, categories) {
>>>>>>> feature
        //connect this object to its HTML element
        this.element = element;
        //set up empty portions object
        this.portions = {};
<<<<<<< HEAD
=======
        //set up array of category names
        let portions = [];
        for(let catto in categories) {
            portions.push(catto);
        }
>>>>>>> feature
        //iterate through array of category names
        for(let i = 0; i < portions.length; i++) {
            //make new Portion object and element, and connect to this PortionBar
            let portyElement = document.createElement("div");
            let porty = new Portion (portions[i], portyElement);
            this.portions[portions[i]] = porty;
            this.element.appendChild(portyElement);
            //style inner bars
            porty.setColor(colors[i]);
            portyElement.style["height"] = getComputedStyle(this.element).height;
        }
        this.total = 0;
    }

    //sets the total value
    setTotal (number) {
        this.total = number;
    }

    //call this to resize the inner bars
    resizePortions () {
        let myWidth = getComputedStyle(this.element).width;
        myWidth = Number(myWidth.slice(0, myWidth.length - 2));
        let sizeFactor = myWidth/this.total;
<<<<<<< HEAD
        console.log(sizeFactor);
        for(let porty in this.portions) {
            console.log(sizes[porty]);
            console.log(sizes[porty]*sizeFactor);
            this.portions[porty].element.style["width"] = sizes[porty]*sizeFactor + "px";
=======
        for(let porty in this.portions) {
            this.portions[porty].element.style["width"] = categories[porty].spent*sizeFactor + "px";
>>>>>>> feature
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

<<<<<<< HEAD
let babar = new PortionBar(document.getElementById("babar"), "Food", "Owls", "Coffee");
babar.setTotal(500);
babar.resizePortions();
=======
//let babar = new PortionBar(document.getElementById("babar"), "Food", "Owls", "Coffee");
//babar.setTotal(500);
//babar.resizePortions();
>>>>>>> feature
