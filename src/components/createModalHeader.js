import { createModalTitle } from "./createModalTitle";
import { createCloseModalButton } from "./createCloseModalButton";

const modalTitle = createModalTitle();
const closeModalButton = createCloseModalButton();

export function createModalHeader() {
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("css_24987");
  modalHeader.append(modalTitle, closeModalButton);
  return modalHeader;
}
