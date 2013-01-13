/*
JET_UnrotateTextFrames.jsx
A Javascript for Adobe Illustrator by James E. Talmage.

Purpose:
Rotates already rotated TextFrame objects in the current selection back to the normal zero-degree orientation.

To Use:
Select one or more rotated textFrame objects. (Can be Area Type or Point Type.) Run the script.
The script corrects simple rotation. It does not undo any other non-proportional distortions that may have been applied to the text.
If the text has undergone character width changes, or has been skewed, or otherwise distorted after being rotated, the unrotated results will not
appear as expected, although it is technically correct.
The bounding boxes are not rotated with the textFrame objects. Therefore, after runing the script,
and while the objects are still selected, choose Object>Transform>ResetBoundingBox
to unrotate the textFrame bounding boxes.
*/
var docRef=app.activeDocument;
if(docRef.selection.length>0){
	for(i=0;i<docRef.selection.length;i++){
		var objRef=docRef.selection[i];
		if(objRef.typename=="TextFrame"){
				
		
			var A=objRef.matrix.mValueA;
			var B=objRef.matrix.mValueB;
			var C=objRef.matrix.mValueC;
			var D=objRef.matrix.mValueD;
			if(B+C!=0){
				var currScale=(D/A)*100;
				alert(currScale);
					objRef.width*=(D/A);
				//}while(B+C!=0);
			}
		

			do{
				var currSin=objRef.matrix.mValueC;
				var currDeg=Math.asin(currSin)*(180/Math.PI);
				objRef.rotate(currDeg,1,1,1,1,Transformation.CENTER);
			}while(objRef.matrix.mValueC!=0);
		}//end if
	}//end for
	redraw();
	alert("Now select Object > Transform > Reset Bounding Box to unrotate the textFrame bounding boxes."); 
}//end if