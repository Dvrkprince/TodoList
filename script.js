const addButton = document.getElementsByClassName("addToListButton")[0];
let listToAdd = document.getElementsByClassName("list-to-add")[0];

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

    //created Completed button
    let btn = document.createElement("button");
    btn.className = "listButtons removeButton";
    btn.innerHTML = "Remove";
    document.getElementsByClassName("listContainer")[i].appendChild(btn); 
    
    //scratch off button
    let lineThroughButton = document.createElement("button");
    lineThroughButton.className = "listButtons lineThroughButton";
    lineThroughButton.innerHTML = "Scratch Off";
    document.getElementsByClassName("listContainer")[i].appendChild(lineThroughButton);

    //edit button
    let editButton = document.createElement("button");
    editButton.className = "listButtons editButton";
    editButton.innerHTML = "Edit";
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
      }else{
        lineThroughText.style.textDecorationLine = "none";
      }
    });

    //edit list
    editButton.addEventListener("click", function(event){
      let editText = editButton.parentNode.children[0];
      if(editButton.innerHTML !== "Edit"){
        editText.setAttribute("contenteditable",false);
        editButton.innerHTML = "Edit";
      }else{
        editText.setAttribute("contenteditable",true);
        editButton.innerHTML = "Stop Edit";    
      }      
    }); 
  });




   