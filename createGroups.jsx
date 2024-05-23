// #target illustrator

function replacePathsWithGroups() {
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
  var pathItems = [];

  // Collect all path items from the selection
  for (var i = 0; i < selection.length; i++) {
    if (selection[i].typename === "PathItem") {
      pathItems.push(selection[i]);
    }
  }

  if (pathItems.length == 0) {
    alert("No path items selected!");
    return;
  }

  //variables for creation. measures in points.
  var circleDiameter = 90; // title path diameter
  var titleFontSize = 10;
  //text areas
  var textWidth = 108; // Width in points
  var textHeight = 63; // Height in points
  var textFontSize = 10; //text font size
  //plaeholder circle if no text is shown
  var pCircleDiameter = 60;

  // var test = [];
  // for (e in data) {
  //   test.push(e);
  // }
  // alert(test);

  var errors = [];

  // Process each path item
  for (var j = 0; j < pathItems.length; j++) {
    var path = pathItems[j];
    var bounds = path.geometricBounds; // [x1, y1, x2, y2]
    var centerX = (bounds[0] + bounds[2]) / 2;
    var centerY = (bounds[1] + bounds[3]) / 2;
    var groupName = path.name || "UnnamedPath";

    // check if there is a corrsedponding element in data
    if (groupName in data) {
      var d = data[groupName];

      // Create group for the new items
      var group = doc.groupItems.add();
      group.name = groupName;

      // Create a circle centered on the path

      var circle = group.pathItems.ellipse(
        centerY + circleDiameter / 2,
        centerX - circleDiameter / 2,
        circleDiameter,
        circleDiameter,
        false
      );
      //circle.name = "title";
      circle.stroked = false;
      circle.filled = false;

      // Create text path around the circle
      var textPath = group.textFrames.pathText(circle);
      textPath.name = "title";
      textPath.contents = d.title.length > 0 ? d.title : " ";
      textPath.textRange.characterAttributes.size = titleFontSize; // Adjust text size as necessary
      textPath.textRange.characterAttributes.textFont = app.textFonts.getByName(
        "IndivisibleVarRoman-SemiBold"
      );
      textPath.textRange.justification = Justification.CENTER;
      textPath.rotate(90);

      // if the data must be shown, then createtext areas, otherwise just a circle
      if (d.showText === "TRUE") {
        // Create text area at the center of the original path

        var rect = group.pathItems.rectangle(
          centerY + textHeight / 2, // Y position
          centerX - textWidth / 2, // X position
          textWidth, // Width
          textHeight // Height
        );
        var textArea = group.textFrames.areaText(rect);
        textArea.contents = d.context.length > 0 ? d.context : " ";
        textArea.name = "context";
        textArea.textRange.justification = Justification.CENTER;
        textArea.textRange.characterAttributes.leading = textFontSize;
        textArea.textRange.characterAttributes.textFont =
          app.textFonts.getByName("IndivisibleVarRoman-Medium");
        var blueColor = new CMYKColor();
        blueColor.cyan = 100;
        blueColor.magenta = 0;
        blueColor.yellow = 0;
        blueColor.black = 0;
        textArea.textRange.characterAttributes.fillColor = blueColor;

        // create a second area text, overlapped to the previous one, but yellow
        var rect2 = group.pathItems.rectangle(
          centerY + textHeight / 2 - textFontSize / 2, // Y position
          centerX - textWidth / 2, // X position
          textWidth, // Width
          textHeight // Height
        );
        var textArea2 = group.textFrames.areaText(rect2);
        textArea2.contents = d.bond.length > 0 ? d.bond : " ";
        textArea2.name = "bond";
        textArea2.textRange.justification = Justification.CENTER;
        textArea2.textRange.characterAttributes.leading = textFontSize;
        textArea2.textRange.characterAttributes.textFont =
          app.textFonts.getByName("IndivisibleVarRoman-Medium");
        var yellowColor = new CMYKColor();
        yellowColor.cyan = 0;
        yellowColor.magenta = 0;
        yellowColor.yellow = 100;
        yellowColor.black = 0;
        textArea2.textRange.characterAttributes.fillColor = yellowColor;

        // create a second area text, overlapped to the previous one, but yellow
        var rect3 = group.pathItems.rectangle(
          centerY + textHeight / 2 - textFontSize, // Y position
          centerX - textWidth / 2, // X position
          textWidth, // Width
          textHeight // Height
        );
        var textArea3 = group.textFrames.areaText(rect3);
        textArea3.contents = d.ground.length > 0 ? d.ground : " ";
        textArea3.name = "ground";
        textArea3.textRange.justification = Justification.CENTER;
        textArea3.textRange.characterAttributes.leading = textFontSize;
        textArea3.textRange.characterAttributes.textFont =
          app.textFonts.getByName("IndivisibleVarRoman-Medium");
        var redColor = new CMYKColor();
        redColor.cyan = 0;
        redColor.magenta = 100;
        redColor.yellow = 0;
        redColor.black = 0;
        textArea3.textRange.characterAttributes.fillColor = redColor;

        // Remove the original path
      } else {
        var circle = group.pathItems.ellipse(
          centerY + pCircleDiameter / 2,
          centerX - pCircleDiameter / 2,
          pCircleDiameter,
          pCircleDiameter,
          false
        );
        circle.stroked = false;
        var color = new CMYKColor();
        color.cyan = 10;
        color.magenta = 10;
        color.yellow = 10;
        color.black = 0;
        circle.fillColor = color;
      }
      path.remove();
    } else {
      errors.push(groupName);
    }
  }

  if (errors.length > 0) {
    alert("no data for " + errors);
  }

  alert(
    pathItems.length +
      " paths have been replaced with groups containing a circle and a text area."
  );
}

// function createHeaders(arr) {
//   var headers = {};
//   for (var i = 0; i < arr.length; i++) {
//     headers[arr[i]] = i;
//   }
//   return headers;
// }

// function createIds(arr, idIndex) {
//   var indexes = {};
//   for (var i = 0; i < arr.length; i++) {
//     indexes[arr[i][idIndex]] = i;
//   }
//   return indexes;
// }

function createObjFromCSV() {
  // Create a file-open dialog for the user to choose a CSV file
  var file = File.openDialog("Select a TSV file", "*.tsv", false);

  if (file != null) {
    // Check if the user selected a file
    if (file.open("r")) {
      // Open the file for reading
      var content = file.read(); // Read the entire file content
      file.close(); // Close the file after reading

      // Optionally, process the CSV content here, or just display it
      //alert("TSV Content:\n" + content);

      //parse CSV and return it as array of arrays
      var csv = content.split("\n");
      var headers = csv[0].split("\t");
      var results = {};
      for (var i = 1; i < csv.length; i++) {
        var line = csv[i].split("\t");
        var obj = {};
        for (var j = 1; j < line.length; j++) {
          obj[headers[j]] = line[j];
        }
        results[line[0]] = obj;
      }

      return results;
    } else {
      alert("Failed to open the file.");
    }
  } else {
    alert("No file selected.");
  }
}

var data = createObjFromCSV();
// Run the function
replacePathsWithGroups(data);
