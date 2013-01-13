/*
JET_OffsetPathType_Step1.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
Type attached to an irregular-shaped path, as common in road maps, is usually ill-spaced due to the bends in the baseline.
This script is Step 1 of an automation which consists of two scripts and two Actions.
The intent of this routine is to offset the textPath
of all existing PathType objects by a distance sufficient
to allow the TypeOnAPath AlignToPath option to be set to Center,
in order to improve the character spacing problems which occur
when the option is set to the default Baseline.

Schema:
Duplicates the path of each pathType object in the file, and numbers it in the notes field.
Finds and directSelects the textPaths in preparation for them to be manipulated by the Step 2 Action.

To Use:
In a document containing PathType objects, Run the script. It is not necessary to make a selection first. Afterh this script runs, an alert
instructs you to run the Step 2 Action.
*/

var docRef=activeDocument;
for (i=0;i<docRef.textFrames.length;i++){
var curTextFrame=docRef.textFrames[i];
if (curTextFrame.kind==TextType.PATHTEXT){
var curString=curTextFrame.contents;
curPath=curTextFrame.textPath.pathPoints[0].parent;
curPath.selected=true;
}
}
alert("Now run Step 2 from the Actions palette.");