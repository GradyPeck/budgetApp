function resizePortion (percentage) {
    let red = document.getElementById("red");
    redWidth = 300 * (percentage/100);
    redWidth = redWidth + "px";
    red.style.width = redWidth;
}

//the argument you provide here is the percentage of the bar that Red will try to fill
resizePortion(90);