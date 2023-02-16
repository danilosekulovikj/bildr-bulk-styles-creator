import { createModalInner } from "./components/createModalInner";
import { createModal } from "./components/createModal";
import { createModalWrapper } from "./components/createModalWrapper";
import { createCloseModalButton } from "./components/createCloseModalButton";
import { createModalTitle } from "./components/createModalTitle";
import { createModalHeader } from "./components/createModalHeader";
import { createCodeEditor } from "./components/createCodeEditor";
import { createImportButton } from "./components/createImportButton";
import { createNewClassButtonsWrapper } from "./components/createNewClassButtonsWrapper";
import { createBulkImportStylesButton } from "./components/createBulkImportStylesButton";
import { openModal } from "./utils/openModal";
import { waitForElementAndPerformAction } from "./utils/waitForElementAndPerformAction";

export const modalWrapper = createModalWrapper();
export const modal = createModal();
const modalInner = createModalInner();
export const closeModalButton = createCloseModalButton();
export const modalTitle = createModalTitle();
const modalHeader = createModalHeader();
const codeEditor = createCodeEditor();
const importButton = createImportButton();
const newClassButtonsWrapper = createNewClassButtonsWrapper();
const bulkImportStylesButton = createBulkImportStylesButton();
const stylesButtonIcon = document.querySelector(
  `[src="https://documents-scus.bildr.com/r42cd8b88129b4598818f5cb696e472bf/doc/css3.vchGyLHSwkGdq01kQ6oryQ.svg"]`
).parentElement;
stylesButtonIcon.addEventListener("click", () => {
  waitForElementAndPerformAction(
    "div.css_310226.css_23071 > div.css_22778 > div.css_.css_22470 > div.css_22492",
    (element) => {
      element.parentNode.insertBefore(newClassButtonsWrapper, element);
      element.style.margin = "0";
      newClassButtonsWrapper.appendChild(element);
      newClassButtonsWrapper.appendChild(bulkImportStylesButton);
      bulkImportStylesButton.addEventListener("click", () => {
        openModal();
      });
    }
  );
});

modal.appendChild(modalHeader);
modal.appendChild(modalInner);
modalInner.appendChild(codeEditor);
modalInner.appendChild(importButton);
modalWrapper.appendChild(modal);
document.body.appendChild(modalWrapper);

export const aceEditor = ace.edit("rawCSSEditor");
aceEditor.setOptions({
  theme: "ace/theme/tomorrow_night",
  mode: "ace/mode/css",
  useWorker: false,
  highlightActiveLine: true,
  showPrintMargin: false,
  wrap: true,
});
