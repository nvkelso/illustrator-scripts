/*
JET_AutoFitVertical.jsx
A Javascript for Adobe Illustrator by James E. Talmage.
Purpose: Eliminates overset text by incrementally enlarging the textFrame's textPath until
all of its text is visible. Shrinks oversized textFrame textPaths by incrementally reducing the height
until the number of characters visible is fewer than those contained, then enlarges one increment to reveal all the text.
*/
var docRef=activeDocument;
alert("The bottoms of selected AreaType objects will be raised or lowered\r1 point at a time until they fit against the contained text.");
for(i=0;i<docRef.selection.length;i++){
	var currObj=docRef.selection[i];
	if(currObj.typename=="TextFrame"&&currObj.kind=="TextType.AREATEXT"){
		var currTextFrame=currObj;
		var currTextPath=currTextFrame.textPath;
		var paraCount=currTextFrame.paragraphs.length;
		var totalCharsCount=currTextFrame.characters.length;
		var visibleCharsCount=countChars(currTextFrame)+(paraCount-1);
		//alert(visibleCharsCount<totalCharsCount);

		if(visibleCharsCount<totalCharsCount){
			while(visibleCharsCount<totalCharsCount){
				currTextPath.height+=1;
				visibleCharsCount=countChars(currTextFrame)+(paraCount-1);
			}
			redraw();
		}else{
			while(visibleCharsCount==totalCharsCount){
				currTextPath.height-=1;
				visibleCharsCount=countChars(currTextFrame)+(paraCount-1);
			}
			currTextPath.height+=1;
		}
		redraw();
	}
}

function countChars(textFrame){
	var charCount=0;
	for(l=0;l<textFrame.lines.length;l++){
		charCount+=currTextFrame.lines[l].characters.length;
	}
	return charCount;
}
