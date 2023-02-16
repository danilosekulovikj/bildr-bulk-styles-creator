import { getMessage } from "./getMessage";
import { waitForElementAndPerformAction } from "./waitForElementAndPerformAction";
import { writeClassName } from "./writeClassName";
import { writeCSSAttributes } from "./writeCSSAttributes";

// Performs the automation of class creation

export async function performActions(classesArray) {
  waitForElementAndPerformAction(
    '[src="https://documents-scus.bildr.com/bildr2ac3ef7a68e34896b1c2c2f93c0b6addrev1020/doc/B-animation-1-onBlack.AHpoifKZA0WrRlMwDXuH3Q.gif"]',
    (element) => {
      element.parentNode.querySelector(
        '[innerhtml="Spinning up the studio"]'
      ).innerHTML = "Please wait while the style classes are being created";
      element.parentNode.style.display = "flex";
      element.parentNode.style.zIndex = "2147483647";
    }
  );
  waitForElementAndPerformAction(
    `[style="height: 100%; width: 100%; position: fixed; top: 0px; left: 0px; background-color: rgba(0, 0, 0, 0.91); z-index: 999990; backdrop-filter: blur(3px); cursor: pointer; display: flex;"]`,
    (element) => {
      element.style.visibility = "hidden";
    }
  );
  waitForElementAndPerformAction(
    `[style="top: 0px; z-index: 999997; display: block;"]`,
    (element) => {
      element.style.visibility = "hidden";
    }
  );
  try {
    for (const [index, classObj] of classesArray.entries()) {
      const { selector, attributes } = classObj;

      const waitMessage = getMessage(selector, index, classesArray);
      const randomIndex = Math.floor(Math.random() * waitMessage.length);
      const message = `${waitMessage[randomIndex]}`;
      waitForElementAndPerformAction(
        '[src="https://documents-scus.bildr.com/bildr2ac3ef7a68e34896b1c2c2f93c0b6addrev1020/doc/B-animation-1-onBlack.AHpoifKZA0WrRlMwDXuH3Q.gif"]',
        (element) => {
          element.parentNode.querySelector(
            '[innerhtml="Spinning up the studio"]'
          ).innerHTML = message;
        }
      );

      await waitForElementAndPerformAction(
        "#new-class-buttons-wrapper > .css_22492",
        (element) => {
          element.click();
        }
      );
      await waitForElementAndPerformAction(
        "div.css_310226.css_23071 > div.css_22490 > div > input",
        (element) => writeClassName(element, selector)
      );
      await waitForElementAndPerformAction(
        "div.css_310226.css_23071 > div.css_22490 > div > div.css_22536",
        (element) => {
          element.click();
        }
      );
      await waitForElementAndPerformAction(
        "div.css_24988 > div > div > div > div.css_300917.css_23052.css_25480 > div:nth-child(4) > div.css_23172",
        (element) => {
          element.click();
        }
      );
      await waitForElementAndPerformAction(
        "div.css_24988 > div > div > div > div.css_24857 > div:nth-child(3)",
        (element) => {
          element.click();
        }
      );
      await waitForElementAndPerformAction(
        '[class="css_23917"][style="width: 720px; right: 0px;"] .ace_dark > textarea',
        (element) => writeCSSAttributes(element, attributes)
      );
      await waitForElementAndPerformAction(
        "div.css_24988 > div > div > div > div:nth-child(5) > div.css_.css_300461.css_23050",
        (element) => {
          element.click();
        }
      );
      await waitForElementAndPerformAction(
        '[class="css_23917"][style="width: 720px; right: 0px;"] > div.css_24987 > div.css_22492.css_23176',
        (element) => {
          element.click();
        }
      );
    }
    waitForElementAndPerformAction(
      `[style="height: 100%; width: 100%; position: fixed; top: 0px; left: 0px; background-color: rgba(0, 0, 0, 0.91); z-index: 999990; backdrop-filter: blur(3px); cursor: pointer; display: flex; visibility: hidden;"]`,
      (element) => {
        element.style.removeProperty("visibility");
      }
    );
    waitForElementAndPerformAction(
      `[style="top: 0px; z-index: 999997; display: block; visibility: hidden;"]`,
      (element) => {
        element.style.removeProperty("visibility");
      }
    );
    waitForElementAndPerformAction(
      '[src="https://documents-scus.bildr.com/bildr2ac3ef7a68e34896b1c2c2f93c0b6addrev1020/doc/B-animation-1-onBlack.AHpoifKZA0WrRlMwDXuH3Q.gif"]',
      (element) => {
        element.parentNode.querySelector(
          '[innerhtml="Spinning up the studio"]'
        ).innerHTML = `All style classes succeffuly created`;
        setTimeout(function () {
          element.parentNode.style.display = "none";
        }, 2000);
      }
    );
    console.log("All actions complete.");
  } catch (error) {
    waitForElementAndPerformAction(
      `[style="height: 100%; width: 100%; position: fixed; top: 0px; left: 0px; background-color: rgba(0, 0, 0, 0.91); z-index: 999990; backdrop-filter: blur(3px); cursor: pointer; display: flex; visibility: hidden;"]`,
      (element) => {
        element.style.removeProperty("visibility");
      }
    );
    waitForElementAndPerformAction(
      `[style="top: 0px; z-index: 999997; display: block; visibility: hidden;"]`,
      (element) => {
        element.style.removeProperty("visibility");
      }
    );
    waitForElementAndPerformAction(
      '[src="https://documents-scus.bildr.com/bildr2ac3ef7a68e34896b1c2c2f93c0b6addrev1020/doc/B-animation-1-onBlack.AHpoifKZA0WrRlMwDXuH3Q.gif"]',
      (element) => {
        element.parentNode.querySelector(
          '[innerhtml="Spinning up the studio"]'
        ).innerHTML = `Looks like something went wrong. Give it another shot!`;
        setTimeout(function () {
          element.parentNode.style.display = "none";
        }, 2000);
      }
    );
    console.error("An error occurred:", error);
  }
}
