#target illustrator

function uppercaseObjectNames() {
  if (app.documents.length === 0) {
    alert("No active document found!");
    return;
  }

  var doc = app.activeDocument;

  if (doc.selection.length === 0) {
    alert("No objects selected!");
    return;
  }

  var selection = doc.selection;

  var count = 0;
  // Iterate over each selected object
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].name) {
      // Check if the object has a name property
      selection[i].name = selection[i].name.toUpperCase();
      count++;
    }
  }

  alert(count + " names of selected objects have been converted to uppercase.");
}

uppercaseObjectNames();
