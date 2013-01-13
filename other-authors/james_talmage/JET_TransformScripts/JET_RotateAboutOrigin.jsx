/*
JET_RotateAboutOrigin.jsx
A Javascript for Adobe Illustrator CS2 & CS3 by James E. Talmage.

Purpose:
Rotates selected pageItems about the ruler origin by a user-specified amount (in degrees). This allows the user
to use and re-use the ruler origin as a remembered rotation center.

To Use:
Drag the ruler origin to the point about which you want to make repeated rotations.
Select the objects you wish to rotate. Run the script. The script prompts you for the rotation amount in degrees.
*/

var docRef = app.activeDocument;
var matrixRef=app.getTranslationMatrix();
var rotateAngle=prompt("The selection will be rotated about the ruler origin. Enter the amount you want to rotate (in degrees)",10);
var totalMatrix=concatenateRotationMatrix(matrixRef,rotateAngle);
for(i=0;i<docRef.selection.length;i++){
	docRef.selection[i].transform(totalMatrix,1,0,0,1,0,Transformation.DOCUMENTORIGIN);
}