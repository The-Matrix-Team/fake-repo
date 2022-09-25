function createRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

let id = createRandomId();

export default class allNotesAPI {
  static getAllNotes() {
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

    return notes;
  }

  static saveNote(noteToSave) {
    const notes = localStorage.getItem("notesapp-notes");
    if (notes) {
      const newNotes = JSON.parse(notes);
      const existing = newNotes.find((note) => note.id == noteToSave.id);
      if (existing) {
        console.log("update");
        existing.content = noteToSave.content;
        console.log("updated");
      } else {
        console.log("create");
        noteToSave.id = noteToSave.id;
        newNotes.push(noteToSave);
      }
      localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    } else {
      console.log("create-poora ka poora");
      localStorage.setItem("notesapp-notes", JSON.stringify([noteToSave]));
      console.log("created");
    }
  }

  static deleteNote(id) {
    const notes = JSON.parse(localStorage.getItem("notesapp-notes"));

    const newNotes = notes.filter((note) => note.id != id);

    localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
  }
}
