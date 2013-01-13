/* 
JET_HandlesPaste.jsx
A Javascript for Adobe Illustration by James E. Talmage.
© 2010 James E. Talmage

Purpose:
This script is one of a pair which together serve to "copy" the direction handles of one anchorPoint and "paste" them to any number of other anchorPoints,
resulting in same-length, same-angle handles on all of the anchorPoints. This script performs the "paste" operation.
Before running this script, run the accompanying JET_HandlesCopy.jsx script.

Schema:
This script retrieves delta values from a textFrame which the accompanying JET_HandlesCopy.jsx script creates at the Artboard origin,
and then applies those values as X and Y distances of direction handles as measured from their associated anchors, thereby resulting in
same-length and same-angle direction handles for all the selected anchorPoints.

To Use:
First, run the JET_HandlesCopy.jsx script.
Then directSelect all the anchorPoints which you wish to have same-length, same-angle anchors.
Run the script.
*/

var docRef=activeDocument;
if(docRef.selection.length>0){
    var currSelection=activeDocument.selection;
    if(docRef.pageItems.getByName("Temp_DeltaVals")){
        var deltaSource=docRef.pageItems.getByName("Temp_DeltaVals");
        var deltas=stringToArray(deltaSource.contents);
        var leftHandleDx=Number(deltas[0]);
        var leftHandleDy=Number(deltas[1]);
        var rightHandleDx=Number(deltas[2]);
        var rightHandleDy=Number(deltas[3]);
        for(i=0;i<currSelection.length;i++){
            var currItem=currSelection[i];
            if(currItem.typename=="PathItem"){
                for(j=0;j<currItem.pathPoints.length;j++){
                    var currPoint=currItem.pathPoints[j];
                    if(currPoint.selected==PathPointSelection.ANCHORPOINT){
                        setHandles(currPoint);
                    }//end if
                }//end for
            }//end if
        }//end for
        deltaSource.remove();
    }else{
        alert("Temp_DeltaVals not found. \r Run JET_CopyHandles script first. Then try again.");
    }//end else end if
    function stringToArray(source){
        return(source.split(","));
    }//end function
    function setHandles(targetPoint){
        targetPoint.selected=PathPointSelection.ANCHORPOINT;
        var newLx=(targetPoint.anchor[0]+leftHandleDx);
        var newLy=(targetPoint.anchor[1]-leftHandleDy);
        targetPoint.leftDirection=[newLx,newLy];
        var newRx=(targetPoint.anchor[0]+rightHandleDx);
        var newRy=(targetPoint.anchor[1]-rightHandleDy);
        targetPoint.rightDirection=[newRx,newRy];
    }//end function
}else{
    alert("DirectSelect (white pointer) at least one anchorPoint.\rThen try again.");
}//end else end if