#target illustrator

function renamePathsWithTextCenter() {
    // Check if there is an active document
    if (app.documents.length == 0) {
        alert('No active document found!');
        return;
    }

    var doc = app.activeDocument;
    // Check if anything is selected
    if (doc.selection.length == 0) {
        alert('No objects selected!');
        return;
    }

    var selection = doc.selection;
    var textItems = [];
    var pathItems = [];

    // Separate text and path objects
    for (var i = 0; i < selection.length; i++) {
        if (selection[i].typename === 'TextFrame') {
            textItems.push(selection[i]);
        } else if (selection[i].typename === 'PathItem') {
            pathItems.push(selection[i]);
        }
    }

    if (textItems.length == 0 || pathItems.length == 0) {
        alert('Selection must include both text and path items.');
        return;
    }

    var renamedCount = 0;

    // Check for center point containment and rename paths
    for (var j = 0; j < pathItems.length; j++) {
        var path = pathItems[j];
        var pathBounds = path.geometricBounds; // [x1, y1, x2, y2]

        for (var k = 0; k < textItems.length; k++) {
            var text = textItems[k];
            var textBounds = text.geometricBounds; // [x1, y1, x2, y2]
            var centerX = (textBounds[0] + textBounds[2]) / 2;
            var centerY = (textBounds[1] + textBounds[3]) / 2;

            // Check if the center point of the text is inside the path's bounding box
            if (centerX >= pathBounds[0] && centerX <= pathBounds[2] && centerY <= pathBounds[1] && centerY >= pathBounds[3]) {
                // Rename the path with the text content
                path.name = text.contents;
                renamedCount++;
                break; // Stop checking other texts once a match is found
            }
        }
    }

    alert(renamedCount + ' paths have been renamed based on text center point.');
}

// Run the function
renamePathsWithTextCenter();
