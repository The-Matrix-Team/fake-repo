let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let writingArea = document.getElementById("textArea");
let removeButton = document.getElementById("clearAll");
let highLights = document.querySelectorAll(".highLight");

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
  writingArea.innerHTML = "";
});
