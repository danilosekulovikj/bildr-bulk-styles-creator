// Writes the CSS attributes in the code editor
export function writeCSSAttributes(element, value) {
  element.value = value;
  const inputEvent = new InputEvent("input");
  element.dispatchEvent(inputEvent);
}
