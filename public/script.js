let input = document.getElementById("input");
let buttonEl = document.getElementById("add-button");
let tasklist = document.getElementById("tasklist");


async function getNotes() {
    
    const response = await fetch("/data");
    const notes = await response.json();
    tasklist.innerHTML = "";

    notes.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note.name;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", async () => {
            await fetch(`/data/${note.id}`, {method: "DELETE"});
            getNotes();
        });

        li.appendChild(deleteButton);
        tasklist.appendChild(li);
    });
    
}

getNotes();