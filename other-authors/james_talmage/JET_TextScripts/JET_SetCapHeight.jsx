/*
JET_SetCapHeight.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
Normally, text size specifies the height of the font's em square, not a measure of the actual glyphs, such as the height of the capitals.
Sometimes, it is desirable (especially among sign cutters) to specify text size in terms of cap height.
This script allows the user to select a range of text and set its size by capheight.
Capheight is assumed to be the height of the capital M outline.

To Use:
Select the range of text characters within a textFrame object that you want to affect. Run the script. The script will prompt you
for a desired cap height measure, expressed in inches.
*/
var docRef=activeDocument;
//If a textRange is selected...
if(docRef.selection.typename=="TextRange"){
	var textRef=docRef.selection;
	//Get the font size and font of the first selected character.
	var firstCharSize=textRef.characters[0].size;
	var firstCharFont=textRef.characters[0].textFont;
	//Tell the user the current size.
	alert("The size of the first selected character is " + firstCharSize + " points.");
	//Create a temporary text frame containing an upper-case M.
	var textTemp = docRef.textFrames.add();
	textTemp.contents = "M";
	//Position it at the page origin.
	textTemp.top = 0;
	textTemp.left = 0;
	//Set the font and text size of the M to that of the first selected character.
	textTemp.characters[0].textFont=firstCharFont;
	textTemp.characters[0].size=firstCharSize;
	//Convert it to path and get the path's height.
	textTempPath=textTemp.createOutline();
	var heightOfM=textTempPath.height;
	//Calculate a scale factor by comparing the original textSize to the height of the M outline.
	var capheightFactor=firstCharSize/heightOfM;
	//Delete the temporary object.
	textTempPath.remove();
	//Ask the user for the desired size in inches. Default to the current size, expressed in inches.
	var desiredSize=prompt("Enter the desired CapHeight in inches:",firstCharSize/72);
	//For each selected character... 
	for(i=0;i<textRef.characters.length;i++){
		//Set its font size to the desired size, multiplied by the scale factor.
		textRef.characters[i].size=(desiredSize*72)*capheightFactor;
}
//If a textRange is not selected, instruct the user to select a textRange
	}else{
		alert("Please use the Type Tool to select a range of text.");
}
