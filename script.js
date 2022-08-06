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
    btn.className = "completedButton";
    btn.innerHTML = "Completed";
    document.getElementsByClassName("listContainer")[i].appendChild(btn); 
    i++;

    //list completed
    btn.addEventListener("click", function(){
      let toRemove = document.getElementsByClassName("completedButton")[0].parentNode;
      toRemove.remove();
      i--;
    });
  });


