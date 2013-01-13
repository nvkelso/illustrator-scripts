/*
JET_ReversePath.jsx
A Javascript for Adobe Illustrator by James E. Talmage

Purpose:
FreeHand provides a Reverse Path command which works on any number of selected paths or subpaths.
Illustrator provides a reverse direction toggle button in the Attributes Panel, but it only works on subpaths of Compound Paths.
This script, reverses the direction of one or more selected paths and/or subpaths. Especially useful for reversing the spines of Brush and Blend spines..

To Use:
Select one or more pathItem(s). Run the script.
The direction of each selected path is reversed.
*/

for(i=0;i<activeDocument.selection.length;i++){
	if(selection[i].polarity==PolarityValues.POSITIVE){
		selection[i].polarity=PolarityValues.NEGATIVE;
	}else{
		selection[i].polarity=PolarityValues.POSITIVE;
	}
}
