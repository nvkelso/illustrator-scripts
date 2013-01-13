/*
JET_RemovetSegmentsShorterThan.jsx
A Javascript for Adobe Illustrator  by James E. Talmage.

Purpose:
Reduces the number of anchorpoints on selected paths, according to a minimum specified by the user.
Removes from each selected PathItem, segments shorter than the measure entered by the user.
Useful for certain types of path simplification and cleanup chores, as in imported DXF files.

To Use:
Select the paths to be affected. Run the script. Enter the desired minimum segment length in the prompt.
*/

function getDistance(startPoint,endPoint){
rise=Math.abs(startPoint.anchor[0]-endPoint.anchor[0]);
run=Math.abs(startPoint.anchor[1]-endPoint.anchor[1]);
return(Math.sqrt((rise*rise)+(run*run)));
}

function countShortSegments(path,minLength){
	if(path.pathPoints.length>2){
		var startPoint=path.pathPoints[0];
		var endPoint=path.pathPoints[1];
		var shortSegMeasure=Math.round(getDistance(startPoint,endPoint));
		var shortSegmentCount=0;
		for(p=0;p<path.pathPoints.length-1;p++){
			endPoint=currPath.pathPoints[p+1];
			var currSegMeasure=Math.round(getDistance(startPoint,endPoint));
			if(currSegMeasure<minLength){
				shortSegmentCount++;
			}
			startPoint=endPoint;
		}
	}
	return(shortSegmentCount);
}

function removeShorterSegments(path,length){
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
var minSegLength=prompt("Remove segments shorter than:",6);
for(i=docRef.selection.length-1;i>=0;i--){
	if(docRef.selection[i].typename=="PathItem"){
		var currPath=docRef.selection[i];
		var shortSegCount=countShortSegments(currPath,minSegLength);
		for(r=shortSegCount;r>0;r--){
			removeShorterSegments(currPath);
		}
		redraw();
	}
}