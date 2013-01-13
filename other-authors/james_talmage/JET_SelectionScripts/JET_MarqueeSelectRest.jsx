/*
JET_MarqueeSelectRest.jsx
A Javascript for Illustrator CS2 by James E. Talmage

Purpose:
When making marquee selections in Illustrator, all objects crossed or touched by the selection marquee are selected.
Unlike most other drawing programs, Illustrator does not provide a Contact Sensitive toggle setting to cause marquee selection
to select only objects which are fully enclosed by the marquee.
This script finds paths in the current selection which are only partially selected, and adds their unselected points to the selection.

To Use:
Make a marquee or lasso selection which surrounds, touches, or crosses the paths desired for selection. Then run the script.
All paths which were at least partially selected become completely selected.
*/

var docRef=activeDocument;
for(i=0;i<docRef.selection.length;i++){
	var objRef=docRef.selection[i];
	if(objRef.typename=="PathItem"){
		for(p=0;p<objRef.pathPoints.length;p++){
			objRef.pathPoints[p].selected=PathPointSelection.ANCHORPOINT;
		}
	}
	if(objRef.parent.typename=="CompoundPathItem"){
		objRef.parent.selected=false;
	}
}
alert("Partially selected paths have been completely selected.");