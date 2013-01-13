/*
JET_JoinNearest.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
Illustrator's Join can only join two paths at a time, requires tedious selection of endpoints, and always joins with a straight segment,
regardless of existing outboard curve handles.
This script joins selected paths at their nearest ends. The joining segments retain any pre-existing outboard handles.

To Use:
Select two or more pathItems. Run the script.
The paths are joined end-to-nearest-end. The resulting path takes on the Fill and Stroke of the topmost original path.
*/

//Function for finding the distance between two points.

function getDistance(startPoint,endPoint){
	rise=Math.abs(startPoint.anchor[0]-endPoint.anchor[0]);
	run=Math.abs(startPoint.anchor[1]-endPoint.anchor[1]);
	return(Math.sqrt((rise*rise)+(run*run)));
}

//Function for joining two paths end to start.

function joinEndToStart(pathA,pathB){
	while(pathB.pathPoints.length>1){
		newPoint=pathA.pathPoints.add();
		newPoint.anchor=pathB.pathPoints[0].anchor;
		newPoint.leftDirection=pathB.pathPoints[0].leftDirection;
		newPoint.rightDirection=pathB.pathPoints[0].rightDirection;
		newPoint.pointType=pathB.pathPoints[0].pointType;
		pathB.pathPoints[0].remove();
	}
	if(pathB.pathPoints.length==1){
		newPoint=pathA.pathPoints.add();
		newPoint.anchor=pathB.pathPoints[0].anchor;
		newPoint.leftDirection=pathB.pathPoints[0].leftDirection;
		newPoint.rightDirection=pathB.pathPoints[0].rightDirection;
		newPoint.pointType=pathB.pathPoints[0].pointType;
		pathB.remove();
	}
}

//Function for joining two paths end to end.

function joinEndToEnd(pathA,pathB){
	if(pathB.polarity==PolarityValues.POSITIVE){
		pathB.polarity=PolarityValues.NEGATIVE;
	}
	else{
		pathB.polarity=PolarityValues.POSITIVE;
	}
	while(pathB.pathPoints.length>1){
		newPoint=pathA.pathPoints.add();
		newPoint.anchor=pathB.pathPoints[0].anchor;
		newPoint.leftDirection=pathB.pathPoints[0].leftDirection;
		newPoint.rightDirection=pathB.pathPoints[0].rightDirection;
		newPoint.pointType=pathB.pathPoints[0].pointType;
		pathB.pathPoints[0].remove();
	}
	if(pathB.pathPoints.length==1){
		newPoint=pathA.pathPoints.add();
		newPoint.anchor=pathB.pathPoints[0].anchor;
		newPoint.leftDirection=pathB.pathPoints[0].leftDirection;
		newPoint.rightDirection=pathB.pathPoints[0].rightDirection;
		newPoint.pointType=pathB.pathPoints[0].pointType;
		pathB.remove();
	}
}

//Function for joining two paths start to start.

function joinStartToStart(pathA,pathB){
	if(pathA.polarity==PolarityValues.POSITIVE){
		pathA.polarity=PolarityValues.NEGATIVE;
	}
	else{
		pathA.polarity=PolarityValues.POSITIVE;
	}
	while(pathB.pathPoints.length>1){
		newPoint=pathA.pathPoints.add();
		newPoint.anchor=pathB.pathPoints[0].anchor;
		newPoint.leftDirection=pathB.pathPoints[0].leftDirection;
		newPoint.rightDirection=pathB.pathPoints[0].rightDirection;
		newPoint.pointType=pathB.pathPoints[0].pointType;
		pathB.pathPoints[0].remove();
	}
	if(pathB.pathPoints.length==1){
		newPoint=pathA.pathPoints.add();
		newPoint.anchor=pathB.pathPoints[0].anchor;
		newPoint.leftDirection=pathB.pathPoints[0].leftDirection;
		newPoint.rightDirection=pathB.pathPoints[0].rightDirection;
		newPoint.pointType=pathB.pathPoints[0].pointType;
		pathB.remove();
	}
}

//Function for joining two paths start to end.

function joinStartToEnd(pathA,pathB){
	if(pathA.polarity==PolarityValues.POSITIVE){
		pathA.polarity=PolarityValues.NEGATIVE;
	}
	else{
		pathA.polarity=PolarityValues.POSITIVE;
	}
	if(pathB.polarity==PolarityValues.POSITIVE){
		pathB.polarity=PolarityValues.NEGATIVE;
	}
	else{
		pathB.polarity=PolarityValues.POSITIVE;
	}
	while(pathB.pathPoints.length>1){
		newPoint=pathA.pathPoints.add();
		newPoint.anchor=pathB.pathPoints[0].anchor;
		newPoint.leftDirection=pathB.pathPoints[0].leftDirection;
		newPoint.rightDirection=pathB.pathPoints[0].rightDirection;
		newPoint.pointType=pathB.pathPoints[0].pointType;
		pathB.pathPoints[0].remove();
	}
	if(pathB.pathPoints.length==1){
		newPoint=pathA.pathPoints.add();
		newPoint.anchor=pathB.pathPoints[0].anchor;
		newPoint.leftDirection=pathB.pathPoints[0].leftDirection;
		newPoint.rightDirection=pathB.pathPoints[0].rightDirection;
		newPoint.pointType=pathB.pathPoints[0].pointType;
		pathB.remove();
	}
}

//Array to contain the open paths in the current selection.

openPaths=Array();
for(i=0;i<selection.length;i++){
	if((selection[i].typename=="PathItem")&&(selection[i].closed==false)){
		openPaths.push(selection[i]);
	}
}

//Varialble to store the number of items in the openPaths array.

openPathsCount=openPaths.length;

//Catch for too few or too many open paths.

if(openPathsCount<2){
	alert("Select at least two open paths and try again.");
}
else{
if(openPathsCount>50){
	openPathsCount= prompt('There are '+openPaths.length+' open paths in the current selection. Joining them all may take a long time. How many would you like to join?',openPaths.length);
}

//Variable to contain the path to be joined. Set it initially to the second path in openPaths.

joinedPath=openPaths[1];

//Variable to contain the join method. Set it initially to StartToStart.

joinMethod="StartToStart";

//Find the endpoint nearest to path 0 and join two paths. Repeat until only one open path is left.

for(n=1;n<openPathsCount;n++){
	nearestDist=getDistance(openPaths[0].pathPoints[0],openPaths[1].pathPoints[0]);
	firstPath=openPaths[0];
	firstPathStart=firstPath.pathPoints[0];
	firstPathEnd=firstPath.pathPoints[firstPath.pathPoints.length-1];
	for(p=1;p<openPaths.length;p++){
		measuredPath=openPaths[p];
		measuredPathStart=measuredPath.pathPoints[0];
		measuredPathEnd=measuredPath.pathPoints[measuredPath.pathPoints.length-1];

		measuredDist=getDistance(firstPathEnd,measuredPathStart);
		if(measuredDist<=nearestDist){
			nearestDist=measuredDist;
			joinedPath=measuredPath;
			joinMethod="EndToStart";
		}

		measuredDist=getDistance(firstPathEnd,measuredPathEnd);
		if(measuredDist<=nearestDist){
			nearestDist=measuredDist;
			joinedPath=measuredPath;
			joinMethod="EndToEnd";
		}

		measuredDist=getDistance(firstPathStart,measuredPathStart);
		if(measuredDist<=nearestDist){
			nearestDist=measuredDist;
			joinedPath=measuredPath;
			joinMethod="StartToStart";

		}
		measuredDist=getDistance(firstPathStart,measuredPathEnd);
		if(measuredDist<=nearestDist){
			nearestDist=measuredDist;
			joinedPath=measuredPath;
			joinMethod="StartToEnd";
		}
	
	}
	if(joinMethod=="EndToStart"){
		joinEndToStart(firstPath,joinedPath);
	}
	else if (joinMethod=="EndToEnd"){
		joinEndToEnd(firstPath,joinedPath);
	}
	else if (joinMethod=="StartToStart"){
		joinStartToStart(firstPath,joinedPath);
	}
	else if (joinMethod=="StartToEnd"){
		joinStartToEnd(firstPath,joinedPath);
	}
	openPaths=Array();
	for(i=0;i<selection.length;i++){
		if((selection[i].typename=="PathItem")&&(selection[i].closed==false)){
			openPaths.push(selection[i]);
		}
	}
}

//Remove concurrent points.
for (n=firstPath.pathPoints.length-1;n>0;n--){
	var nPoint=firstPath.pathPoints[n];
	var prevPoint=firstPath.pathPoints[n-1];
	if (prevPoint.anchor[0]==nPoint.anchor[0]&&prevPoint.anchor[1]==nPoint.anchor[1]){
		nPoint.pointType = PointType.CORNER;
		nPoint.leftDirection = prevPoint.leftDirection;
		prevPoint.remove();
	}
}

//Close if original paths formed a loop.
var lastN=firstPath.pathPoints.length-1;
if (firstPath.pathPoints[0].anchor[0]==firstPath.pathPoints[lastN].anchor[0]&&firstPath.pathPoints[0].anchor[1]==firstPath.pathPoints[lastN].anchor[1]){
firstPath.closed=true;
firstPath.pathPoints[0].PointType=PointType.CORNER;
firstPath.pathPoints[0].leftDirection=firstPath.pathPoints[lastN].leftDirection;
firstPath.pathPoints[lastN].remove();
}
}