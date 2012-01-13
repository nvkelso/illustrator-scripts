/////////////////////////////////////////////////////////////////
//Copy to Object(s) v5 -- CS,CS2,CS3
// Hacked again by Nathaniel Vaughn Kelso @ 7 June 2007
// nvkelso@gmail.com
// "Multiple-object-replacement" hack by Iain Henderson
// iain@addition.com.au
// 
//>=--------------------------------------
// User selects two (or more) objects:
// This script copies the top most object to the position and size of 
// all other selected objects.
//
//Version 2 update: now adjusts stroke based on difference in area.
//Version 3 update: now accepts multiple targets (Thanks Iain)
//Version 4 update: Deselects everything but source object 
//  --this makes it easy to delete the source object if you wish,
//  -- also this makes the older "Replace-Object" script obsolete.
//Version 5 update: option to NOT transform to fit original shape
//  -- with additional option flag to register the replacing shape to
//     the being-replaced shape's center instead of upper-left corner
//TODO: add flag to delete "master" replacing symbol on completion
//>=--------------------------------------
// JS code (c) copyright: John Wundes ( john@wundes.com ) www.wundes.com
//copyright full text here:  http://www.wundes.com/js4ai/copyright.txt
//////////////////////////////////////////////////////////////////  

var selObjs = "Please select at least two objects on the page.";
var docRef = activeDocument;
if (documents.length>0) {
	if (docRef.selection.length > 1) {
		mySelection = docRef.selection;
		var sourceObj = docRef.selection[0];
		//if object is a (collection of) object(s) not a text field.
		if (mySelection instanceof Array) {
			//initialize vars
			//
			//*******************************************************
			// Toggles for scaling object, fitting to original, offset to center
			//toggle for scaling stroke: set to true to scale stroke.
			var scaledStroke = true;			// when fitting original dimensions, scale the stroke
			var scaledObject = true;			// fit to original dimensions
			var scalingCentered = false;			// register with center of being-replaced object
			//*******************************************************
			//create stroke Array
			var strokeArray = new Array();
			//create bounding objects 
			//********************************************************
			var origBounds = mySelection[0].geometricBounds;
			
			//define paramaters of top object
			var oul_x = origBounds[0];
			var oul_y = origBounds[1];
			var olr_x = origBounds[2];
			var olr_y = origBounds[3];
			var oSelWidth = (olr_x-oul_x);
			var oSelHeight = (oul_y-olr_y);
			var oSelPos = [oul_x, oul_y];
			// *********************************************************
			var initBounds;
			var ul_x;
			var ul_y;
			var lr_x;
			var lr_y;
			var mySelWidth;
			var mySelHeight;
			var mySelPos;
			
			var alterObjectArray = new Array();
			
			for (var i=0; i < mySelection.length; i++) {
				eval('subArray' + i + '=' + 'new Array()');
				eval('subArray' + i + '["object"]' +  '=' + mySelection[i]);
				initBounds = mySelection[i].geometricBounds;
				ul_x = initBounds[0];
				ul_y = initBounds[1];
				lr_x = initBounds[2];
				lr_y = initBounds[3];
				mySelWidth = (lr_x-ul_x);
				mySelHeight = (ul_y-lr_y);
				mySelPos = [ul_x, ul_y];
				mySelOffsetXpos = (ul_x + mySelWidth / 2 - oSelWidth / 2);
				mySelOffsetYpos = (ul_y - mySelHeight / 2 + oSelHeight / 2);
				eval('subArray' + i + '["width"]=' + mySelWidth);
				eval('subArray' + i + '["xpos"]=' + ul_x);
				eval('subArray' + i + '["ypos"]=' + ul_y);
				eval('subArray' + i + '["height"]=' + mySelHeight);
				eval('subArray' + i + '["offsetXpos"]=' + mySelOffsetXpos);
				eval('subArray' + i + '["offsetYpos"]=' + mySelOffsetYpos);
				
				eval('alterObjectArray.push(subArray' + i + ')');
			}
			
			for (var i=1; i < alterObjectArray.length; i++) {
			//find proportional Difference
			//average height and width to find new stroke
			if (scaledStroke == true) {
				var wdiff = mySelWidth/oSelWidth;
				var whght = mySelHeight/oSelHeight;
				var propDiff = (wdiff+whght)/2;
			} else {
				var propDiff = 1;
			}
			//mark stroked Items
			//apply transforms
			var newGroup = docRef.groupItems.add();
			//modify move behavior for changes in JS for CS...
			if (version == "10.0") {
				newGroup.moveToEnd(docRef);
				var tempObj = mySelection[0].duplicate();
				tempObj.moveToEnd(newGroup);
			} else {
				newGroup.move(docRef, ElementPlacement.PLACEATEND);
				mySelection[0].duplicate(newGroup, ElementPlacement.PLACEATEND);
			}
			markStroked(newGroup);

			// Check to see if the replacing object should be scaled down/up to fit the dimensions of the being-replaced object
			if ( scaledObject == true) {
				eval('newGroup.position = [alterObjectArray['+i+']["xpos"], alterObjectArray['+i+']["ypos"]]');		
				eval('newGroup.height = alterObjectArray['+ i +']["height"]');
				eval('newGroup.width = alterObjectArray[' + i +']["width"]');
			} else {
				
				// Check to see if the replacing object should be registered to the upper left corer of 
				// the being-replaced objects or if it should be centered on the being-replaced object
				if( scalingCentered == true ) {
					eval('newGroup.position = [alterObjectArray['+i+']["offsetXpos"], alterObjectArray['+i+']["offsetYpos"]]');
				} else {
					eval('newGroup.position = [alterObjectArray['+i+']["xpos"], alterObjectArray['+i+']["ypos"]]');		
				}
			}

				mySelection[i].remove();
				//restroke with new proportions
				scaleStroke(strokeArray, propDiff);
			}
			slen = selection.length;

			for (var s= slen-1;s>=0;s-- )
			{
				selection[s].selected = false;
			}
			sourceObj.selected = true;
		} else {
			alert(selObjs);
		}
	} else {
		alert(selObjs);
	}
}
//Create the stroke Object that goes into the stroke Array.
//   contains the items colorObject, and it's initial stroke weight.
function strokeObj(pName, strokeWt) {
	this.pName = pName;
	this.strokeWt = strokeWt;
}
function markStroked(Sel) {
	var slen = Sel.length;
	// if selected is a single object...
	if (Sel.typename == "GroupItem") {
		markStroked(Sel.pageItems);
	} else if (Sel.typename == "CompoundPathItem") {
		//add object and stroke weight to the array...
		myColor = Sel.pathItems[0];
		myWt = myColor.strokeWidth;
		bob = new strokeObj(myColor, myWt);
		strokeArray.push(bob);
	} else if (Sel.typename == "TextFrame") {
		if (Sel.textRange.characterAttributes.strokeColor.typename != "NoColor") {
			var clMax = Sel.textRange.characters.length;
			for (var cl=0; cl<clMax; cl++) {
				myColor = Sel.textRange.characters[0].characterAttributes;
				myWt = myColor.strokeWeight;
				bob = new strokeObj(myColor, myWt);
				strokeArray.push(bob);
			}
		}
	}
	// if selected contains more than one object...
	for (var a=0; a<slen; a++) {
		if (Sel[a].typename == "GroupItem") {
			//alert("a group in markStroke");
			markStroked(Sel[a].pageItems);
		} else if (Sel[a].typename == "CompoundPathItem") {
			myColor = Sel[a].pathItems[0];
			myWt = myColor.strokeWidth;
			bob = new strokeObj(myColor, myWt);
			strokeArray.push(bob);
		} else if (Sel[a].typename == "PathItem") {
			if (Sel[a].stroked == true) {
				myColor = Sel[a];
				myWt = myColor.strokeWidth;
				bob = new strokeObj(myColor, myWt);
				strokeArray.push(bob);
			}
		} else if (Sel[a].typename == "TextFrame") {
			if (Sel[a].textRange.characterAttributes.strokeColor.typename != "NoColor") {
				var clMax = Sel[a].textRange.characters.length;
				for (var cl=0; cl<clMax; cl++) {
					myColor = Sel[a].textRange.characters[cl].characterAttributes;
					myWt = myColor.strokeWeight;
					bob = new strokeObj(myColor, myWt);
					strokeArray.push(bob);
				}
			}
		}
	}
}
function scaleStroke(mySlx, strokeScale) {
	var slen = mySlx.length;
	for (var a=0; a<slen; a++) {
		//set it's strokeweight or strokewidth, whatever... :)
		mySlx[a].pName.strokeWidth = mySlx[a].strokeWt*strokeScale;
		mySlx[a].pName.strokeWeight = mySlx[a].strokeWt*strokeScale;
	}
}
