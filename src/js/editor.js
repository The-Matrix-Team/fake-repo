import allNotesAPI from "./allNotesAPI.js";

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
let copyButton = document.getElementById("copyButton");

let id = createRandomId();
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// add default add
let fontList = ["Arial", "Times New Roman", "Courier New", "cursive"];

const init = () => {
  // fontList.map((value) => {
  //   let option = document.createElement("option");
  //   option.value = value;
  //   option.innerHTML = value;
  //   fontName.appendChild(option);
  // });

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  fontSizeRef.value = 4;
};

const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id !== "undo" || button.id !== "redo") {
      console.log("Not undo or redo");
      button.classList.toggle("active");
    }
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
    titleArea.value = "";
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
  let title = titleArea.value;
  let content = writingArea.innerHTML;

  let currentDate = new Date(),
    month = months[currentDate.getMonth()],
    day = currentDate.getDate(),
    year = currentDate.getFullYear();

  if (content !== "" && title !== "") {
    let note = {
      id: id,
      title: title,
      content: content,
      date: `${month} ${day}, ${year}`,
    };
    allNotesAPI.saveNote(note);
    alert("Note saved successfully");
    unhook();
  } else {
    alert("Note can`t be empty");
  }
});

copyButton.addEventListener("click", () => {
  let input = writingArea.innerText;
  navigator.clipboard.writeText(input);
  alert("Copied the text: " + input);
});
// copyButton.addEventListener("click", () => {
//   var range = document.createRange();
//   range.selectNode(document.getElementById("a"));
//   window.getSelection().removeAllRanges(); // clear current selection
//   window.getSelection().addRange(range); // to select text
//   document.execCommand("copy");
//   window.getSelection().removeAllRanges(); // to deselect
// });
window.onload = init();
