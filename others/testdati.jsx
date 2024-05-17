#target illustrator

function createHeaders(arr) {
    var headers = {};
    for (var i = 0; i < arr.length; i++) {
        headers[arr[i]] = i;
    }
    return headers;
}

function createTextAreasFromCSV() {
    // Create a dialog
    var dialog = new Window('dialog', 'Enter TSV Data');
    dialog.preferredSize.width = 400;
    dialog.alignChildren = 'left';

    // Add a multiline text input
    var input = dialog.add('edittext', undefined, '', {multiline: true});
    input.size = {width: 380, height: 200};

    // Add OK and Cancel buttons
    var btnGroup = dialog.add('group');
    btnGroup.alignment = 'center';
    var okBtn = btnGroup.add('button', undefined, 'OK');
    var cancelBtn = btnGroup.add('button', undefined, 'Cancel');

    // Function to parse and create text areas
    function parseAndCreateTextAreas(csvData) {

        alert(csvData)

        var lines = csvData.split('\n');
        

        // Parse the CSV headers
        var headers = createHeaders(lines[0].split('\t'));
        var titleIndex = headers['title'];
        alert(titleIndex)
        var showIndex = headers['showText'];
        alert(showIndex)

        if (app.documents.length === 0) {
            alert('No active document found!');
            return;
        }

        var doc = app.activeDocument;

        alert('creating '+lines.length+' text areas')
        
        for (var i = 1; i < lines.length; i++) {
            var columns = lines[i].split('\t');
            if (columns[showIndex] === 'TRUE') {
                var textContent = columns[titleIndex];
                
                // Create text frame
                var textFrame = doc.textFrames.add();
                textFrame.contents = textContent;
                textFrame.left = 100;  // X position
                textFrame.top = -100 - (i * 20);  // Y position, moving down for each new text
            }
        }
    }

    // OK button functionality
    okBtn.onClick = function() {
        parseAndCreateTextAreas(input.text);
        dialog.close();
    };

    // Cancel button functionality
    cancelBtn.onClick = function() {
        dialog.close();
    };

    // Display the dialog
    dialog.show();
}

createTextAreasFromCSV();
