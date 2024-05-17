#target illustrator

function createCirclesFromPathData() {
    if (app.documents.length === 0) {
        alert('No active document found!');
        return;
    }

    var doc = app.activeDocument;

    // File path to the desktop location
    var file = new File(Folder.desktop + "/pathData.txt");

    // Attempt to open the file
    if (file.open('r')) {
        var line;
        while (!file.eof) {
            line = file.readln();
            var parts = line.split(", ");
            if (parts.length >= 3) {  // Ensuring there's enough data
                var name = parts[0];
                var x = parseFloat(parts[1]);
                var y = parseFloat(parts[2]);

                // Create a circle at the specified x, y
                var radius = 10;  // Define the radius of the circle
                var circle = doc.pathItems.ellipse(y + radius, x - radius, 2 * radius, 2 * radius, true);
                circle.name = name;  // Optionally set the name of the path
            }
        }
        file.close();
        alert('Circles have been created based on the path data.');
    } else {
        alert('Failed to open the file.');
    }
}

createCirclesFromPathData();