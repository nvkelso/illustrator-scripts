/*
JET_RetractHandleLeft.jsx and JET_RetractHandleRight.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
FreeHand provides separate left and right Retract Handles buttons, as well as buttons to convert point kind (corner, curve, tangent).
Illustrator only obtained buttons to convert the kind (smooth or corner) of multiple selected points in CS3, and provides
no control over individual handles. The CS3 buttons always retract both handles when converting to corner points; always
extend handles when converting to smooth points.
This script, and its other-side companion allow you to retract either the leading or trailing handle of each selected anchorPoint. It does this without
converting the kind of the anchorPoints.

To Use:
Select one or more anchorPoint(s). Run the script.
The left (leading) or right (trailing) curve handles (depending upon which script you run) are retracted to the position of their associated anchorPoints.
*/

for(i=0;i<activeDocument.selection.length;i++){
	if(activeDocument.selection[i].typename=="PathItem"){
		for(ii=0;ii<activeDocument.selection[i].pathPoints.length;ii++){
			var thisPoint=activeDocument.selection[i].pathPoints[ii];
			if(thisPoint.selected==PathPointSelection.ANCHORPOINT){
				thisPoint.leftDirection=thisPoint.anchor;
			}
		}
	}
}