/*
JET_RemoveShortSegmentsUntil.jsx
A Javascript for Adobe Illustrator by James E. Talmage.

Purpose:
General path simplification. Allows the user to specify the number of segments to be left for each path.
This script repeatedly removes the shortest segment from each selected PathItem
until the number of segments is no more than the number entered by the user.

To Use:
Select the paths to be affected. Run the script. In the prompt, enter the desired number of segments to be left each path.
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
var minSegs=prompt("Remove shortest segments until the number of segments is no more than:",5);
for(i=docRef.selection.length-1;i>=0;i--){
	if(docRef.selection[i].typename=="PathItem"&&docRef.selection[i].pathPoints.length>minSegs){
		var currPath=docRef.selection[i];
		var pointCount=currPath.pathPoints.length;
		var removeCount=pointCount-minSegs;
		for(r=removeCount;r>0;r--){
			removeShortSegment(currPath);
		}
		redraw();
	}
}