/*
JET_ConcatenateTextAtEnd.jsx 
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
Adds text from the frontmost selected text object to the end of the content of each of the other selected text objects.
Useful for inserting paragraph returns at the ends of many PointType objects prior to joining them by copying and pasting into
a single textFrame.

To Use:
Create a textFrame object (can be either Area Type or Point Type) containing the text that you want to add to the end of other text objects.
Select the new textFrame and all the other text objects you wish to affect. Run the script.
*/

//Adds the text of the frontmost selected text object to the end of each of the other text objects in the current selection.

alert("'"+selection[0].contents+"' is the text of the frontmost text object, and will be added to the end of all the others selected");
for(i=1;i<selection.length;i++){
if(selection[i].typename="TextFrame"){
selection[i].characters.add(selection[0].contents);
}
}