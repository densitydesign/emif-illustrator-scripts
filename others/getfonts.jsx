#target illustrator

function alertUsedFonts() {
    if (app.documents.length == 0) {
        alert('No active document found!');
        return;
    }

    var doc = app.activeDocument;

    if (doc.selection.length == 0) {
        alert('No objects selected!');
        return;
    }

    var selection = doc.selection;
    var fontsUsed = [];
    var uniqueFonts = {};

    // Iterate over selected items
    for (var i = 0; i < selection.length; i++) {
        if (selection[i].typename === 'TextFrame') {
            var textFrames = selection[i].textRanges;

            // Check all text ranges for different fonts
            for (var j = 0; j < textFrames.length; j++) {
                var fontName = textFrames[j].characterAttributes.textFont.name;
                
                // Store unique font names
                if (!uniqueFonts[fontName]) {
                    uniqueFonts[fontName] = true;
                    fontsUsed.push(fontName);
                }
            }
        }
    }

    if (fontsUsed.length === 0) {
        alert('No text fonts found in the selected text!');
    } else {
        alert('Fonts used in the selected text: \n' + fontsUsed.join(', '));
    }
}

alertUsedFonts();
