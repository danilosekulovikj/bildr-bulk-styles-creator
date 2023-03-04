import { modalWrapper } from "../components/createModalWrapper";
import { modal } from "../components/createModal";
// Function to close modal
export function closeModal(event, element) {
  if (event.target === element) {
    // Check if the target is the parent
    modal.style = "width: 720px; right: calc(-720px);";
    setTimeout(() => {
      modalWrapper.style.display = "none";
    }, 300);
  } else {
    // If the target is a child, prevent the event from propagating
    event.stopPropagation();
  }
}
