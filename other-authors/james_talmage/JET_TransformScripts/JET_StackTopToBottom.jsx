/* 
JET_StackTopToBottom.jsx
A Javascript for Adobe Illustration by James E. Talmage

Purpose:
This script re-stacks the selected objects
according to their vertical positions, top to bottom.
After running the script, the selected object positioned highest on the page will be rearmost;
the one lowest on the page will be frontmost.
This is mainly useful for correcting the stacking order of individual
PointType textFrames in imported CAD drawings before concatenating them into a single AreaType textFrame, as in a parts list.

To Use:
Select the individual text objects which are visually in the correct order, but which are not actually stacked in the correct z-order.
Run the script. The text objects will be re-stacked, but will not be moved. Copy the text objects and paste into a single textFrame.
*/

var docRef=activeDocument;
var selectionRef=activeDocument.selection;
var textRefs=new Array();

function sortByTop(a,b){
return a.top-b.top;
}

for (i=0; i<selectionRef.length;i++){
var textRef=selectionRef[i];
textRefs.push(textRef);
}
alert(textRefs);
textRefs.sort(sortByTop);
alert(textRefs);

for(i=0;i<textRefs.length;i++){
textRefs[i].zOrder(ZOrderMethod.SENDTOBACK);
}