/* 
JET_HandlesCopy.jsx
A Javascript for Adobe Illustration by James E. Talmage.
© 2010 James E. Talmage

Purpose:
This script is one of a pair which together serve to "copy" the direction handles of one anchorPoint and "paste" them to any number of other anchorPoints,
resulting in same-length, same-angle handles on all of the anchorPoints. This script performs the "copy" operation.  
After running this script, run the accompanying JET_HandlesPaste.jsx script.

Schema:
This script acquires the positions of the direction handles of a single selected anchorPoint, converts them to X and Y distances relative to the anchorPoint,
and then records the values in a temporary textFrame located at the current Artboard's origin.
The accompanying JET_PasteHandles.jsx script retreives the values from the textFrame, applies them to the handles of all selected anchorPoints, and then
deletes the textFrame.

To Use:
DirectSelect a single anchorPoint the handles of which you wish to replicate in other anchorPoints.
Run the script.
Select the anchorPoint(s) to which you want to apply same length/angle direction handles.
Run the JET_PasteHandles.jsx script.
*/

var docRef=activeDocument;
if(docRef.selection.length>0){
    var currSelection=activeDocument.selection[0];
    if(currSelection.typename=="PathItem"){
        for(i=0;i<currSelection.pathPoints.length;i++){
            var currPoint=currSelection.pathPoints[i];
            if(currPoint.selected==PathPointSelection.ANCHORPOINT){
                getHandleValues(currPoint);
                redraw();
                break;
            }//end if
        }//end for
        function getHandleValues(sourcePoint){
            var currAnchor=sourcePoint.anchor;
            var currLeftHandle=sourcePoint.leftDirection;
            var currRightHandle=sourcePoint.rightDirection;
            var leftHandleDx=(sourcePoint.leftDirection[0]-sourcePoint.anchor[0]);
            var leftHandleDy=(sourcePoint.anchor[1]-sourcePoint.leftDirection[1]);
            var rightHandleDx=(sourcePoint.rightDirection[0]-sourcePoint.anchor[0]);
            var rightHandleDy=(sourcePoint.anchor[1]-sourcePoint.rightDirection[1]);
            var valuesArray=[leftHandleDx, leftHandleDy, rightHandleDx, rightHandleDy];
            storeHandleValues(valuesArray);
        }//end function
        function storeHandleValues(deltaVals){
            //Create a temporary text frame.
            var textTemp = docRef.textFrames.add();
            textTemp.name="Temp_DeltaVals";
            textTemp.contents = deltaVals[0]+','+deltaVals[1]+','+deltaVals[2]+','+deltaVals[3];
            //Position it at the page origin.
            textTemp.top = 0;
            textTemp.left = 0;
            alert("A temporary text frame has been created to store the handle values.\rIt will be removed after you run the JET_HandlesPaste script.");
        }//end function
    }//end if
}else{
alert("DirectSelect (white pointer) one anchorPoint.\rThen try again.");
}//end else end if