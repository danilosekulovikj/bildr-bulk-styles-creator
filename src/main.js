import { modalWrapper } from "./components/createModalWrapper";
import { newClassButtonsWrapper } from "./components/createNewClassButtonsWrapper";
import { bulkImportStylesButton } from "./components/createBulkCreateStylesButton";
import { openModal } from "./utils/openModal";
import { aceEditorObj } from "./components/aceEditor";

var BildrBulkClassCreator;
(function (BildrBulkClassCreator) {
  class BildrBulkClassCreatorPlugin extends Bildr.plugins.PluginBase {
    constructor() {
      super(
        "BildrBulkClassDev",
        "https://p27b199c99d034975afab252b7f1086c4.bildr.com/"
      );
      this.addAction("hidePlugin", () => {
        this.hide();
      });
      this.addAction("enablePlugin", () => {
        observer.observe(targetNode, config);
      });
      this.addAction("disablePlugin", () => {
        observer.disconnect();
      });
    }
  }
  BildrBulkClassCreator.BildrBulkClassCreatorPlugin =
    BildrBulkClassCreatorPlugin;
  console.log("BildrBulkClassCreator loaded");

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
              if (
                targetElement &&
                targetElement.innerText === "New Style Class"
              ) {
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

  document.body.appendChild(modalWrapper);
  aceEditorObj.init();
})(BildrBulkClassCreator || (BildrBulkClassCreator = {}));
// Register the plugin on loading this script
Bildr.plugins.manager.register(
  new BildrBulkClassCreator.BildrBulkClassCreatorPlugin()
);
