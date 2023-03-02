import { modalWrapper } from "../components/createModalWrapper";
import { aceEditorObj } from "../components/aceEditor";
import { modal } from "../components/createModalWrapper";

// Function to open modal
export function openModal() {
  aceEditorObj.setAceEditorValue("");
  modalWrapper.style.display = "block";
  setTimeout(() => {
    modal.style = "width: 720px; right: 0px;";
  }, 300);
}
