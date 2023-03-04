import { classTypeSwitch } from "./createClassTypeSwitch";
import { codeEditor } from "./createCodeEditor";
import { importButton } from "./createStylesButton";

function createModalInner() {
  const modalInner = document.createElement("div");
  modalInner.append(classTypeSwitch, codeEditor, importButton);
  modalInner.classList.add("css_23071", "css_23074");
  modalInner.style = "padding: 10px;background: rgb(36, 41, 43);";
  return modalInner;
}

export const modalInner = createModalInner();
