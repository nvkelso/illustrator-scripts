/*
JET_ConcatenateTextAtStart.jsx 
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
Adds text from the frontmost selected text object to the start of the content of each of the other selected text objects.
Useful for inserting tabs or other characters at the starts of many PointType objects prior to joining them by copying and pasting into
a single textFrame.

To Use:
Create a textFrame object (can be either Area Type or Point Type) containing the text that you want to add to the start of other text objects.
Select the new textFrame and all the other text objects you wish to affect. Run the script.
*/

alert("'"+selection[0].contents+"' is the text of the frontmost text object, and will be added to the start of all the others selected");
for(i=1;i<selection.length;i++){
if(selection[i].typename="TextFrame"){
originalContents=selection[i].contents;
selection[i].contents=selection[0].contents + " " + originalContents;
//selection[i].characters.add(selection[0].contents);
}
}