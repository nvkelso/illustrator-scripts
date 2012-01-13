/////////////////////////////////////////////////////////////////
//Divide TextFrame v.2 -- CS,CS2
//>=--------------------------------------
// Divides a multiline text field into separate textFrame objects.
// Basically, each line in the selected text object
// becomes it's own textFrame. Vertical Spacing of each new line is based on leading.
// 
// This is the opposite of my "Join TextFrames" scripts which
// takes multiple lines and stitchs them back together into the same object.
//>=--------------------------------------
// JS code (c) copyright: John Wundes ( john@wundes.com ) www.wundes.com
//copyright full text here:  http://www.wundes.com/js4ai/copyright.txt
////////////////////////////////////////////////////////////////// 
 
if(activeDocument.selection[0].contents.indexOf("\n") != -1){
	//alert("This IS already a single line object!");
}else{
	//get object position
	//make array
	var lineArr = fieldToArray(activeDocument.selection[0]);
	//alert(lineArr);
	tfTop = activeDocument.selection[0].top;
	tfLeft = activeDocument.selection[0].left;

	activeDocument.selection[0].contents = lineArr[0];

	//for each array item, create a new text line
	var tr = activeDocument.selection[0].story.textRange;
	var vSpacing = tr.leading;
	for(j=1;j<lineArr.length;j++){
		bob = activeDocument.selection[0].duplicate(activeDocument, ElementPlacement.PLACEATBEGINNING);
		bob.contents = lineArr[j];
		bob.top = tfTop - (vSpacing*j);
		bob.left = tfLeft;	
		bob.selected = false;
		
	}
}

function fieldToArray(myField) {
	 
	if (myField.typename == "TextFrame") {
		retChars = new Array("\x03","\f","\r","\n");
		var ct = 0;
		var tmpTxt = myField.contents.toString();
		for (all in retChars )
		{
		tmpArr = tmpTxt.split(retChars[all]);
		ct+= tmpArr.length;
		}
		//--and just for kicks...
		ct+=1;
		//alert(ct);
		


		while (ct>0) {
			//throw something lucicrious as a content divider...
			tmpTxt = tmpTxt.replace(/[\x03]|[\f]|[\r\n]|[\r]|[\n]/,"_:X:_");
			ct--;
		}
		return tmpTxt.split("_:X:_");
	}
}