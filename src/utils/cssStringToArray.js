import { performActions } from "./performActions";

// Converts the pasted rawCSS into array with properties
export function cssStringToArray(rawCSS) {
  const cssString = rawCSS;
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
