import { closeModal } from "../utils/closeModal.js";

function createCloseModalButton() {
  const closeModalButton = document.createElement("div");
  closeModalButton.innerText = "Close";
  closeModalButton.classList.add("css_22492", "css_23176");
  closeModalButton.style =
    "position:absolute;top:0px;right:0px;min-width:100px;";
  closeModalButton.addEventListener("click", (event) =>
    closeModal(event, closeModalButton)
  );
  return closeModalButton;
}

export const closeModalButton = createCloseModalButton();
