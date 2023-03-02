import { modalWrapper } from "./components/createModalWrapper";
import { createNewClassButtonsWrapper } from "./components/createNewClassButtonsWrapper";
import { createBulkCreateStylesButton } from "./components/createBulkCreateStylesButton";
import { openModal } from "./utils/openModal";
import { aceEditorObj } from "./components/aceEditor";

const newClassButtonsWrapper = createNewClassButtonsWrapper();
const bulkImportStylesButton = createBulkCreateStylesButton();

const targetNode = document.querySelector(
  '[name="Unified Search"][class="css_310226 css_23071 "]'
);

const observer = new MutationObserver((mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      for (let addedNode of mutation.addedNodes) {
        if (addedNode.nodeType === Node.ELEMENT_NODE) {
          const targetElement = addedNode.querySelector(".css_22492");
          if (!newClassButtonsWrapper.contains(targetElement)) {
            if (targetElement) {
              // do something
              targetElement.parentNode.insertBefore(
                newClassButtonsWrapper,
                targetElement
              );
              targetElement.style.margin = "0";
              newClassButtonsWrapper.append(
                targetElement,
                bulkImportStylesButton
              );
              bulkImportStylesButton.addEventListener("click", () => {
                openModal();
              });
            }
          }
        }
      }
    }
  }
});

const config = { childList: true, subtree: true };
observer.observe(targetNode, config);

document.body.appendChild(modalWrapper);
aceEditorObj.init();
