/*
JET_Split.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
FreeHand has long provided a Split Path command which breaks paths at all subselected points.
Illustrator only just gained a similar function in CS3 in the Control Panel's Cut Paths At Selected Anchor Points button.
Like other buttons in the Control Panel, this one disappears if its expected selection context is not true. For example, it disappears
if all of the points of a path are selected.
This script, splits all selected paths at all selected anchorPoints.

To Use:
Select one or more pathItem(s). Run the script.
The path(s) are cut at each selected anchorPoint.
*/

if (app.documents.length > 0 && app.activeDocument.pathItems.length > 0 ){
	doc=app.activeDocument;
	function addPtLike(pathToAddTo,ptToCopy){
		newPt=pathToAddTo.pathPoints.add();
		newPt.anchor=ptToCopy.anchor;
		newPt.leftDirection=ptToCopy.leftDirection;
		newPt.rightDirection=ptToCopy.rightDirection;
		newPt.pointType=ptToCopy.pointType;
		newPt.selected=ptToCopy.selected;
	}
	function addSelectedPtLike(pathToAddTo,ptToCopy){
		newPt=pathToAddTo.pathPoints.add();
		newPt.anchor=ptToCopy.anchor;
		newPt.leftDirection=ptToCopy.leftDirection;
		newPt.rightDirection=ptToCopy.rightDirection;
		newPt.pointType=ptToCopy.pointType;
		newPt.selected=PathPointSelection.ANCHORPOINT;
	}
	pathsToSplit=Array();
	for(s=selection.length-1;s>=0;s--){
		if(selection[s].typename=="PathItem"){
			pathsToSplit.push(selection[s]);
		}else{
			selection[s].selected=false;
		}
	}
	for(s=pathsToSplit.length;s>0;s--){
		currentPath=pathsToSplit[s-1];
		if (currentPath.typename=="PathItem"&&currentPath.closed==false){
			firstPt=currentPath.pathPoints[0];
			var newPath = doc.pathItems.add();
			addPtLike(newPath,firstPt);
			//newPath.selected=true;
			for(ptNum=1;ptNum<currentPath.pathPoints.length;ptNum++){
				if(currentPath.pathPoints[ptNum].selected!="PathPointSelection.ANCHORPOINT"){
					addPtLike(newPath,currentPath.pathPoints[ptNum]);
					//newPath.selected=true;
				}else{
					addSelectedPtLike(newPath,currentPath.pathPoints[ptNum]);
					if(ptNum<currentPath.pathPoints.length-1){
						var newPath = doc.pathItems.add();
						addSelectedPtLike(newPath,currentPath.pathPoints[ptNum]);
					}
					//newPath.selected=true;
				}
			}
		}
		if (currentPath.typename=="PathItem" && currentPath.closed==true){
			startPtNum=0;
			extraPtsNum=0;
			for(i=currentPath.pathPoints.length-1;i>=0;i--){
				if(currentPath.pathPoints[i].selected=="PathPointSelection.ANCHORPOINT"){
				startPtNum=i;
				extraPtsNum=i;
				}
			}
			if(currentPath.pathPoints[startPtNum].selected=="PathPointSelection.ANCHORPOINT"){
				newPath = doc.pathItems.add();
				addSelectedPtLike(newPath,currentPath.pathPoints[startPtNum]);
				//newPath.selected=true;
			}
			for(ptNum=startPtNum+1;ptNum<currentPath.pathPoints.length;ptNum++){
				if(currentPath.pathPoints[ptNum].selected!="PathPointSelection.ANCHORPOINT"){
					addPtLike(newPath,currentPath.pathPoints[ptNum]);
					//newPath.selected=true;
				}else{
					addSelectedPtLike(newPath,currentPath.pathPoints[ptNum]);
					newPath = doc.pathItems.add();
					addSelectedPtLike(newPath,currentPath.pathPoints[ptNum]);
					//newPath.selected=true;
				}
			}
			addPtLike(newPath,currentPath.pathPoints[0]);
			for(i=1;i<=extraPtsNum;i++){
				addPtLike(newPath,currentPath.pathPoints[i]);
			}
		}
		if(currentPath.typename=="PathItem"){
			currentPath.remove();
		}else{
			currentPath.selected=false;
		}
	}
}
