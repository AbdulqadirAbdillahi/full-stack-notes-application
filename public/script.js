let input = document.getElementById("input");
let buttonEl = document.getElementById("add-button");
let tasklist = document.getElementById("tasklist");

// GET (READ)
async function getNotes() {
    
    const response = await fetch("/data");
    const notes = await response.json();
    tasklist.innerHTML = "";

    notes.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note.name;

        
        // DELETE 
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", async () => {
            await fetch(`/data/${note.id}`, {method: "DELETE"});
            getNotes();
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

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

        try{
            const response = await fetch("/data",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(inputNote),
            });

            if (response.ok) {
                input.value = "";
                getNotes();
            }
        } catch (error) {
            console.error("There is a error adding this note!!:");
        }

    
    });


getNotes();