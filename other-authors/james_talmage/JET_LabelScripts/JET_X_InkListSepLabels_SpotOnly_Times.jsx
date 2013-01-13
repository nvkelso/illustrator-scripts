/*
JET_X_InkListSepLabels_CUSTOMINKsOnly.jsx
A Javascript for Adobe Illustrator by James E. Talmage.

Purpose:
In Illustrator's Print dialog, on the Marks And Bleeds pane, the Page Information option causes separation names
to print in the bleed area. However, the sep names are printed in a horizontal row. In a document containing several
spot colors (common in screen printing), the names of some seps fall beyond the bleed area and therefore do not
appear on the printed seps. This script provides a workaround for that.

Algorithm:
This script is a variation of the JET_X_InkListSepLabels script. Because the InkLIst object in AI's Javascript implementation
includes CMYK process inks, regardless of whether they are used in the document, the handling of those inks is removed
from this simpler script. In other words, this script creates labels for only CUSTOMINKs (spot inks) actually used in the document.
This script creates a set of stacked text labels at the lower left of the page, one for each ink in Illustrator's inkList
with a  inkInfo.kind of InkType.CUSTOMINK. That means one for each spot color used in the document.
(Only spot colors used in the document are included in Illustrator's inkList.
Therefore, labels are not created for any additional spot colors which may exist in the Swatches Palette, but which are not used.)
The labels are created as PointType textframe objects offset from the left edge of the Artboard by the size of the label text,
and offset from the bottom edge by half the size of the label text. The script provides a prompt to allow the user to choose
the size of the label text. Line 40 sets a string variable to "Times-Roman". To change the font used, edit the text string. The value must
be the accurate name of an installed font, or an error message will occur.

To Use:
With an Illustrator document open, select the script from the File>Scripts submenu.
A prompt appears to allow you to set the size of the separation labels. Default is 9 pt.
After clicking OK in the prompt, the stack of labels are created.
If you want the labels to appear elsewhere, marquee select them and drag them.

Experimental Notes:
The script is titled "JET_X..." because although it is useable, I consider it a work-in-progress.
1. Consolidate the creation of CMYK labels. Since Illustrator evidently includes C,M,Y,K in its inklist regardless of whether
those colors actually occur in the artwork, there is probably no need for the Switch statement which tests for those colors.
Simply create CMYK labels instead. Replace the Switch with a simple If statement to watch for CUSTOM inkTypes.
2. Is there a more concise way to define the 100% CMYK component colors?
*/

//Variable for the active document.
var docRef=app.activeDocument;

//Prompt the user for the desired text size.
var SepTextSize=Window.prompt("Enter the desired text size in points:", 9);
//Variable for specifying font by name.
var SepTextFont=app.textFonts.getByName("Times-Roman");//Comment out this statement and line 56 to use default Character Style font.
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
	if(inkRef.inkInfo.kind==InkType.CUSTOMINK){//if the current ink is a spot color.
		//Create a pointText object for the current ink's label.
		var sepTextLabel = docRef.textFrames.pointText([sepTextX,sepTextY]);
		sepTextLabel.textRange.characterAttributes.textFont =SepTextFont;//Set its font to the SepTextFont variable.
		sepTextLabel.contents = inkRefName;//Set its content to the name of the ink.
		sepTextLabel.textRange.characterAttributes.size=sepTextSize;//Set its text size as was specified by user.
		sepTextLabel.textRange.characterAttributes.leading=sepTextSize;//Set its leading 100% of its text size.
		sepTextLabel.textRange.characterAttributes.fillColor=docRef.swatches.getByName(inkRefName).color;//Fill it with the Swatch that is named the same as the ink.
		sepTextLabel.textRange.characterAttributes.overprintFill=true;//Set the fill to overprint.
	}//end if
}//end for