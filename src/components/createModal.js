import { modalInner } from "./createModalInner";
import { modalHeader } from "./createModalHeader";

function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("css_23917");
  modal.style = "width: 720px; right: calc(-720px);";
  modal.append(modalHeader, modalInner);
  return modal;
}

export const modal = createModal();
