import allNotesAPI from "./allNotesAPI.js";

var button = document.querySelector(".add-box");

button.addEventListener("click", () => {
  console.log(allNotesAPI.getAllNotes());
});
