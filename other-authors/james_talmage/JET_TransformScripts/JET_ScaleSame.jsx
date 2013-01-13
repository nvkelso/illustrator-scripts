/*
JET_ScaleSame.jsx
A Javascript for Adobe Illustrator by James E. Talmage.

Tested In Versions: CS5

Purpose:
Proportionally scales selected pageItems about their centers to the same dimension,
The dimension used is either the height or width of the frontmost selected pageItem, whichever is greatest.

To Use:
Select any number of pageItems. Run the script.
*/

var docRef=app.activeDocument;
var currSelection=docRef.selection;
var keyObject=currSelection[0];
var keyObjectMeasure=keyObject.width;
var scaleBy="width";
if(keyObject.height>=keyObject.width){
    keyObjectMeasure=keyObject.height;
    scaleBy="height";
    }
for(i=1;i<currSelection.length;i++){
    var currObject=currSelection[i];
    var currObjectMeasure=currObject.width;
    if (scaleBy=="height"){
        currObjectMeasure=currObject.height;
        }
    var scaleValue=(keyObjectMeasure/currObjectMeasure)*100;
    currObject.resize(scaleValue, scaleValue);
    }