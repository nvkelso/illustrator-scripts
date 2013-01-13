/*
JET_X_SwatchesLegend.jsx
A Javascript for Adobe Illustrator by James E. Talmage.

Purpose:
Creates a series of labeled squares at the bottom left of the Artboard, each filled with one Swatch in the Swatches Panel.
Useful for adding a "color legend" on pages of identity graphics, to specify colors.

Algorithm:
For each named Swatch in the Swatches Palette, the script draws a square filled with the Swatch color,
and creates beside it a PointType object containing the name of the Swatch.
The text labels are filled with Registration color.
A prompt allows the user to set the desired size of the squares (in points). The label text size is 1/3 the size of the squares.

To Use:
The script creates squares and labels for each swatch defined in the Swatches Panel, not just those used in the artwork.
Therefore, before running the script, use the Add Used Colors command in the Swatches Panel flyout menu to make sure
Swatches are defined for all used colors. Use Select All Unused and Delete Swatch commands to remove unused Swatches.

Experimental Notes:
The script is titled "JET_X..." because although it is useable, I consider it a work-in-progress.
1. The value entered in the prompt is by default interpreted as a string, which in the first attempt,
caused the spacing of the squares to act wrong. The parseFloat() function is used
to correct that.
2. Add a dialog with radio buttons to select between:
All Named Swatches
Used Named Swatches
All Spot Swatches
Used Spot Swatches
Then embed this script into a function that is called with All Named Swatches is selected.
*/

var docRef=app.activeDocument;
var SwatchBoxSize=Window.prompt("Enter the desired text size in points:", 24);
var swatchBoxSize=parseFloat(SwatchBoxSize);
var swatchBoxTop=swatchBoxSize;
for(i=docRef.swatches.length-1;i>=0;i--){
	var swatchRef=docRef.swatches[i];
	var swatchRefName=docRef.swatches[i].name;
	var swatchBox=docRef.pathItems.rectangle(swatchBoxTop, 0, swatchBoxSize, swatchBoxSize);
	swatchBox.fillColor=swatchRef.color;
	swatchBox.stroked=false;
	var swatchLabelX= swatchBox.left+swatchBox.width+6;
	var swatchLabelY = swatchBoxTop-(swatchBox.height/2);
	var swatchLabel = docRef.textFrames.pointText([swatchLabelX,swatchLabelY]);
	swatchLabel.contents = swatchRefName;
	swatchLabel.textRange.characterAttributes.size=swatchBoxSize/3;
	swatchLabel.textRange.characterAttributes.leading=swatchBoxSize/3;
	swatchLabel.textRange.characterAttributes.fillColor=docRef.swatches["[Registration]"].color;
	swatchBoxTop+=(swatchBoxSize*1.25);
}//end for
