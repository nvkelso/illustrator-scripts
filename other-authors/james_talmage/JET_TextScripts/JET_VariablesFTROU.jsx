/*
JET_VariablesFTROU.jsx
A Javascript for Adobe Illustrator by James E. Talmage.

Purpose:
The title abreviates "variables for the rest of us."
Illustrator's Variables panel expects to work with XML. However, XML is quite cumbersome compared to the more common need to create DataSets from
ordinary delimited textual values (as in a spreadsheet).
This script creates Illustrator Variables and Data Sets from ordinary tab-delimited text that has been typed or pasted into a normal Illustrator textFrame on the Artboard.

To Use:
Enter tab-delimited text into a textFrame. (Can be Area Type or Point Type.) The top line of text will become the variable names. The left column will become
the DataSet names. Run the Script.
Variables and DataSets will appear in the Variables Panel. A set of text objects will be created at the upper left corner of the Artboard. Those text objects will be
bound Variables. Arrange and format the Variables as desired. Cycle through the DataSets to change their values.
*/

var docRef = activeDocument;
var tabChar="	";
var sourceText=activeDocument.selection[0];
var paraCount=sourceText.paragraphs.length;
var firstPara=sourceText.paragraphs[0];
var charsCount=firstPara.characters.length;

//Create array to hold values of first paragraph
var firstRecord=new Array();
var valHolder="";
for(c=0;c<charsCount;c++){
	var currChar=firstPara.characters[c].contents;
	if(currChar==tabChar){
		firstRecord.push(valHolder);
		valHolder="";
	}else{
		valHolder+=currChar;
	}
}
firstRecord.push(valHolder);
//alert(firstRecord);//All columns are in firstRecord

//Create textFrames, put them in an array, create variables for them
var frames=new Array();
var framesCount=firstRecord.length;
for(f=1;f<framesCount;f++){
	var currVal=firstRecord[f];
	var newFrame = docRef.textFrames.add();
	frames.push(newFrame);
	newFrame.contents = currVal;
	newFrame.top = docRef.height;
	newFrame.left = 0;
	var textVar = docRef.variables.add();
	textVar.kind = VariableKind.TEXTUAL;
	textVar.name = currVal;
	newFrame.contentVariable = textVar;
	redraw();
}
//alert(frames[0].contents);//Content of first frame is second item

//For each additional paragraph, put all values in an array
for(p=1;p<paraCount;p++){
	var currPara=sourceText.paragraphs[p];
	var charCount=currPara.characters.length;
	var paraVals=new Array();
	var valHolder="";
	for(c=0;c<charCount;c++){
		var currChar=currPara.characters[c].contents;
		if(currChar==tabChar){
			paraVals.push(valHolder);
			valHolder="";
		}else{
			valHolder+=currChar;
		}
	}
	paraVals.push(valHolder);
	//alert(paraVals);//All columns are in paraVals

	//replace contents of each frame with values from paraVals
	for(v=1;v<paraVals.length;v++){
		frames[v-1].contents=paraVals[v];
		redraw();
	}
	var newDataSet = docRef.dataSets.add();
	newDataSet.name=paraVals[0];
	newDataSet.update();
	newDataSet.display();
	redraw();
}

