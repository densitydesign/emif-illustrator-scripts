// This script selects all text frames with names "context", "bond", or "ground" in Adobe Illustrator.

// Check if there is an active document
if (app.documents.length > 0) {
  // Get the active document
  var doc = app.activeDocument;

  // Array to hold the names we are looking for
  var namesToSelect = { context: true, bond: true, ground: true };

  // Clear the current selection
  doc.selection = null;

  // Loop through all text frames in the document
  for (var i = 0; i < doc.textFrames.length; i++) {
    var textFrame = doc.textFrames[i];

    // Check if the name of the text frame is one of the specified names
    if (textFrame.name in namesToSelect) {
      // If the name matches, add it to the selection
      textFrame.selected = true;
    }
  }
} else {
  alert("There is no active document.");
}
