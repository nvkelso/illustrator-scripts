/*
JET_FixRegColorFromFH.jsx
A Javascript for Adobe Illustrator CS2 and CS3 by James E. Talmage.

Purpose:
When opening a FreeHand file, Illustrator fails to assign AI's [Registration] swatch
to paths and text having FreeHand's Registration swatch. Instead, it imports
FH's Registration swatch as a process swatch.

Schema:
This script cycles through the characters in the document's textFrames looking for characters
with a fillColor of "Registration" and assigns AI's [Registration] swatch to each one it finds.
The script then does the same for pathItems, first looking for fills, then for strokes.

To Use:
After opening a FreeHand file in Illustrator, run the script.
*/

if ( app.documents.length > 0 && app.activeDocument.swatches.length > 0 ) {
	var docRef=app.activeDocument;
	for(i=0;i<docRef.textFrames.length;i++){
		var textRef=docRef.textFrames[i];
		for(c=0;c<textRef.characters.length;c++){
			var charRef=textRef.characters[c];
			if(charRef.fillColor.spot.name=="Registration"){
				charRef.fillColor=docRef.swatches["[Registration]"].color;
				var changed="changed";
			}	
		}
		if(changed=="changed"){
			textRef.selected=true;
			redraw();
			changed=null;
		}
	}
	for(i=0;i<docRef.pathItems.length;i++){
		var pathRef=docRef.pathItems[i];
		if(pathRef.fillColor=="[SpotColor]"){
			if(pathRef.fillColor.spot.name=="Registration"){
				pathRef.fillColor=docRef.swatches["[Registration]"].color;
				pathRef.selected=true;
				redraw();
			}
		}
		if(pathRef.strokeColor!="[NoColor]"){
			if(pathRef.strokeColor.spot.name=="Registration"){
				pathRef.strokeColor=docRef.swatches["[Registration]"].color;
				pathRef.selected=true;
				redraw();
			}
		}
	}
}