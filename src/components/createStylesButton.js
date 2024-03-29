import { cssStringToArray } from "../utils/cssStringToArray.js";
import { closeModal } from "../utils/closeModal.js";
import { aceEditorObj } from "./aceEditor.js";

function createStylesButton() {
  const importButton = document.createElement("div");
  importButton.innerText = "Create Styles";
  importButton.classList.add("css_300461", "css_23050");
  importButton.style = "border-radius:0px 0px 5px 5px;";
  importButton.addEventListener("click", () => {
    let rawCSS = aceEditorObj.getAceEditorValue();
    cssStringToArray(rawCSS);
    closeModal(importButton);
  });
  return importButton;
}

export const importButton = createStylesButton();
