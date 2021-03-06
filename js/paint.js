
// ---------- GLOBAL VAR  ------------

var arrayColors = ['rgb(25,23,43)','rgb(34,154,210)','rgb(178,12,200)','rgb(100,100,100)','rgb(25,25,25)','rgb(200,70,120)', 'yellow', 'blue', 'green', 'red'];
var canvasSize = { width: 50, height: 50};
var selectedColor = "rgb(100,100,100)";
var canvasArray = [""];
var newMartix = [];



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

//generate slidebar (NOT COMPLETED)
function generateSlideBar(){
    
    var slidebar = document.createElement("INPUT");
    slidebar.setAttribute("type", "range");
    slidebar.id = "slidebar";
    // colorInput.addEventListener("change", updateSelectedColor);
    // colorInput.addEventListener("click", updateSelectedColor);
    
    var toolbar = document.getElementById("toolbar");
    toolbar.appendChild(slidebar);
}

//Create Save button
function generateSaveButton(){
    //CREATE SAVE BUTTON
    var newbutton = document.createElement("button");
    newbutton.id = "saveButton";
    newbutton.innerHTML = "Save"
    newbutton.addEventListener("click", saveToStorage);

    var colorContainer = document.getElementById("colorContainer");
    colorContainer.appendChild(newbutton);
}

//Create Load button
function generateLoadButton(){
    //CREATE Load BUTTON
    var newbutton = document.createElement("button");
    newbutton.id = "loadButton";
    newbutton.innerHTML = "Load"
    newbutton.addEventListener("click", generateLoadWindow);

    var colorContainer = document.getElementById("colorContainer");
    colorContainer.appendChild(newbutton);
}

//create turn button
function generateRotateButton () {
    var newbutton = document.createElement("button");
    newbutton.id = "rotateButton";
    newbutton.innerHTML = '<img src="https://cdn.pixabay.com/photo/2015/08/14/15/15/update-888512_960_720.png" />';
    newbutton.addEventListener("click", rotateImage);

    var toolbar = document.getElementById("toolbar");
    colorContainer.appendChild(newbutton);

}


// fucntion to initiate the toolbar
function initToolbar () {
    generateToolBar(); //generates the actual bar
    generateColorPallet(); //generate the color tools
    generateColorSelector(); // generate color selector
    // generateSlideBar(); //generate slidebar (NOT COMPLETED)
    generateRotateButton() // generate rotate button
    generateSaveButton(); //generate save button
    generateLoadButton(); //generate load button
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
    
    //append canvas
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


// ------------ CREATE LOAD WINDOW ---------------

function generateLoadWindow(){

    //create box
    var window = document.createElement("div");
    window.id = "canvasSizeWindow";
    window.style.position = "fixed";
    window.style.display = "inline-block"
    
    //create header
    var header = document.createElement("p");
    header.innerHTML = "Please select a file to load";
    header.id = "textLoad";
    window.appendChild(header);

    // create drowdown
    var form = document.createElement("form");
    form.id = "loadForm";
    form.name = "loadForm";
    window.appendChild(form);

    //append to body
    document.body.appendChild(window);

    var x = document.createElement("input");
    x.setAttribute("list", "browsers");
    x.id = "loadInput";
    document.getElementById("loadForm").appendChild(x);

    var y = document.createElement("datalist");
    y.setAttribute("id", "browsers");
    document.getElementById("loadForm").appendChild(y);


    //loop and create all elements for list

    var fileList = localStorage;

    for( var i = 0; i < fileList.length; i++){
        var listItem = document.createElement("option");
        listItem.setAttribute("value",fileList.key(i));
        document.getElementById("browsers").appendChild(listItem);
    }

    //create submit button
    var newbutton = document.createElement("button");
    newbutton.id = "loadConfirmButton";
    newbutton.innerHTML = "Load Image"
    
    window.appendChild(newbutton);
    newbutton.addEventListener("click", loadFromStorage);

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

//create matrix from current canvas
function createMatrix () {
    
    var amountOfRows = canvasSize.height;
    var amountOfCollums = canvasSize.width;

    // var newMatrix = [amountOfRows][amountOfCollums];
    var newMatrix = [];
  

    //loop through canvas and save all background collors
    for (var j = 0; j <amountOfRows; j++){
        
        var newRow = [];

        for(var i = 0; i < amountOfCollums; i++){
            var createID = "r" + j + "c"+i;
            cell = document.getElementById(createID);
            newRow.push(window.getComputedStyle(cell).getPropertyValue('background-color'));
        }
        newMatrix.push(newRow);
    }
    canvasArray = newMatrix;   
}

//read from matrix to canvas 
function updateCanvasFromMatrix () {

    var matrix = canvasArray;

    var amountOfRows = matrix.length;
    var amountOfCollums = matrix[0].length;

    //loop through martix and update canvas
    for (var j = 0; j <amountOfRows; j++){
        for(var i = 0; i < amountOfCollums; i++){
            var createID = "r" + j + "c"+i;
            cell = document.getElementById(createID);
            cell.style.backgroundColor = matrix[j][i];  
        }
    }
    
}

//save image to local storage
function saveToStorage () {

    createMatrix(); //save current canvas to matrix

    var name = prompt("Please provide image name:");
    localStorage.setItem(name, JSON.stringify(canvasArray));

}

//load image from local storage
function loadFromStorage () {

    //get file name from input to load
    var fileToLoad = document.getElementById('loadInput').value;

    
    var loaded = localStorage.getItem(fileToLoad);
    canvasArray = JSON.parse(loaded);

    //read array size
    var rows = canvasArray.length;
    var collumns = canvasArray[0].length;

    canvasSize.width = collumns;
    canvasSize.height = rows;


    document.getElementById("canvas").remove();
    generateCanvas(collumns, rows);

    updateCanvasFromMatrix(); //update canvas

    //remove loadwindow
    hideCanvasWindow();


}

//Create new Matrix of zeros and rotate current one
function rotateMatrix(canvasArray){

    var currentMatrix = canvasArray;
    var newRotatedMatrix = [];

    var currentAmountOfRows = canvasArray.length; //j
    var currentAmountOfColl = canvasArray[0].length; //i

    //create new rotated empty array
    var newAmountOfRows = currentAmountOfColl; 
    var newAmountOfColl = currentAmountOfRows;

    for(var i = 0; i < newAmountOfRows; i++){
        
        var newRow = [];
        for(var j = 0; j < newAmountOfColl; j++){
            newRow.push("0");
        }
        newRotatedMatrix.push(newRow);
    }


    //populate new array i row and j coll of new array
    for (var i = 0; i < newAmountOfRows; i++){
        for (var j = 0; j < newAmountOfColl; j ++){

            newRotatedMatrix[i][j] = currentMatrix[(newAmountOfColl-1)-j][i];

        }

    }

    return newRotatedMatrix;
}

//rotate image make use of rotate Matrix
function rotateImage () {

    //save current image to array
    createMatrix();

    //create new rotated matrix
    var rotatedMatrix = rotateMatrix(canvasArray);

    //update canvas array
    canvasArray = rotatedMatrix;
    canvasSize.height = canvasArray.length;
    canvasSize.width = canvasArray[0].length;

    //remove current canvas
    document.getElementById("canvas").remove();

    //create new canvas
    generateCanvas(canvasSize.width, canvasSize.height)

    //update canvas with new matrix
    updateCanvasFromMatrix();
}

//zoom in and zoomout
function zoomFunction(zoomNumber){

    // switch(zoomNumber){

    //     document.getElementsByClassName("block");


    //     case 1: 


    //     case 2:

    // }
}

// ----------- GLOBAL INIT

function init () {

    initToolbar(); // Initiate the toolbar and all its active elements
    
    generateCanvasSizeWindow ();

}