/*
JET_X_InkListSepLabels.jsx
A Javascript for Adobe Illustrator by James E. Talmage.

Purpose:
In Illustrator's Print dialog, on the Marks And Bleeds pane, the Page Information option causes separation names
to print in the bleed area. However, the sep names are printed in a horizontal row. In a document containing several
spot colors (common in screen printing), the names of some seps fall beyond the bleed area and therefore do not
appear on the printed seps. This script provides a workaround for that.

Algorithm:
This script creates a set of stacked text labels at the lower left of the page, one for each ink in Illustrator's inkList. That means
one for Process Cyan, Process Magenta, Process Yellow, and Process Black (whether they are used in the document or not),
and one for each spot color used in the document. (Only spot colors used in the document are included in Illustrator's inkList.
Therefore, labels are not created for any additional spot colors which may exist in the Swatches Palette, but which are not used.)
The labels are created as PointType textframe objects offset from the left edge of the Artboard by the size of the label text,
and offset from the bottom edge by half the size of the label text. The script provides a prompt to allow the user to choose
the size of the label text.

To Use:
With an Illustrator document open, select the script from the File>Scripts submenu.
A prompt appears to allow you to set the size of the separation labels. Default is 9 pt.
After clicking OK in the prompt, the stack of labels are created.
If you want the labels to appear elsewhere, marquee select them and drag them.
To distribute the labels, select the top one, ShiftDrag it horizontally to the right edge of the artboard.
Then marquee select all the labels and use auto Distribute from the Align Panel.


Experimental Notes:
The script is titled "JET_X..." because although it is useable, I consider it a work-in-progress.
1. Consolidate the creation of CMYK labels. Since Illustrator evidently includes C,M,Y,K in its inklist regardless of whether
those colors actually occur in the artwork, there is probably no need for the Switch statement which tests for those colors.
Simply create CMYK labels instead. Replace the Switch with a simple If statement to watch for CUSTOM inkTypes.
2. Is there a more concise way to define the 100% CMYK component colors?
*/

//Variable for the active document.
var docRef=app.activeDocument;

//Create 100% CMYK colors to be assigned to the process inks.
var processCyan = new CMYKColor();
processCyan.black = 0;
processCyan.cyan = 100;
processCyan.magenta = 0;
processCyan.yellow = 0;
var processMagenta = new CMYKColor();
processMagenta.black = 0;
processMagenta.cyan = 0;
processMagenta.magenta = 100;
processMagenta.yellow = 0;
var processYellow = new CMYKColor();
processYellow.black = 0;
processYellow.cyan = 0;
processYellow.magenta = 0;
processYellow.yellow = 100;
var processBlack = new CMYKColor();
processBlack.black = 100;
processBlack.cyan = 0;
processBlack.magenta = 0;
processBlack.yellow = 0;

//Prompt the user for the desired text size.
var SepTextSize=Window.prompt("Enter the desired text size in points:", 9);
//Ensure the size will be interpreted as a number, not as text.
var sepTextSize=parseFloat(SepTextSize);
//Vertical and horizontal location for the labels.
var sepTextTop=sepTextSize;
var sepTextX= 6;
var sepTextY = sepTextSize/2;

//Loop through the members of the document's inkList.
for(i=docRef.inkList.length-1;i>=0;i--){
	var inkRef=docRef.inkList[i];//Variable for the current ink.
	var inkRefName=inkRef.name;//Variable for the current ink's name.
	
	//Create a pointText object for the current ink's label.
	var sepTextLabel = docRef.textFrames.pointText([sepTextX,sepTextY]);
	sepTextLabel.contents = inkRefName;//Set its content to the name of the ink.
	sepTextLabel.textRange.characterAttributes.size=sepTextSize;//Set its text size as was specified by user.
	sepTextLabel.textRange.characterAttributes.leading=sepTextSize;//Set its leading 100% of its text size.
	
	switch (inkRef.inkInfo.kind)
	{
		case InkType.CYANINK://If the current ink is Cyan.
			sepTextLabel.textRange.characterAttributes.fillColor=processCyan;//Fill the characters with processCyan.
		break;
		case InkType.MAGENTAINK://If the current ink is Magenta.
			sepTextLabel.textRange.characterAttributes.fillColor=processMagenta;//Fill the characters with processMagenta.
		break;
		case InkType.YELLOWINK://If the current ink is Yellow.
			sepTextLabel.textRange.characterAttributes.fillColor=processYellow;//Fill the characters with processYellow.
		break;
		case InkType.BLACKINK://If the current ink is Black.
			sepTextLabel.textRange.characterAttributes.fillColor=processBlack;//Fill the characters with processBlack.
		break;
		case InkType.CUSTOMINK://If the current ink is a spot color.
			sepTextLabel.textRange.characterAttributes.fillColor=docRef.swatches.getByName(inkRefName).color;//Fill it with the Swatch that is named the same as the ink.
		break;
		default://Otherwise.
			sepTextLabel.textRange.characterAttributes.fillColor=docRef.swatches.getByName("[Registration]").color;//Fill the characters with Registration.
	}//end switch
}//end for