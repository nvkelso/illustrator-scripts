/*
JET_CloseSelectedPaths.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
Illustrator's Join command (Ctrl J) cannot close more than one path at a time.
When closing paths via Illustrator's Join command, the closing segment is always straight, regardless of pre-existing curve handles.
This script closes multiple paths at once and respects their existing outboard handles.

To Use:
Select one or more pathItems. Run the script.
For each selected open path, the script closes the path.

To Use:
Select one or more pathItems. Run the script.
For each selected open path, the script closes the path with a straight segment.
*/

for(i=0;i<activeDocument.selection.length;i++){
	var pathN=activeDocument.selection[i];
	pathN.closed=true;
	var lastN=pathN.pathPoints.length-1;
	if (pathN.pathPoints[0].anchor[0]==pathN.pathPoints[lastN].anchor[0]&& pathN.pathPoints[0].anchor[1]==pathN.pathPoints[lastN].anchor[1]){
		pathN.pathPoints[0].PointType=PointType.CORNER;
		pathN.pathPoints[0].leftDirection=pathN.pathPoints[lastN].leftDirection;
		pathN.pathPoints[lastN].remove();
	}
}