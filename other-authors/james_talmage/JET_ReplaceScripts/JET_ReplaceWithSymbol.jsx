/*
JET_ReplaceWithSymbol.jsx
A Javascript for Adobe Illustrator

Purpose:
Replaces selected items with Instances of a Symbol from the Symbols Panel.
The desired Symbol can be defined by its index number (its number of occurrance in the Panel).

To Use:
Document must have at least one Symbol defined.
Select objects. Run the script.
*/
var docRef=app.activeDocument;
var symbolNum=prompt("Enter the number of the Symbol you want to replace each selected object",1);
for(i=0;i<docRef.selection.length;i++){
	var currObj=docRef.selection[i];
	var currLeft=currObj.left;
	var currTop=currObj.top;
	var currWidth=currObj.width;
	var currHeight=currObj.height;
	var currInstance=docRef.symbolItems.add(docRef.symbols[symbolNum-1]);
	currInstance.width*=currHeight/currInstance.height;
	currInstance.height=currHeight;
	currInstance.left=currLeft;
	currInstance.top=currTop;
	currInstance.selected=true;
	currObj.remove();
	redraw();
}
