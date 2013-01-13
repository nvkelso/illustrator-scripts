/*
JET_NumberedCallouts
A Javascript for Adobe Illustrator CS2 by James E. Talmage.
Purpose: Creates a set of textFrame objects containing sequential numbers with an optional prefix.
Also names each object by the prefix and number.
Creates a set of textFrame objects containing sequential numbers with an optional prefix.
Also names each object (names appear in the Layers Panel) by the prefix and number.
The naming portion of the script works on any object that can be duplicated.
Therefore, the script can also be used to create and name a series of copies of any other type of object.
To Use: Select one object. Run the script.
*/

var docRef = app.activeDocument; 
var objRef=docRef.selection[0]; 
var numPrefix=prompt("Type the desire name prefix of the selected object.","Item_");
var startNum=prompt("What number do you want to start with?",1); 
var endNum=prompt("What number do you want to end with?",10); 
objRef.name=numPrefix+startNum; 
objRef.contents=numPrefix+startNum; 
var moveEach=prompt("Enter a distance (in points)by which to space the copies.",36); 
startNum++;
var moveMult=1;
for(i=startNum;i<=endNum;i++){
	
	var newObj=objRef.duplicate();
	newObj.name= numPrefix+i;
	newObj.contents=newObj.name;
	newObj.top-=moveEach*moveMult; 
	moveMult++;
} 
