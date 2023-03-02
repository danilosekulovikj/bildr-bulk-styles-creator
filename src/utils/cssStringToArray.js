import { performActions } from "./performActions";

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
    const attributesArray = attributesString
      .split(";")
      .filter(Boolean)
      .map((attribute) => {
        const [propertyName, value] = attribute.split(":");
        return {
          propertyName: propertyName.trim(),
          value: value.trim(),
          newProperty: "0",
        };
      });

    result.push({
      selector,
      attributes: attributesArray,
    });
  }
  performActions(result);
  return result;
}
