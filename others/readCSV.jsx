#target illustrator

function readCSVFromFile() {
    // Create a file-open dialog for the user to choose a CSV file
    var file = File.openDialog("Select a CSV file", "*.csv", false);

    if (file != null) {  // Check if the user selected a file
        if (file.open('r')) {  // Open the file for reading
            var content = file.read();  // Read the entire file content
            file.close();  // Close the file after reading

            // Optionally, process the CSV content here, or just display it
            alert("CSV Content:\n" + content);

        } else {
            alert("Failed to open the file.");
        }
    } else {
        alert("No file selected.");
    }
}

readCSVFromFile();