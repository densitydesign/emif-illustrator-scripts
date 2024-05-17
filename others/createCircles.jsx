//#target illustrator

function createCirclesAtTextCenters() {
  // Check if there is an active document
  if (app.documents.length == 0) {
    alert("No active document found!");
    return;
  }

  var doc = app.activeDocument;
  // Check if anything is selected
  if (doc.selection.length == 0) {
    alert("No objects selected!");
    return;
  }

  var selection = doc.selection;
  var textItems = [];

  // Collect all text items from the selection
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].typename === "TextFrame") {
      textItems.push(selection[i]);
    }
  }

  if (textItems.length == 0) {
    alert("No text items selected!");
    return;
  }

  // Create a circle for each text item at the center of its bounding box
  for (var j = 0; j < textItems.length; j++) {
    var text = textItems[j];
    var bounds = text.geometricBounds; // [x1, y1, x2, y2]
    var centerX = (bounds[0] + bounds[2]) / 2;
    var centerY = (bounds[1] + bounds[3]) / 2;

    // Create a circle path
    var circle = doc.pathItems.ellipse(
      centerY + 30,
      centerX - 30,
      60,
      60,
      true
    );
  }

  alert(textItems.length + " circles have been created.");
}

// Run the function
createCirclesAtTextCenters();
