/*
JET_MarqueeDeselectPartials.jsx
A Javascript for Illustrator CS2 by James E. Talmage

Purpose:
When making marquee selections in Illustrator, all objects crossed or touched by the selection marquee are selected.
Unlike most other drawing programs, Illustrator does not provide a Contact Sensitive toggle setting to cause marquee selection
to select only objects which are fully enclosed by the marquee.
This script deselects paths in the current selection which are only partially selected.

To Use:
Make a marquee or lasso selection which completely surrounds the paths desired for selection. Then run the script.
Additional paths which were only partially selected become deselected.
*/

var docRef=activeDocument;
for(i=docRef.selection.length-1;i>=0;i--){
	var objRef=docRef.selection[i];
	var unSelecteds=0;
	if(objRef.typename=="PathItem"){
		for(p=objRef.pathPoints.length-1;p>=0;p--){
			var pointRef=objRef.pathPoints[p];
			if(pointRef.selected!=PathPointSelection.ANCHORPOINT){
				unSelecteds+=1;
			}
		}
	}
	if (unSelecteds>0){
		objRef.selected=false;
	}
}
alert("Partially selected paths have been deselected.");