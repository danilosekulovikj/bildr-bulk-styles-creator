import { modalWrapper } from "./components/createModalWrapper";
import { newClassButtonsWrapper } from "./components/createNewClassButtonsWrapper";
import { bulkImportStylesButton } from "./components/createBulkCreateStylesButton";
import { openModal } from "./utils/openModal";
import { aceEditorObj } from "./components/aceEditor";

if (!localStorage.getItem("bscPluginEnabledFor")) {
  localStorage.setItem("bscPluginEnabledFor", JSON.stringify([]));
}

let projectId = window.baseSelProjID;
let enabledForProjects = JSON.parse(
  localStorage.getItem("bscPluginEnabledFor")
);
let observerRunning = false;

var BildrBulkStylesCreator;
(function (BildrBulkStylesCreator) {
  class BildrBulkStylesCreatorPlugin extends Bildr.plugins.PluginBase {
    constructor() {
      super(
        "BulkStylesCreator",
        "https://p27b199c99d034975afab252b7f1086c4.bildr.com/"
      );
      this.addAction("hidePlugin", () => {
        this.hide();
      });
      this.addAction("enablePlugin", () => {
        if (enabledForProjects.indexOf(projectId) === -1) {
          enabledForProjects.push(projectId);
          localStorage.setItem(
            "bscPluginEnabledFor",
            JSON.stringify(enabledForProjects)
          );
        }
        if (!observerRunning) {
          observer.observe(targetNode, config);
          observerRunning = true;
        }
      });
      this.addAction("disablePlugin", () => {
        let index = enabledForProjects.indexOf(projectId);
        if (index > -1) {
          enabledForProjects.splice(index, 1);
        }
        localStorage.setItem(
          "bscPluginEnabledFor",
          JSON.stringify(enabledForProjects)
        );
        if (observerRunning && enabledForProjects.indexOf(projectId) === -1) {
          // check if observer should be stopped
          observer.disconnect();
          observerRunning = false;
        }
      });
      this.addAction("checkIfProjectExist", () => {
        if (enabledForProjects && enabledForProjects.indexOf(projectId) > -1) {
          if (!observerRunning) {
            return;
          }
        }
      });
    }
  }
  BildrBulkStylesCreator.BildrBulkStylesCreatorPlugin =
    BildrBulkStylesCreatorPlugin;
  console.log("Bulk Styles Creator loaded");

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
})(BildrBulkStylesCreator || (BildrBulkStylesCreator = {}));
// Register the plugin on loading this script
Bildr.plugins.manager.register(
  new BildrBulkStylesCreator.BildrBulkStylesCreatorPlugin()
);
