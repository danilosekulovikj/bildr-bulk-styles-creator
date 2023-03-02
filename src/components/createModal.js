import { createModalInner } from "./createModalInner";
import { createModalHeader } from "./createModalHeader";
const modalInner = createModalInner();
const modalHeader = createModalHeader();

export function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("css_23917");
  modal.style = "width: 720px; right: calc(-720px);";
  modal.append(modalHeader, modalInner);
  return modal;
}
