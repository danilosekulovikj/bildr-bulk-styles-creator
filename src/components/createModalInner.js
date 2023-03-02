import { createClassTypeSwitch } from "./createClassTypeSwitch";
import { createCodeEditor } from "./createCodeEditor";
import { createStylesButton } from "./createStylesButton";

const classTypeSwitch = createClassTypeSwitch();
const codeEditor = createCodeEditor();
const importButton = createStylesButton();

export function createModalInner() {
  const modalInner = document.createElement("div");
  modalInner.append(classTypeSwitch, codeEditor, importButton);
  modalInner.classList.add("css_23071", "css_23074");
  modalInner.style = "padding: 10px;background: rgb(36, 41, 43);";
  return modalInner;
}
