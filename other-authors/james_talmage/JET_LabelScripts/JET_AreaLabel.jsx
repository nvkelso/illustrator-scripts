/*
JET_AreaLabel.jsx.
A Javascript for Adobe Illustrator by James E. Talmage.
	
Purpose:
Creates a textFrame object that can be used as either just a reference and then deleted, or as a label in the drawing.
	
Schema:	
This script returns an alert containing the area of the frontmost selected pathItem.
The area is given in the five units of measure supported by Illustrator's rulers.
A pointType textFrame object is created at the center of the pathItem's bounding box
containing the text of the alert.

To Use:
Select a path. Run the script. Delete, edit, and/or style the resulting textframe object as desired. 
*/

if ( app.documents.length > 0 && app.activeDocument.selection.length > 0 ) {
	//Declare the variables.
	var docRef=app.activeDocument;
	var pathRef=docRef.selection[0];
	var pathRefArea=pathRef.area;
	var myReturn="\r";
	//Convert pathRefArea to other units of measure. Store them in a text variable named areaMessage.
	var areaMessage="Square Points: "+Math.round(pathRefArea*100)/100+myReturn
	+"Square Picas: "+(Math.round((pathRefArea/144)*100))/100+myReturn
	+"Square Inches: "+(Math.round((pathRefArea/5184)*100))/100+myReturn
	+"Square Millimeters: "+(Math.round((pathRefArea/8.037)*100))/100+myReturn
	+"Square Centimeters: "+(Math.round((pathRefArea/803.520)*100))/100
	//Display areaMessage in an alert.
	alert (areaMessage);
	
	//Create a textFrame and set its contents to areaMessage.
	var areaLabel = docRef.textFrames.add();
	areaLabel.contents = areaMessage;
	for(i=0;i<areaLabel.paragraphs.length;i++){
		areaLabel.paragraphs[i].justification=Justification.CENTER;
	}
	
	//Position areaLabel at the center of the selected path.
	areaLabel.top = pathRef.top-pathRef.height/2+areaLabel.height/2;
	areaLabel.left = pathRef.left+pathRef.width/2-areaLabel.width/2;

	//Create a temporary textFrame named squarePoints to hold just the value of pathRef's area in square points.
	var squarePoints = docRef.textFrames.add();
	squarePoints.contents = Math.round(pathRefArea*100)/100;
	//Deselect pathRef. Select squarePoints. Redraw. Cut squarePoints to the clipboard.
	pathRef.selected=false;
	squarePoints.selected=true;
	redraw();
	app.cut();
}
	
