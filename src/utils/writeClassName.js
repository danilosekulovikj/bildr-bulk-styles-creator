// Writes the class name in the input field
export function writeClassName(element, value) {
  element.value = value;
  const keyPressEvent = new InputEvent("keypress");
  element.dispatchEvent(keyPressEvent);
}
