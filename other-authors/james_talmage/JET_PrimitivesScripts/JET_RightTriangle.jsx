/*
JET_RightTriangle.jsx
A Javascript for Adobe Illustrator by James E. Talmage.
Purpose: Creates a right triangle at the page origin
after the user specifies a length and angle for the hypoteneuse.
Written as a gag for a thread in the Illustrator User-to-User forum.
*/

var docRef=app.activeDocument;
var drawLayer = docRef.layers[0];
var hypotLength=prompt("Enter the desired hypoteneuse length, in points:",72);
var hypotAngle=prompt("Enter the desired hypoteneuse angle, in degrees:",30);
var hypotAngleRad=hypotAngle*(Math.PI/180);

var cos=Math.cos(hypotAngleRad)*hypotLength;
var sine=Math.sin(hypotAngleRad)*hypotLength;

var triangle = drawLayer.pathItems.rectangle( sine, 0, cos, sine );
triangle.pathPoints[1].remove();
triangle.selected=true;
triangle.stroked=true;
triangle.filled=false;
redraw();

