/*
JET_RemoveSelectedPoints.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
Illustrator's Delete Anchor Point Tool can only remove one point at a time.
Pressing Delete when multiple anchorPoints are selected also deletes their associated segments, breaking the paths.
This script removes selected points of selected paths without breaking the paths.

To Use:
Select one or more anchorPoints on one or more paths. Run the script.
Each selected point is removed from the path, without breaking the path.
*/

//Create an array to contain the index numbers of selected paths:
selectedPaths=Array();
//For the number of objects selected,
//if the object is a PathItem,
//add its index to the end of the selectedPaths array:
for(objNum=0;objNum<activeDocument.selection.length;objNum++){
	if(selection[objNum].typename=="PathItem"){
	selectedPaths.push(objNum);
	}
}
//For as many items as are in the selectedPaths array,
//remove the index of the last one and make it the current path:
for(p=selectedPaths.length;p>0;p--){
	var currPath=selectedPaths.pop();
	//Create an array to contain the index numbers of selected points in the current path:
	selectedPoints=Array();
	//For the number of points in the current path,
	//if the point is selected, add its index to the end of the selectedPoints array:
	for(i=0;i<selection[currPath].pathPoints.length;i++){
		if(selection[currPath].pathPoints[i].selected==PathPointSelection.ANCHORPOINT){
		selectedPoints.push(i);
		}
	}
//alert(selectedPoints);
//For as many items as are in the selectedPoints array,
//remove the index of the last one and make it the value of a variable named pointToRemove:
for(ii=selectedPoints.length;ii>0;ii--){
	var pointToRemove=selectedPoints.pop();
	//alert(pointToRemove);
	//If the pointToRemove is the first and only point in the path,
	//remove the path.
	//This is necessary because removal of the last point in a path is not allowed:
	if(pointToRemove=="0"&&selection[currPath].pathPoints.length==1){
		selection[currPath].remove();
	//Otherwise, remove the pointToRemove:
	}else{
		selection[currPath].pathPoints[pointToRemove].remove();
//alert(selectedPoints);
}
}
}