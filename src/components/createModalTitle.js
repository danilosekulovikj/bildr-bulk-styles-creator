export function createModalTitle() {
  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Styles Bulk Import";
  modalTitle.classList.add("css_1242");
  modalTitle.style =
    "width:calc(100% - 120px);white-space:nowrap;text-overflow:ellipsis;overflow:hidden;";
  return modalTitle;
}