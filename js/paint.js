
// ---------- GLOBAL VAR  ------------

var arrayColors = ['rgb(25,23,43)','rgb(34,154,210)','rgb(178,12,200)','rgb(100,100,100)','rgb(25,25,25)','rgb(200,70,120)'];
var canvasSize = { width: 50, height: 50};
var selectedColor = "rgb(100,100,100)";



// ------------ TOOLBAR ---------------

//Generate the actual toolbar
function generateToolBar (){

    //generate toolbar
    var toolbar = document.createElement("div");
    toolbar.id = "toolbar";
    toolbar.style.position = "fixed";
    toolbar.style.display = "inline-block";
  

    //append toolbar
    var body = document.getElementsByTagName("body");
    body[0].appendChild(toolbar);

}

//Generate color related tools
function generateColorPallet(){
    
    //generate color pallet container
    var colorContainer = document.createElement("div");
    colorContainer.id = "colorContainer";

    for(var i = 0; i < arrayColors.length; i++){

        //Generate colors
        var color = document.createElement("div");
        color.classList = "color-selector"
        color.style.display = "inline-block";
        color.style.backgroundColor = arrayColors[i];
        color.id = "col"+i;
        color.value = arrayColors[i];
        color.addEventListener("click", updateSelectedColor);

        //append colors to palet
        colorContainer.appendChild(color);
    }

    //append pallet to toolbar
    toolbar = document.getElementById("toolbar");
    toolbar.appendChild(colorContainer);


    //addEventListeners to 

}

// add color selector
function generateColorSelector(){
    
    var colorInput = document.createElement("INPUT");
    colorInput.setAttribute("type", "color");
    colorInput.id = "colorSelectorWheel";
    colorInput.addEventListener("change", updateSelectedColor);
    colorInput.addEventListener("click", updateSelectedColor);
    
    var colorContainer = document.getElementById("colorContainer");
    colorContainer.appendChild(colorInput);
}

//update selected color from color selector
function updateSelectedColor (e) {
    
    //if color change from colorSelector
    if (e.target.id == "colorSelectorWheel"){
        selectedColor =  e.target.value;
    }
    else {
        selectedColor = e.target.value;
    }

    //remove selected class from all colors
    var arrayColors = document.getElementsByClassName("color-selector");
    for(var i = 0; i < arrayColors.length; i++){
        arrayColors[i].classList.remove("selected");
    }
    //remove class from colorSelector
    document.getElementById("colorSelectorWheel").classList.remove("selected");


    //add selected
    var pressedElement = e.target.id;
    pressedElement = document.getElementById(pressedElement);
    pressedElement.classList.add("selected");


}


// fucntion to initiate the toolbar
function initToolbar () {
    generateToolBar() //generates the actual bar
    generateColorPallet() //generate the color tools
    generateColorSelector() // generate color selector

}

// ------------ CANVAS ---------------


function generateCanvas(dimension_x, dimension_y){

    var canvas = document.createElement("div");
    canvas.id = "canvas";
    canvas.style.display = "inline-block";
    


    for(var j = 0; j < dimension_y; j++){
        var row = document.createElement("div");
        row.className = "canvas-row";
        row.id = "r"+j;
        row.style.margin = "0";
        row.style.padding = "0";


        for(var i = 0; i < dimension_x; i++){
            var block = document.createElement("div");
            block.className = "block";
            block.id = "r"+j+"c"+i;
            block.style.display = "inline-block";
            block.addEventListener("mouseover", adjustCell);
            row.appendChild(block);
        }

        canvas.appendChild(row);
    }
    
    //append cancas
    var body = document.getElementsByTagName("body");
    body[0].appendChild(canvas);

}


// ------------ GENERATE CANVAS SIZE QUESTION ---------------

function generateCanvasSizeWindow () {

    //create box
    var window = document.createElement("div");
    window.id = "canvasSizeWindow";
    window.style.position = "fixed";
    window.style.display = "inline-block"

    //create header QUESTION
    var header = document.createElement("p");
    header.innerHTML = "Please enter the canvas size in px:"
    header.id = "canvasSizeHeader";

    //create input cells
    var inputContainer = document.createElement("div");
    inputContainer.id = "inputContainer";
    
    //for width
    var input_x = document.createElement("input");
    input_x.setAttribute("type", "number");
    input_x.id = "inputWidth";
    input_x.className = "inputCanvasSize";
    input_x.placeholder = "Enter width";

    inputContainer.appendChild(input_x);

    //for heigth
    var input_y = document.createElement("input");
    input_y.setAttribute("type", "number");
    input_y.id = "inputHeight";
    input_y.className = "inputCanvasSize";
    input_y.placeholder = "Enter height";

    inputContainer.appendChild(input_y);

    //create create button
    var newbutton = document.createElement("button");
    newbutton.id = "canvasButton";
    newbutton.innerHTML = "Create Canvas"
    newbutton.addEventListener("click", startPaint);


    window.appendChild(header);
    window.appendChild(inputContainer);
    window.appendChild(newbutton);
    document.body.appendChild(window);

}

function hideCanvasWindow () {
    var canvasWindow = document.getElementById("canvasSizeWindow");
    canvasWindow.style.opacity = "0";

    //get values for canvas and store globaly
    canvasSize.width = document.getElementById("inputWidth").value;
    canvasSize.height = document.getElementById("inputHeight").value;

    setTimeout(function(){
        canvasWindow.remove();
    }, 1500);
}


// ------------- FUNCTIONS ------------

function startPaint (e){
    hideCanvasWindow(); //hides abd removes the window
    generateCanvas(canvasSize.width,canvasSize.height); //generated the canvas

}


function adjustCell(e){

    var specificCell = e.target
    
    if(e.buttons == 1){
        specificCell.style.backgroundColor = selectedColor;
    }
}




// ----------- GLOBAL INIT

function init () {

    initToolbar(); // Initiate the toolbar and all its active elements
    
    generateCanvasSizeWindow ();

}