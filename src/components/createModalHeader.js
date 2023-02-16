import { modalTitle, closeModalButton } from "../main";

export function createModalHeader() {
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("css_24987");
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeModalButton);
  return modalHeader;
}
