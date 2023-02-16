export function createNewClassButtonsWrapper() {
  const newClassButtonsWrapper = document.createElement("div");
  newClassButtonsWrapper.style =
    "display:flex; gap:16px; flex-direction: row-reverse;";
  newClassButtonsWrapper.id = "new-class-buttons-wrapper";
  return newClassButtonsWrapper;
}
