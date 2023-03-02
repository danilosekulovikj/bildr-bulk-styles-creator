export const aceEditorObj = {
  aceEditor: null,
  init: function() {
    this.aceEditor = ace.edit("rawCSSEditor");
    this.setAceEditorOptions({
      theme: "ace/theme/twilight",
      mode: "ace/mode/css",
      useWorker: false,
      highlightActiveLine: true,
      showPrintMargin: false,
      wrap: true,
    });
  },
  setAceEditorValue: function(value) {
    this.aceEditor.session.setValue(value);
  },
  setAceEditorOptions: function(options) {
    this.aceEditor.setOptions(options);
  },
  getAceEditorValue: function() {
    return this.aceEditor.getValue();
  }
};

