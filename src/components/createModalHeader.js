import { modalTitle } from "./createModalTitle";
import { closeModalButton } from "./createCloseModalButton";

function createModalHeader() {
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("css_24987");
  modalHeader.append(modalTitle, closeModalButton);
  return modalHeader;
}

export const modalHeader = createModalHeader();
