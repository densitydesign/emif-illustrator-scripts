// Adobe Illustrator Script

// Create a new document
var doc = app.documents.add();

// Add a circle to the document
var circle = doc.pathItems.ellipse(300, 150, 200, 200); // Adjust position and size as needed

// Add a rectangle to the document, positioned over the circle
var rectangle = doc.pathItems.rectangle(150, 150, 300, 150); // Adjust position and size as needed

// Group the shapes
var group = doc.groupItems.add();
group.name = "mioTest";
circle.moveToBeginning(group);
rectangle.moveToBeginning(group);

// Unite the shapes using the Pathfinder 'add' operation
group.selected = true;
app.executeMenuCommand("Live Pathfinder Add");
app.executeMenuCommand("expandStyle");

// Deselect all
doc.selection = null;

// Access the group "mioTest"
var mioTestGroup = doc.groupItems.getByName("mioTest");

// Retrieve the compound path from the group
var compoundPath = mioTestGroup.pathItems[0];

// Check if the compound path was found
if (!compoundPath) {
  alert("Error: Compound path not found.");
} else {
  // Create a text frame within the compound path
  var textFrame = doc.textFrames.areaText(compoundPath);
  textFrame.contents = "This is a sample text inside the composite shape.";

  alert("Script completed successfully!");
}
