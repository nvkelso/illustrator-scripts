//Javascript to draw an ellipse of a user-specified major diameter and tilt angle, like those used in drafting templates.

//declare variables for major diameter and ellipse angle (tilt).

var majDia = prompt( 'Enter the major diameter in inches','1' )*72;
var tilt = prompt( 'Enter the ellipse angle in degrees','35.25' )*1;

if (documents.length > 0)
{
frontDocument = activeDocument;
pathsInDocument = frontDocument.pathItems;
// create a new ellipse according to this arrangement of parameters:
// ellipse(top,left,width,height,reversed,inscribed)
newEllipse=pathsInDocument.ellipse((activeDocument.height/2),(activeDocument.width/2),(majDia),(majDia)*(Math.sin(tilt*Math.PI/180)),0,1);
}