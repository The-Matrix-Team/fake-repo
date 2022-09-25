// import { arr } from "./index";
import allNotesAPI from "./allNotesAPI.js";
// import { arr } from "./index.js";

let highLights = document.querySelectorAll(".highLight");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let writingArea = document.getElementById("textArea");
let titleArea = document.getElementById("Title");
let removeButton = document.getElementById("clearAll");
let saveButton = document.getElementById("saveNote");
let backButton = document.getElementById("backButton");

let meraArray = [];
let id = createRandomId();

// add default add
let fontList = ["Arial", "Times New Roman", "Courier New", "cursive"];
const init = () => {
  fontList.map((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  fontSizeRef.value = 4;
};

// Highlight button when clicked
highLights.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("here");
    button.classList.toggle("active");
  });
});

const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

removeButton.addEventListener("click", () => {
  var msg = confirm("Do you really want to clear all?");
  if (msg == true) {
    writingArea.innerHTML = "";
  }
});

var hook = true;
window.onbeforeunload = function () {
  if (hook) {
    return "Did you save your stuff?";
  }
};
function unhook() {
  hook = false;
}

function createRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

saveButton.addEventListener("click", () => {
  let content = writingArea.innerHTML;
  let title = titleArea.innerText;

  if (content !== "" && title !== "") {
    let note = {
      id: id,
      title: title,
      content: content,
    };
    allNotesAPI.saveNote(note);
    alert("Note saved successfully");
    unhook();
  } else {
    alert("Note can`t be empty");
  }
});

window.onload = init();