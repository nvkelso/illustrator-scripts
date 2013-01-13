/*
JET_SelectSameLength2ptPaths.jsx
A Javascript for Illustrator CS2 by James E. Talmage

Purpose:
Selects paths in the document which have 2 points and are the same
length as the currently selected 2-point path.
Purpose: to select the individual dashes of dashed lines which commonly
come into AI from converted DXF files. Useful for removing "hidden lines" from such files.

To Use:
Select one 2-point path. Run the script. The script searches for other 2-point paths which are the same length, and adds them to the current selection.
The selected paths can then be either deleted or joined by the JET_Join Nearest script.
*/

//Function for finding distance between two points
function getDistance(startPoint,endPoint){
	rise=Math.abs(startPoint.anchor[0]-endPoint.anchor[0]);
	run=Math.abs(startPoint.anchor[1]-endPoint.anchor[1]);
	return(Math.sqrt((rise*rise)+(run*run)));
}
//Store a reference to the current document
var docRef=activeDocument;
//Store a reference to the frontmost selected object
var matchPath=docRef.selection[0];
//Store a reference to the first point of the selected path
if(matchPath.typename!="PathItem"||matchPath.pathPoints.length!=2){
	alert("Select an open path which has only 2 points and try again.")
}else{
	var startPoint=matchPath.pathPoints[0];
	//Store a reference to the second point of the selected path
	var endPoint=matchPath.pathPoints[1];
	//Get the distance and store it as matchDistance. Round it to nearest pixel
	var matchDistance=Math.round(getDistance(startPoint,endPoint));
	//Tell the use the measured length
	alert("Match Path length is "+matchDistance+" points.");
	//For each pathItem in the document
	for(i=0;i<docRef.pathItems.length;i++){
		//...if it has two points
		if(docRef.pathItems[i].pathPoints.length==2){
			//...store a referece to the pathItem
			var currPath=docRef.pathItems[i];
			//...store a reference to its first point
			var currStartPoint=currPath.pathPoints[0];
			//...store a reference to its second point
			var currEndPoint=currPath.pathPoints[1];
			//...use the getDistance function to get the distance between its two points. Round it to nearest point.
			var currDistance=Math.round(getDistance(currStartPoint,currEndPoint));
			//...if the rounded distances of currPath equals that of matchPath 
			if(currDistance==matchDistance){
				//...select currPath.
				currPath.selected=true;
			}
		}
	}
}