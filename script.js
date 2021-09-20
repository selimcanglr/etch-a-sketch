// Show the hex code of the color somewhere

const DEFAULT_ROWS = 16;
const DEFAULT_COLUMNS = 16;
const SECONDARY_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--secondary-bg'); 
const THIRD_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--tertiary-bg'); 

const container = document.getElementById("container");
const valueOfSlider = document.getElementById("value");
const slider = document.getElementById("slider");
const clearButton = document.getElementById("clear");
const eraserButton = document.getElementById("eraser");
const randomColorButton = document.getElementById("random-color");
const rainbowButton = document.getElementById("rainbow-mode");
const colorPicker = document.getElementById("color-picker");
const root = document.querySelector(":root");

setupRows(DEFAULT_ROWS, DEFAULT_COLUMNS);
setupSettings();
// introJs().start();

slider.addEventListener("change", (evt) => {
    const value = evt.target.value;
    clearRows(); 
    document.querySelectorAll(".active").forEach(a => a.classList.remove("active"));
    setupRows(value, value);
        
});

slider.addEventListener("mousemove", (evt) => {
    updateValueOfSlider(evt.target.value);
});

colorPicker.addEventListener("change", (evt) => {
    const color = evt.target.value;
    root.style.setProperty("--paint-color", color);
});

randomColorButton.addEventListener("click", () => {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    document.querySelectorAll(".active").forEach((button) => button.classList.remove("active"));
    colorPicker.value = rgbToHex(red, green, blue);

    setColor(red, green, blue);
});

rainbowButton.addEventListener("click", (e) => {
    document.querySelector("#eraser").classList.remove("active");
    e.target.classList.toggle("active");

    let divs = document.querySelectorAll("#container div");

    if (e.target.classList.contains("active")) {
        startRainbow(divs);
    }
    else {
        shutRainbow(divs);
    }
});

eraserButton.addEventListener("click", (e) => {
    eraser = e.target;

    let divs = document.querySelectorAll("#container div");
    shutRainbow(divs);
    
    rainbowButton.classList.remove("active");
    
    if (eraser.classList.contains("active")) {
        root.style.setProperty("--paint-color", colorPicker.value);
    }
    else {
        root.style.setProperty("--paint-color", SECONDARY_COLOR);
    }

    eraser.classList.toggle('active');
}); 

clearButton.addEventListener("click", () => {
    clearRows();
    document.querySelectorAll(".active").forEach(a => a.classList.remove("active"));
    setupRows(slider.value, slider.value);
});

function setupSettings() {
    valueOfSlider.textContent = `${DEFAULT_ROWS} x ${DEFAULT_COLUMNS}`;
    slider.value = `${DEFAULT_COLUMNS}`;    
    colorPicker.value = "#000000";
}

function setupRows(rows, columns) {
    setCssVariables(rows, columns);

    for (let i = 0; i < rows * columns; i++) {
        let div = document.createElement("div");
        div.addEventListener("mouseover", changeColor);
        container.appendChild(div);
    }
}

function clearRows() {
    container.textContent = "";
}

function updateValueOfSlider(value) {
    valueOfSlider.textContent = `${value} x ${value}`;
}

function setCssVariables(rows, columns) {
    root.style.setProperty("--row-count", +rows);
    root.style.setProperty("--column-count", +columns);
}

function setColor(red, green, blue) {
    root.style.setProperty("--paint-color", `rgb(${red}, ${green}, ${blue})`);
}

function changeColor(evt) {
    evt.target.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--paint-color'); // #999999
}

function changeRandomColor(evt) {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    colorPicker.value = rgbToHex(red, green, blue);

    setColor(red, green, blue);
    evt.target.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--paint-color'); // #999999
}

// From the answer of Tim Down, 
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function startRainbow(divs) {
    divs.forEach(div => div.removeEventListener("mouseover", changeColor));
    divs.forEach(div => div.addEventListener("mouseover", changeRandomColor));
}

function shutRainbow(divs) {
    divs.forEach(div => div.removeEventListener("mouseover", changeRandomColor));
    divs.forEach(div => div.addEventListener("mouseover", changeColor));
}