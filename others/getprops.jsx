// Check if there is a document and a selection
if (app.documents.length > 0 && app.activeDocument.selection.length > 0) {
  // Get the first selected item
  var selectedItem = app.activeDocument.selection[0];

  // Log the type of the selected item
  alert("Type of selected item: " + selectedItem.typename);

  // Log all enumerable properties of the selected item
  for (var prop in selectedItem) {
    try {
      // Attempt to log the property value; some properties might throw an error if accessed directly
      alert(prop + ": " + selectedItem[prop]);
    } catch (error) {
      alert(prop + ": [Cannot retrieve value]");
    }
  }
} else {
  // Notify if no selection or document is open
  alert("Please open a document and select an item.");
}
