//Javascript to draw a polygon with a given number of sides of a given side length.
//declare variables for number of sides and length of each side.
var numOfSides = prompt( 'Enter the number of sides desired',6 )*1;
var lengthOfSides = prompt( 'Enter the desired length of the sides, in inches',1 )*72;
if (documents.length > 0)
{
frontDocument = activeDocument;
pathsInDocument = frontDocument.pathItems;
// create a new polygon according to this arrangement of parameters: polygon(centerX,centerY,radius,sides,reversed)
newPolygon = pathsInDocument.polygon(activeDocument.width/2, activeDocument.height/2,(lengthOfSides/2)/Math.sin(((360/numOfSides)/2)*Math.PI/180)
,numOfSides,);
}