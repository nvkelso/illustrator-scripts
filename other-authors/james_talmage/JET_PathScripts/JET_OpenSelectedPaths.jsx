/*
JET_OpenSelectedPaths.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
FreeHand provides an Open Path command opposite to the Close Path command. Illustrator does not.
This script does the opposite of the JET_CloseSelectedPaths script. It removes the last segment of each of the selected paths.
If the removed segment is curved, the curve handles remain as outboard handles of the new paths' endpoints.

To Use:
Select two or more pathItems. Run the script.
The paths are joined end-to-nearest-end. The resulting path takes on the Fill and Stroke of the topmost original path.
*/
//alert(activeDocument.selection.length);

for(i=0;i<activeDocument.selection.length;i++){
activeDocument.selection[i].closed=false;

}