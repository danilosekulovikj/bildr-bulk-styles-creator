function waitForElementAndPerformAction(selector, actionCallback) {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(intervalId);
        actionCallback(element);
        resolve();
      }
    }, 1000);
  });
}

function clickElement(element) {
  element.click();
}

function setInputValue(element, value) {
  element.value = value;
  const keyPressEvent = new InputEvent("keypress");
  element.dispatchEvent(keyPressEvent);
}

function setCSSInput(element, value) {
  element.value = value;
  const inputEvent = new InputEvent("input");
  element.dispatchEvent(inputEvent);
}

function cssStringToArray() {
  const cssString = prompt("Please enter the CSS string:");
  if (!cssString) return;

  const rules = cssString.split("}");
  const result = [];

  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i].trim();
    if (rule.length === 0) continue;

    const parts = rule.split("{");
    const selector = parts[0].trim().replace(/^\./, "");
    const attributesString = parts[1].replace(/[\n\r]/g, "").trim();

    result.push({
      selector,
      attributes: attributesString,
    });
  }
  performActions(result);
}

async function performActions(classesArray) {
  const bildrSpinnerIMG = document.querySelector(
    '[src="https://documents-scus.bildr.com/bildr2ac3ef7a68e34896b1c2c2f93c0b6addrev1020/doc/B-animation-1-onBlack.AHpoifKZA0WrRlMwDXuH3Q.gif"]'
  );
  bildrSpinnerIMG.parentNode.querySelector(
    '[innerhtml="Spinning up the studio"]'
  ).innerHTML = "Please wait while the style classes are being created";
  bildrSpinnerIMG.parentNode.style.display = "flex";
  bildrSpinnerIMG.parentNode.style.zIndex = "2147483647";
  try {
    await waitForElementAndPerformAction(
      "body > div.css_pY0UdpBdWEmrrlUDqKOX1A.css_23062 > div:nth-child(1) > div > div:nth-child(12)",
      clickElement
    );

    for (const [index, classObj] of classesArray.entries()) {
      const { selector, attributes } = classObj;

      const waitMessages = [
        `Hang tight! We're creating the "${selector}" style class - ${
          index + 1
        } of ${classesArray.length}.`,
        `Watch out, Picasso! The "${selector}" style class is being created - ${
          index + 1
        } of ${classesArray.length}.`,
        `The "${selector}" style class is coming to life - ${index + 1} of ${
          classesArray.length
        }.`,
        `Beep boop beep! "${selector}" style class in progress - ${
          index + 1
        } of ${classesArray.length}.`,
        `You're a style class creation machine! "${selector}" is up next - ${
          index + 1
        } of ${classesArray.length}.`,
        `The "${selector}" style class is cooking up in the background - ${
          index + 1
        } of ${classesArray.length}.`,
        `Creating the "${selector}" style class... hold tight! ${
          index + 1
        } of ${classesArray.length}.`,
        `The "${selector}" style class is on its way - ${index + 1} of ${
          classesArray.length
        }. Get ready!`,
        `Don't look now, but the "${selector}" style class is being created - ${
          index + 1
        } of ${classesArray.length}.`,
        `Roses are red, violets are blue, we're creating the "${selector}" style class - ${
          index + 1
        } of ${classesArray.length}, just for you!`,
        `Adding some style to your life! Creating "${selector}" - ${
          index + 1
        } of ${classesArray.length}.`,
        `Your website is about to get a lot more stylish! Working on "${selector}" - ${
          index + 1
        } of ${classesArray.length}.`,
        `It's style time! Generating "${selector}" - ${index + 1} of ${
          classesArray.length
        }.`,
        `Don't worry, I'm a professional stylist! Creating "${selector}" - ${
          index + 1
        } of ${classesArray.length}.`,
        `Creating some serious style magic! Working on "${selector}" - ${
          index + 1
        } of ${classesArray.length}.`,
        `Hold on tight, things are about to get stylish! Generating "${selector}" - ${
          index + 1
        } of ${classesArray.length}.`,
        `Your website is in good hands! Adding "${selector}" - ${
          index + 1
        } of ${classesArray.length} to the list.`,
        `This is going to be one stylish website! Creating "${selector}" - ${
          index + 1
        } of ${classesArray.length}.`,
        `Don't blink, or you might miss the stylish transformation! Working on "${selector}" - ${
          index + 1
        } of ${classesArray.length}.`,
        `Brace yourself for some serious style! Generating "${selector}" - ${
          index + 1
        } of ${classesArray.length}.`,
      ];

      const randomIndex = Math.floor(Math.random() * waitMessages.length);
      const message = `${waitMessages[randomIndex]}`;
      bildrSpinnerIMG.parentNode.querySelector(
        '[innerhtml="Spinning up the studio"]'
      ).innerHTML = message;

      await waitForElementAndPerformAction(
        "div.css_310226.css_23071 > div.css_22778 > div.css_.css_22470 > div.css_22492",
        clickElement
      );
      await waitForElementAndPerformAction(
        "div.css_310226.css_23071 > div.css_22490 > div > input",
        (element) => setInputValue(element, selector)
      );
      await waitForElementAndPerformAction(
        "div.css_310226.css_23071 > div.css_22490 > div > div.css_22536",
        clickElement
      );
      await waitForElementAndPerformAction(
        "div.css_24988 > div > div > div > div.css_300917.css_23052.css_25480 > div:nth-child(4) > div.css_23172",
        clickElement
      );
      await waitForElementAndPerformAction(
        "div.css_24988 > div > div > div > div.css_24857 > div:nth-child(3)",
        clickElement
      );
      await waitForElementAndPerformAction(
        '[class="css_23917"][style="width: 720px; right: 0px;"] .ace_dark > textarea',
        (element) => setCSSInput(element, attributes)
      );
      await waitForElementAndPerformAction(
        "div.css_24988 > div > div > div > div:nth-child(5) > div.css_.css_300461.css_23050",
        clickElement
      );
      await waitForElementAndPerformAction(
        '[class="css_23917"][style="width: 720px; right: 0px;"] > div.css_24987 > div.css_22492.css_23176',
        clickElement
      );
    }
    await waitForElementAndPerformAction(
      "body > div:nth-child(13) > div.css_22782",
      clickElement
    );
    bildrSpinnerIMG.parentNode.querySelector(
      '[innerhtml="Spinning up the studio"]'
    ).innerHTML = `All style classes succeffuly created`;
    setTimeout(function () {
      bildrSpinnerIMG.parentNode.style.display = "none";
    }, 2000);
    console.log("All actions complete.");
  } catch (error) {
    await waitForElementAndPerformAction(
      "body > div:nth-child(13) > div.css_22782",
      clickElement
    );
    bildrSpinnerIMG.parentNode.style.display = "none";
    console.error("An error occurred:", error);
  }
}

cssStringToArray();
