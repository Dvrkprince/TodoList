const addButton = document.getElementsByClassName("addToListButton")[0];
const listToAdd = document.getElementsByClassName("list-to-add")[0];
let addedList = document.getElementsByClassName("test")[0];

//Addbutton
addButton.addEventListener("click", function(){
    console.log(listToAdd.innerText);
    addedList.innerText = listToAdd.value;
  });
