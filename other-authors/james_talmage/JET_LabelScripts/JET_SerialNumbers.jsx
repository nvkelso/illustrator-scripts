/*
JET_SerialNumbers.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
Creates serial numbers within a selected text frame, incremented by one, with user-defined prefix, number of entries, and starting number.
Numbers are separated by carriage returns. Useful for ticket-like number sequences.

To Use:
Create a textframe object. This can be either PointType or AreaType. Select the textframe as an object.
(Do not have the text edit cursor active inside it.) Then run the script.
The content of the textframe is replaced by the serial numbers according to the parameters you specify in the prompts.
*/

var docRef=activeDocument; 
var textRef=activeDocument.selection[0]; 

var serialPrefix=prompt("Enter the desired prefix.","P-"); 
var numSerials=prompt("How many numbers do you need?",10); 
var startNum=prompt("What number do you want to start with",115501); 
var serNums=serialPrefix+startNum; 

textRef.contents=serNums; 
for (i=1;i<numSerials;i++){
startNum++;
var nextSerial=serialPrefix+startNum;
textRef.paragraphs.add(nextSerial); 
}
