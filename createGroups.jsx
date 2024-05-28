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
  var textLeading = 11; // text leading
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
        textArea.blendingMode = BlendModes.MULTIPLY;
        textArea.textRange.justification = Justification.CENTER;
        textArea.textRange.characterAttributes.autoLeading = false;
        textArea.textRange.characterAttributes.leading = textLeading;
        textArea.textRange.characterAttributes.textFont =
          app.textFonts.getByName("IndivisibleVarRoman-Medium");
        replaceWithIcons(textArea);
        useFontAwesome(textArea);
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
        textArea2.blendingMode = BlendModes.MULTIPLY;
        textArea2.textRange.justification = Justification.CENTER;
        textArea2.textRange.characterAttributes.autoLeading = false;
        textArea2.textRange.characterAttributes.leading = textLeading;
        textArea2.textRange.characterAttributes.textFont =
          app.textFonts.getByName("IndivisibleVarRoman-Medium");
        replaceWithIcons(textArea2);
        useFontAwesome(textArea2);
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
        textArea3.blendingMode = BlendModes.MULTIPLY;
        textArea3.textRange.justification = Justification.CENTER;
        textArea3.textRange.characterAttributes.autoLeading = false;
        textArea3.textRange.characterAttributes.leading = textLeading;
        textArea3.textRange.characterAttributes.textFont =
          app.textFonts.getByName("IndivisibleVarRoman-Medium");
        replaceWithIcons(textArea3);
        useFontAwesome(textArea3);
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

var icons_generic = [
  { string: "overwatch", code: "\uf11b" }, //games
  { string: "fortnite", code: "\uf11b" }, //games
  { string: "diamond", code: "\uf11b" }, //games
  { string: "rocketleague", code: "\uf11b" }, //games
  { string: "gaia", code: "\uf11b" }, //games
];

var icons_brands = [
  { string: "tiktok", code: "\ue07b" },
  { string: "discord", code: "\uf392" },
  { string: "twitter", code: "\uf099" },
  { string: "instagram", code: "\uf16d" },
  { string: "twitch", code: "\uf1e8" },
  { string: "facebook", code: "\uf082" },
  { string: "linkedin", code: "\uf0e1" },
  { string: "youtube", code: "\uf167" },
  { string: "pinterest", code: "\uf0d2" },
  { string: "snapchat", code: "\uf2ad" },
  { string: "reddit", code: "\uf1a1" },
  { string: "tumblr", code: "\uf173" },
  { string: "whatsapp", code: "\uf232" },
  { string: "spotify", code: "\uf1bc" },
  { string: "vimeo", code: "\uf27d" },
  { string: "slack", code: "\uf198" },
  { string: "github", code: "\uf09b" },
  { string: "google", code: "\uf1a0" },
  { string: "dribbble", code: "\uf17d" },
  { string: "skype", code: "\uf17e" },
  { string: "flickr", code: "\uf16e" },
  { string: "soundcloud", code: "\uf1be" },
  { string: "behance", code: "\uf1b4" },
];

var icons = icons_brands.concat(icons_generic);

var iconCodes_brands = {};

for (var i = 0; i < icons_brands.length; i++) {
  var icon = icons_brands[i];
  iconCodes_brands[icon.code] = true;
}

var iconCodes_generic = {};

for (var i = 0; i < icons_generic.length; i++) {
  var icon = icons_generic[i];
  iconCodes_generic[icon.code] = true;
}

function useFontAwesome(textFrame) {
  // Check if any documents are open

  // Loop through each character in the text frame
  for (var i = 0; i < textFrame.textRange.characters.length; i++) {
    var character = textFrame.textRange.characters[i];
    var characterCode = character.contents;

    // Check if the character's Unicode code
    if (characterCode in iconCodes_brands) {
      // Apply the FontAwesome font to this character
      character.textFont = app.textFonts.getByName(
        "FontAwesome6Brands-Regular"
      );
    }
    // Check if the character's Unicode code
    if (characterCode in iconCodes_generic) {
      // Apply the FontAwesome font to this character
      character.textFont = app.textFonts.getByName("FontAwesome6Free-Solid");
    }
  }
}

function replaceWithIcons(textFrame) {
  var textContent = textFrame.contents;

  // Loop through each social media platform defined in the array using a traditional for loop
  for (var i = 0; i < icons.length; i++) {
    var platformName = icons[i].string;
    var iconCode = icons[i].code;

    // Create a case-insensitive regex for the platform name
    var regex = new RegExp(platformName, "gi"); // 'g' for global, 'i' for case-insensitive

    // Search and replace platform name with icon code, case insensitively
    if (textContent.match(regex)) {
      // Replace platform name with FontAwesome icon code
      textContent = textContent.replace(regex, iconCode);
    }
  }

  textFrame.contents = textContent;
}

var data = createObjFromCSV();
// Run the function
replacePathsWithGroups(data);
