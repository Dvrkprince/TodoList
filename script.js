//Text area to write list
let   listToAdd   = document.getElementById("list-to-add");
//Button to add list to todo list
const addButton   = document.getElementById("addToListButton");
//Div that holds all the todoLists
let listsHolder = document.getElementById("lists-added");

//Icons
let trashIcon    = `<i class="fas fa-trash"></i>`;
let checkIcon    = `<i class="fas fa-check"></i`;
let uncheckIcon  = `<i class="fas fa-undo"></i>`;
let editIcon     =  `<i class="fas fa-edit"></i>`;
let stopEditIcon = `<i class="fas fa-stop"></i>`;

//to keep track of lists
let i = 0;

// localStorage.clear(); for debugging purposes

//-------------------Function Calls--------------------------\\
//Add Button call
addButtonGlobalEventListener("click" ,"addToListButton", function(event){
    //checks if text area is empty
    if(listToAdd.value.trim().length < 1){
        localStorage.setItem('recordedLists',listsHolder.innerHTML);
        return;
    }
    
    //created div element to store the new p element and Button Container
    let listContainer = document.createElement('div');
    listContainer.className = "listContainer";
    listsHolder.appendChild(listContainer);

    //create an html element to store the list text
    let list = document.createElement('p');
    //set character limit
    list.setAttribute("onkeypress", "return (this.innerText.length < 280)");
    list.addEventListener("paste",function(event){
        doPaste(event,list);
    });
    
    list.className = "newList";
    //take the text entered by the user and store it into a list
    list.textContent = listToAdd.value;
    //attach the list to the html div of lists
    document.getElementsByClassName("listContainer")[i].appendChild(list);

    //div to hold the buttons
    let buttonContainer =  document.createElement('div');
    buttonContainer.className = "buttonContainer";
    //append buttonCotainer to list Container
    document.getElementsByClassName("listContainer")[i].appendChild(buttonContainer);
    
    //Remove button
    let btn = document.createElement("button");
    btn.className = "listButtons removeButton";
    btn.innerHTML = trashIcon;
    document.getElementsByClassName("buttonContainer")[i].appendChild(btn); 
    
    //Line through button
    let lineThroughButton = document.createElement("button");
    lineThroughButton.className = "listButtons lineThroughButton";
    lineThroughButton.innerHTML = checkIcon;
    document.getElementsByClassName("buttonContainer")[i].appendChild(lineThroughButton);

    //edit button
    let editButton = document.createElement("button");
    editButton.className = "listButtons editButton";
    editButton.innerHTML = editIcon;
    document.getElementsByClassName("buttonContainer")[i].appendChild(editButton);   

    //increase list amount
    i++;

    //store in local storage
    localStorage.setItem('recordedLists',listsHolder.innerHTML);
});

//Remove button call
removeButtonGlobalEventListener("click" ,"removeButton", function(event){
    let toRemove = event.target.parentNode.parentNode;
    toRemove.remove();
    i--;
    localStorage.setItem('recordedLists',listsHolder.innerHTML);
});

//Line through button call
lineThroughButtonGlobalEventListener("click" ,"lineThroughButton", function(event){
    //stores the text in the paragraph
    let lineThroughButton = event.target;
    let lineThroughText = lineThroughButton.parentNode.parentNode.children[0];   
    //checks if the user is currently edditing
    if(lineThroughText.isContentEditable){
        localStorage.setItem('recordedLists',listsHolder.innerHTML);
        return;
    }      
    //checks if text is not scratched off
    if(lineThroughText.style.textDecorationLine !== "line-through"){
        lineThroughText.style.textDecorationLine = "line-through";
        lineThroughButton.innerHTML =  uncheckIcon;
        lineThroughButton.parentNode.children[2].className  = "listButtons editButton noEditChecked";
        //edit color of check button
        lineThroughButton.style.backgroundColor = "blue";
    }else{
        lineThroughText.style.textDecorationLine = "none";
        lineThroughButton.innerHTML =  checkIcon;
        lineThroughButton.parentNode.children[2].className  = "listButtons editButton";
        //edit color of check button
        //lineThroughButton.className = "listButtons lineThroughButton";
        lineThroughButton.style.backgroundColor = "";
    }
    localStorage.setItem('recordedLists',listsHolder.innerHTML);
});

//Edit button call 
editButtonGlobalEventListener("click" ,"editButton", function(event){
    //stores the text in the paragraph
    let editButton = event.target;
    let editText = editButton.parentNode.parentNode.children[0];
    //checks if text is scratched off, not editable
    if(editText.style.textDecorationLine === "line-through"){
        localStorage.setItem('recordedLists',listsHolder.innerHTML);
        return;
    }
    if(!(editText.isContentEditable)){//by default it is not ediitable
        editText.setAttribute("contenteditable",true);
        editButton.innerHTML =  stopEditIcon; 
        editButton.parentNode.children[1].className = "listButtons lineThroughButton noLineThroughButton";
        editText.focus();
        editButton.style.backgroundColor= "rgb(154, 228, 250)";
    }else{
        editText.setAttribute("contenteditable",false);
        editButton.innerHTML = editIcon;   
        editButton.parentNode.children[1].className = "listButtons lineThroughButton";
        editText.blur();
        editButton.style.backgroundColor= "";
    }
    localStorage.setItem('recordedLists',listsHolder.innerHTML);    
}); 


//---------------------Functions----------------------\\
//Add button
function addButtonGlobalEventListener(type, selector,callback){
  document.addEventListener(type, function(event){
    if(event.target.id === selector)
    {
        localStorage.setItem('recordedLists',listsHolder.innerHTML); 
        callback (event);
    }
  });
}

//Remove button
function removeButtonGlobalEventListener(type, selector,callback){
    document.addEventListener(type, function(event){
        if(event.target.classList.contains(selector))
        {
            localStorage.setItem('recordedLists',listsHolder.innerHTML); 
            callback (event);
        }
    });
}

//Linethrough button
function lineThroughButtonGlobalEventListener(type, selector,callback){
    document.addEventListener(type, function(event){
        if(event.target.classList.contains(selector))
        {
            localStorage.setItem('recordedLists',listsHolder.innerHTML); 
            callback (event);
            
        }
    });
}

//Edit button
function editButtonGlobalEventListener(type, selector,callback){
    document.addEventListener(type, function(event){
        if(event.target.classList.contains(selector))
        {
            localStorage.setItem('recordedLists',listsHolder.innerHTML); 
            callback (event);
        }
    });
}

//working on how to fix paste issue
//fow now pasting is disabled
function doPaste(event, list){
    event.preventDefault(); 
    // let pastedText = "";

    // //Reference:
    // //https://stackoverflow.com/questions/11943924/javascript-removing-spaces-on-paste
    // if (event.clipboardData && event.clipboardData.getData)
    // {
    //   pastedText = event.clipboardData.getData('text/plain');
    // }
    // else if (window.clipboardData && window.clipboardData.getData)
    // {// IE
    //   pastedText = window.clipboardData.getData('Text');
    // }
    // console.log(pastedText);
    // //to see if the code should be pasted
    // let totalLength = list.textContent.length + pastedText.length;
    // let max = 280 - list.textContent.length;
    // //pastedText = pastedText.slice(0, max);   
    // if(totalLength  > 280 ){ 
    //     event.preventDefault(); 
    //     return;
    // }else{
    //     return;
    // }
}  

//Recover any previous lists not deleted
let savedLists = localStorage.getItem('recordedLists');

if (savedLists) {
    listsHolder.innerHTML = savedLists;
    i = document.getElementsByClassName("listContainer").length;
    localStorage.setItem('recordedLists',listsHolder.innerHTML);
    console.log(i + " lists were found");
}else{
    console.log("No Lists were found");
}
