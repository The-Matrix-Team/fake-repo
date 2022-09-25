const allNotes = document.querySelector(".allNotes");

function deleteNote(id) {
  console.log("delete");
  const notes = JSON.parse(localStorage.getItem("notesapp-notes"));
  const newNotes = notes.filter((note) => note.id != id);
  localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
  location.reload();
}

function showNotes() {
  const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

  if (!notes) return;
  notes.forEach((note) => {
    console.log(note.content);
    let currentNote = `
    
    <div class="note-div">
                <h3 class="ti">${note.title}</h3>
                ${note.content}
                    
                
                
                <button class="delete" onclick="deleteNote('${note.id}')">
                <i class="fa fa-trash delete" ></i>
                </button>
            </div>
    
  `;
    allNotes.insertAdjacentHTML("afterend", currentNote);
  });
}

showNotes();
