import { createModalWrapper } from "./components/createModalWrapper";
import { createNewClassButtonsWrapper } from "./components/createNewClassButtonsWrapper";
import { createBulkCreateStylesButton } from "./components/createBulkCreateStylesButton";
import { openModal } from "./utils/openModal";
import { waitForElementAndPerformAction } from "./utils/waitForElementAndPerformAction";

export const modalWrapper = createModalWrapper();
const newClassButtonsWrapper = createNewClassButtonsWrapper();
const bulkImportStylesButton = createBulkCreateStylesButton();

waitForElementAndPerformAction(
  `[src="https://documents-scus.bildr.com/bildr2ac3ef7a68e34896b1c2c2f93c0b6addrev1020/doc/css3.vchGyLHSwkGdq01kQ6oryQ.svg"]`,
  (element) => {
    const stylesButtonIcon = element.parentElement;
    stylesButtonIcon.addEventListener("click", () => {
      waitForElementAndPerformAction(
        "div.css_310226.css_23071 > div.css_22778 > div.css_.css_22470 > div.css_22492",
        (element) => {
          element.parentNode.insertBefore(newClassButtonsWrapper, element);
          element.style.margin = "0";
          newClassButtonsWrapper.append(element, bulkImportStylesButton);
          bulkImportStylesButton.addEventListener("click", () => {
            openModal();
          });
        }
      );
    });
  }
);

document.body.appendChild(modalWrapper);

export const aceEditor = ace.edit("rawCSSEditor");
aceEditor.setOptions({
  theme: "ace/theme/twilight",
  mode: "ace/mode/css",
  useWorker: false,
  highlightActiveLine: true,
  showPrintMargin: false,
  wrap: true,
});
