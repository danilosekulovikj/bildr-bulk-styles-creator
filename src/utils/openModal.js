import { aceEditor, modalWrapper } from "../main";
import { modal } from "../components/createModalWrapper";

// Function to open modal
export function openModal() {
  aceEditor.session.setValue("");
  modalWrapper.style.display = "block";
  setTimeout(() => {
    modal.style = "width: 720px; right: 0px;";
  }, 300);
}
