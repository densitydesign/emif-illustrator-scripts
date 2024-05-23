# Adobe Illustrator Script Documentation

This README provides guidance on how to utilize a custom script within Adobe Illustrator to automate the creation of glyphs using a dataset.

## Pre-requisites

Before running the script, ensure you have:

1. Adobe Illustrator installed on your computer.
2. The script file (`createGroups.jsx`) placed in an accessible location.

## Dataset Preparation

Your dataset must be prepared according to the following specifications:

- The dataset should be in TSV format with the following columns: `ID   showText    title   context bond    ground`.
- Ensure that there are no newline characters (return characters) within any cells of the dataset as they can cause the script to fail.
- Each row in the dataset corresponds to a unique object within your Adobe Illustrator document.
- The `ID` column in your dataset should match the names of objects within your Adobe Illustrator document.

## Running the Script

To run the script within Adobe Illustrator, follow these steps:

1. Open Adobe Illustrator and load the document you wish to manipulate.
2. Navigate to `File > Scripts > Other Script`.
3. Browse to the location where you saved the `createGroups.jsx` file.
4. Select the script and click `Open` to run it.

The script will reference the dataset and modify the Illustrator document according to the parameters specified within the dataset.

## Important Notes

- Ensure that all objects that need to be manipulated by the script are correctly named and correspond to the `ID` column in your dataset.
- If there are discrepancies in object names or missing entries, the script may not perform as expected.
