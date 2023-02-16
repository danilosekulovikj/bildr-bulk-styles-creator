export function createCodeEditor() {
  const codeEditor = document.createElement("div");
  codeEditor.style = "width: 100%; height: 100%;";
  codeEditor.id = "rawCSSEditor";
  return codeEditor;
}
