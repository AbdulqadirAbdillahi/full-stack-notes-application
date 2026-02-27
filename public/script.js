// SELECTORS - LINKS JS VARIABLE TO THE HTML ELEMENTS
let input = document.getElementById("input");
let buttonEl = document.getElementById("add-button");
let tasklist = document.getElementById("tasklist");

// GET (READ) FETCHES DATA FROM SERVER
async function getNotes() {
    
    const response = await fetch("/data");
    const notes = await response.json();

    tasklist.innerHTML = ""; 
    // PREVENTS DUPLICATES

    notes.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note.name;

        
        // DELETE BUTTON - REDIRECTS ID TO THE SERVER SO IT REMOVES FROM DATA.JSON
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", async () => {
            await fetch(`/data/${note.id}`, {method: "DELETE"});
            getNotes();
            // GETNOTES() REFRESHES SO THE ITEM DISSAPEARS
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        // PUT (UPDATE) CREATES A EDIT BUTTON

        editButton.addEventListener("click", async () => {
            const newInput = prompt("What would you like to change this to?:", note.name);
            if (newInput && newInput.trim() !== "" ){
                await fetch (`/data/${note.id}`,{
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({name: newInput}),
                });
                getNotes();
                }
                    
        });


        // ADDS THE BUTTONS ON THE PAGE
        li.appendChild(deleteButton);
        tasklist.appendChild(li);
        li.appendChild(editButton);

    });

}
    // POST (CREATE) - waits for the submit click
    buttonEl.addEventListener("click", async () =>{
        const inputNote = {name : input.value};
        // "NAME" SO IT MATCHES THE BACKEND

        try{
            const response = await fetch("/data",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(inputNote),
            });

            if (response.ok) {
                input.value = ""; 
                // RESETS THE INPUT FIELD
                getNotes();
                // REFRESHES SO THE ITEM DISAPPEARS
            }
        } catch (error) {
            console.error("There is a error adding this note!!:");
        }

    
    });


getNotes();