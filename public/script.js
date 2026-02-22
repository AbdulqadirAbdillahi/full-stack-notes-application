let input = document.getElementById("input");
let buttonEl = document.getElementById("add-button");
let tasklist = document.getElementById("tasklist");

let tasks = [] 
// store tasks inside of an array

buttonEl.addEventListener("click", onclickButton);
// when button is clicked run the onclickbutton function (remember when clicking still 
// does nothing)

function onclickButton(){

    let inputEl = input.value;

    if (inputEl === "") {
        alert("Please write a task to add!");
        return;
    }

    // this is creates an alert if the user hasnt typed anything in, will pop up on the browser

    input.value = "";

    // clears the input field when the user has typed




    // whatever the user has typed store it in inputEl
    let divItem = document.createElement("div");
    // create a new html element (remember it does not exist yet)
       divItem.textContent = inputEl;
    // added users text inside the new div, so when user types, add eggs in the inputfield
    // it then gets added

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function(){
        divItem.firstChild.textContent = prompt("Edit task");
    });



    let deleteButton = document.createElement("button");
    // creates a new html button element
      deleteButton.textContent = "Delete";
    //   adds visible text to the button

    deleteButton.addEventListener("click", function(){
        // when the button is click, run this function
        tasklist.removeChild(divItem);
        // remove the divitem this button belongs to


    });

       divItem.appendChild(deleteButton);
    //    adds the delete button inside the task div
       tasklist.appendChild(divItem);
    //    appears on the page so user can see it
    // also, has to be outside the function, otherwise it doesnt work!
       divItem.appendChild(editBtn);
}