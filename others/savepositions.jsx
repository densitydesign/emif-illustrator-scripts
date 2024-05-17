#target illustrator

function exportPathData() {
    if (app.documents.length === 0) {
        alert('No active document found!');
        return;
    }

    var doc = app.activeDocument;
    
    if (doc.selection.length === 0) {
        alert('No objects selected!');
        return;
    }

    var selection = doc.selection;
    var pathData = [];

    // Iterate over each selected object
    for (var i = 0; i < selection.length; i++) {
        if (selection[i].typename === 'PathItem') {
            var path = selection[i];
            var name = path.name || "UnnamedPath";

            // Get geometric bounds of the path [x1, y1, x2, y2]
            var bounds = path.geometricBounds;
            var centerX = (bounds[0] + bounds[2]) / 2; // (x1 + x2) / 2
            var centerY = (bounds[1] + bounds[3]) / 2; // (y1 + y2) / 2

            pathData.push(name + ", " + centerX.toFixed(2) + ", " + centerY.toFixed(2));
        }
    }

    if (pathData.length === 0) {
        alert('No paths found in the selection!');
        return;
    }

    // Create a new text file
    var file = new File(Folder.desktop + "/pathData.txt");
    if (file.open('w')) {
        file.write(pathData.join("\n"));
        file.close();
        alert('Data has been written to ' + file.fsName);
    } else {
        alert('Failed to create file.');
    }
}

exportPathData();
