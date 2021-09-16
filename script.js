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
const root = document.querySelector(":root");

setupRows(DEFAULT_ROWS, DEFAULT_COLUMNS);
setupSlider();

slider.addEventListener("change", (evt) => {
    const value = evt.target.value;
    clearRows(); 
    setupRows(value, value);
});

slider.addEventListener("mousemove", (evt) => {
    updateValueOfSlider(evt.target.value);
});

clearButton.addEventListener("click", () => {
    clearRows();
    setupRows(slider.value, slider.value);
});

eraserButton.addEventListener("click", (e) => {
    eraser = e.target;
    
    if (eraser.classList.contains("active")) {
        root.style.setProperty("--paint-color", THIRD_COLOR);
    }
    else {
        root.style.setProperty("--paint-color", SECONDARY_COLOR);
    }

    e.target.classList.toggle('active');
}); 

randomColorButton.addEventListener("click", () => {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    setColor(red, green, blue);
});

function setupSlider() {
    valueOfSlider.textContent = `${DEFAULT_ROWS} x ${DEFAULT_COLUMNS}`;
    slider.value = `${DEFAULT_COLUMNS}`;    
}

function setupRows(rows, columns) {
    setCssVariables(rows, columns);

    for (let i = 0; i < rows * columns; i++) {
        let div = document.createElement("div");
        div.addEventListener("mouseover", changeColor);
        console.log("added div");
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