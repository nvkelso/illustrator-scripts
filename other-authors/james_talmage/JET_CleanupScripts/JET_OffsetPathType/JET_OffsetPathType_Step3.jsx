/*
JET_OffsetPathType_Step3.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
Type attached to an irregular-shaped path, as common in road maps, is usually ill-spaced due to the bends in the baseline.
This script is Step 3 of an automation which consists of two scripts and two Actions.
The intent of this routine is to offset the textPath
of all existing PathType objects by a distance sufficient
to allow the TypeOnAPath AlignToPath option to be set to Center,
in order to improve the character spacing problems which occur
when the option is set to the default Baseline.

Schema:
Moves the text of the original PathText object
to one of the paths resulting from the expanded ArtBrush
applied by the Step 2 Action; then removes the other paths
of the ArtBrush and the original PathText object.

To Use:
After having run the Step 1 script and the Step 2 Action, run this script. An alert will then instruct you to run the Step 4 Action.
*/
var docRef=activeDocument;
for (i=0;i<docRef.selection.length;i++){
var curGroup=selection[i].parent;
var curPathText=curGroup.textFrames[0];
var curString=curPathText.contents;
var curKeeperPath=curGroup.groupItems[0].groupItems[0].pathItems[0];
var curScrapPath=curGroup.groupItems[0].groupItems[0].pathItems[1];
var offsetTextPath=curGroup.groupItems[0].groupItems[0].textFrames.pathText(curKeeperPath);
offsetTextPath.contents=curString;
curScrapPath.remove();
curPathText.remove();
curGroup.groupItems[0].pathItems[0].remove();
}
alert("Now run Step 4 from the Actions palette.");