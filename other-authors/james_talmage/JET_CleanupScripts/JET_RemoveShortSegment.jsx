/*
JET_RemoveShortSegment.jsx
A Javascript for Adobe Illustrator by James E. Talmage.

Purpose:
General path simplification. Allows the user to specify the minimum number of segments to be retained.
This script removes the shortest segment from each selected PathItem that has
more than the number of segments entered by the user.

To Use:
Select the paths to be affected. Run the Script. Enter the desired minimum number of segments in the prompt.
*/

function getDistance(startPoint,endPoint){
rise=Math.abs(startPoint.anchor[0]-endPoint.anchor[0]);
run=Math.abs(startPoint.anchor[1]-endPoint.anchor[1]);
return(Math.sqrt((rise*rise)+(run*run)));
}

function removeShortSegment(path){
	if(path.pathPoints.length>2){
		var startPoint=path.pathPoints[0];
		var endPoint=path.pathPoints[1];
		var shortSegMeasure=Math.round(getDistance(startPoint,endPoint));
		var pointToRemove=endPoint;
		for(p=0;p<path.pathPoints.length-1;p++){
			endPoint=currPath.pathPoints[p+1];
			var currSegMeasure=Math.round(getDistance(startPoint,endPoint));
			if(currSegMeasure<shortSegMeasure){
				shortSegMeasure=currSegMeasure;
				pointToRemove=endPoint;
			}
			startPoint=endPoint;
		}
		pointToRemove.remove();
	}
}

var docRef=activeDocument;
var minSegs=prompt("Remove the shortest segments from selected PathItems with more segments than:",5);
for(i=docRef.selection.length-1;i>=0;i--){
	if(docRef.selection[i].typename=="PathItem"&&docRef.selection[i].pathPoints.length>minSegs){
		var currPath=docRef.selection[i];
			removeShortSegment(currPath);
		redraw();
	}
}