import { closeModal } from "../utils/closeModal.js";

export function createModalWrapper() {
  const modalWrapper = document.createElement("div");
  modalWrapper.classList.add("css_22490");
  modalWrapper.style = "top: 0px; z-index: 999997; display:none;";
  modalWrapper.addEventListener("click", (event) =>
    closeModal(event, modalWrapper)
  );
  return modalWrapper;
}
