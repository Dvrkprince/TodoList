const addButton = document.getElementsByClassName("addToListButton")[0];
let listToAdd   = document.getElementsByClassName("list-to-add")[0];

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
    document.getElementsByClassName("lists-added")[0].appendChild(listContainer);

    //create an html element to store the list text
    let list = document.createElement('p');
    list.className = "newList";
    //take the text entered by the user and store it into a list
    list.textContent = listToAdd.value;
    //attach the list to the html div of lists
    document.getElementsByClassName("listContainer")[i].appendChild(list);

    //Remove button
    let btn = document.createElement("button");
    btn.className = "listButtons removeButton";
    btn.innerHTML = trashIcon;
    document.getElementsByClassName("listContainer")[i].appendChild(btn); 
    
    //check button
    let lineThroughButton = document.createElement("button");
    lineThroughButton.className = "listButtons lineThroughButton";
    lineThroughButton.innerHTML = checkIcon;
    document.getElementsByClassName("listContainer")[i].appendChild(lineThroughButton);

    //edit button
    let editButton = document.createElement("button");
    editButton.className = "listButtons editButton";
    editButton.innerHTML = editIcon;
    document.getElementsByClassName("listContainer")[i].appendChild(editButton);    

    i++;


    //list completed
    btn.addEventListener("click", function(){
      let toRemove = btn.parentNode;
      toRemove.remove();
      i--;
    });

    //line Through
    lineThroughButton.addEventListener("click", function(){
      let lineThroughText = lineThroughButton.parentNode.children[0];
      if(lineThroughText.style.textDecorationLine !== "line-through"){
        lineThroughText.style.textDecorationLine = "line-through";
        lineThroughButton.innerHTML =  uncheckIcon;
        lineThroughButton.parentNode.children[3].className = "listButtons editButton noEditChecked"; 
      }else{
        lineThroughText.style.textDecorationLine = "none";
        lineThroughButton.innerHTML =  checkIcon;
        lineThroughButton.parentNode.children[3].className = "listButtons editButton";
      }
    });

    //edit list
    editButton.addEventListener("click", function(event){
      let editText = editButton.parentNode.children[0];
      if(editText.style.textDecorationLine === "line-through"){
        return;
      }
      if(!(editText.isContentEditable)){//by default it is not  ediitable
        editText.setAttribute("contenteditable",true);
        editButton.innerHTML =  stopEditIcon; 
      }else{
        editText.setAttribute("contenteditable",false);
        editButton.innerHTML = editIcon;    
      }      
    }); 
  });



