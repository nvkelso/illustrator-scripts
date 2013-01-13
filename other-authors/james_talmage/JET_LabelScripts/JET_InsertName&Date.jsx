/*
JET_InsertName&Date.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
This script adds the active document's file name and the current date at the text cursor position within a textframe object. 

To Use:
With an Illustrator document open, use the Text Tool to create a textframe object. This can be a textframe of any kind (PointType, AreaType, PathType).
The text editing cursor (the text "I-beam") must be active in the textframe.
Run the script.
The script inserts the document's name and the current date into the textframe.
*/
var cursorPoint=activeDocument.selection; 
var docRef=activeDocument; 
var docName=activeDocument.name; 
var docDate= new Date(); 
var docDateAndTime=docDate.toLocaleString(); 
var monthOnly=docDate.getMonth(); 
cursorPoint.words.add(docName+" "+docDateAndTime); 
