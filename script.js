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

//Addbutton
addButton.addEventListener("click", function(){
    console.log(listToAdd.innerText);//testing purposes

    //checks if text area is empty
    if(listToAdd.value.trim().length < 1){
      return;
    }

    //created div element store the new p and button
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
    
    //check button
    let lineThroughButton = document.createElement("button");
    lineThroughButton.className = "listButtons lineThroughButton";
    lineThroughButton.innerHTML = checkIcon;
    document.getElementsByClassName("buttonContainer")[i].appendChild(lineThroughButton);

    //edit button
    let editButton = document.createElement("button");
    editButton.className = "listButtons editButton";
    editButton.innerHTML = editIcon;
    document.getElementsByClassName("buttonContainer")[i].appendChild(editButton);    

    i++;


    //list remove
    btn.addEventListener("click", function(){
      let toRemove = btn.parentNode.parentNode;
      toRemove.remove();
      i--;
      localStorage.setItem('recordedLists',listsHolder.innerHTML);
    });

    //line Through
    lineThroughButton.addEventListener("click", function(){
      //stores the text in the paragraph
      let lineThroughText = lineThroughButton.parentNode.parentNode.children[0];   
      //checks if the user is currently edditing
      if(lineThroughText.isContentEditable){
        return;
      }      
      //checks if text is not scratched off
      if(lineThroughText.style.textDecorationLine !== "line-through"){
        lineThroughText.style.textDecorationLine = "line-through";
        lineThroughButton.innerHTML =  uncheckIcon;
        lineThroughButton.parentNode.children[2].className  = "listButtons editButton noEditChecked";
      }else{
        lineThroughText.style.textDecorationLine = "none";
        lineThroughButton.innerHTML =  checkIcon;
        lineThroughButton.parentNode.children[2].className  = "listButtons editButton";
      }
      localStorage.setItem('recordedLists',listsHolder.innerHTML);
    });

    //edit list
    editButton.addEventListener("click", function(event){
      //stores the text in the paragraph
      let editText = editButton.parentNode.parentNode.children[0];
      console.log(editText);
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
      }else{
        editText.setAttribute("contenteditable",false);
        editButton.innerHTML = editIcon;   
        editButton.parentNode.children[1].className = "listButtons lineThroughButton";
        editText.blur();
      }
      localStorage.setItem('recordedLists',listsHolder.innerHTML);    
    }); 
    localStorage.setItem('recordedLists',listsHolder.innerHTML);
  });

function doPaste(event, list){
  let pastedText = "";

  //Reference:
  //https://stackoverflow.com/questions/11943924/javascript-removing-spaces-on-paste
  if (event.clipboardData && event.clipboardData.getData)
  {
    pastedText = event.clipboardData.getData('text/plain');
  }
  else if (window.clipboardData && window.clipboardData.getData)
  {// IE
    pastedText = window.clipboardData.getData('Text');
  }

  //to see if the code should be pasted
  let totalLength = list.textContent.length + pastedText.length;

  if(totalLength  > 280 ){
    event.preventDefault();
    return;
  }else{
    return;
  }

  
}  

//-------------------local storage section of code------------------\\
//localStorage.clear(); //testing purposes
  
let savedLists = localStorage.getItem('recordedLists');

// checksfor saved lists and updates
if (savedLists) {
 	listsHolder.innerHTML = savedLists;
  i = document.getElementsByClassName("listContainer").length;

  //remove button
  let removeCollection = document.getElementsByClassName("removeButton");
  for(let z = 0; z < removeCollection.length; z++){
    let btn = removeCollection[z];
    btn.addEventListener("click", function(){
      btn.parentNode.parentNode.remove();
      i--;
    localStorage.setItem('recordedLists',listsHolder.innerHTML);  
    });
  } 

  //line Through  
  let lineThroughCollection = document.getElementsByClassName("lineThroughButton");
  for(let z = 0; z < lineThroughCollection.length; z++){
    let btn = lineThroughCollection[z];
    btn.addEventListener("click", function(){
      //stores the text in the paragraph
      let lineThroughText = btn.parentNode.parentNode.children[0];
      //checks if the user is currently edditing
      if(lineThroughText.isContentEditable){
        return;
      }
      //checks if text is not scratched off
      if(lineThroughText.style.textDecorationLine !== "line-through"){
        lineThroughText.style.textDecorationLine = "line-through";
        btn.innerHTML =  uncheckIcon;
        btn.parentNode.children[2].className = "listButtons editButton noEditChecked";
      }else{
        lineThroughText.style.textDecorationLine = "none";
        btn.innerHTML =  checkIcon;
        btn.parentNode.children[2].className = "listButtons editButton";
      }
      localStorage.setItem('recordedLists',listsHolder.innerHTML);
    });   
  }
  
  //edit button
  let editCollection = document.getElementsByClassName("editButton");
  for(let z = 0; z < editCollection.length; z++){
    let btn = editCollection[z];
    btn.addEventListener("click", function(event){
      //stores the text in the paragraph
      let editText = btn.parentNode.parentNode.children[0];
      console.log(editText);
      //checks if text is scratched off, not editable
      if(editText.style.textDecorationLine === "line-through"){
        localStorage.setItem('recordedLists',listsHolder.innerHTML);
        return;
      }
      if(!(editText.isContentEditable)){//by default it is not ediitable
        editText.setAttribute("contenteditable",true);
        btn.innerHTML =  stopEditIcon; 
        btn.parentNode.children[1].className = "listButtons lineThroughButton noLineThroughButton";        
        editText.focus();
      }else{
        editText.setAttribute("contenteditable",false);
        btn.innerHTML = editIcon; 
        btn.parentNode.children[1].className = "listButtons lineThroughButton";     
        editText.blur();   
      }
      localStorage.setItem('recordedLists',listsHolder.innerHTML);    
    }); 
  }
  localStorage.setItem('recordedLists',listsHolder.innerHTML);
}