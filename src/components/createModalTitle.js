function createModalTitle() {
  const modalTitle = document.createElement("div");
  modalTitle.innerText = "Bulk Create Styles";
  modalTitle.classList.add("css_1242");
  modalTitle.style =
    "width:calc(100% - 120px);white-space:nowrap;text-overflow:ellipsis;overflow:hidden;";
  return modalTitle;
}

export const modalTitle = createModalTitle();
