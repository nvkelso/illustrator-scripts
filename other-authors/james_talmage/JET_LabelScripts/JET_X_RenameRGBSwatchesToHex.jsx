/*
JET_X_RenameSwatchesToHex.jsx
A Javascript for Adobe Illustrator by James E. Talmage.

Purpose:
Renames RGB Swatches to Hexidecimal equivalents of their RGB values.

Algorithm:
Swatches in CMYK documents are CMYK Swatches, even if they are defined with RGB sliders in the Color Palette.
If the document Color Mode is CMYK, the script only presents an alert informing the user.
Otherwise, the script checks each Swatch to see if its color property is RGB.
If it is, the script calls the RGBtoHex function and uses its result to rename the Swatch.

To Use:
Make sure the document Color Mode is RGB. Run the Script.
The script does not affect Swatches whose color property is PatternColor, GrayColor, GradientColor, SpotColor, or NoColor.

Experimental Notes:
The script is titled "JET_X..." because although it is useable, I consider it a work-in-progress.
*/

var docRef=app.activeDocument;
//If the document ColorSpace is CMYK, alert the user.
if(docRef.documentColorSpace=="DocumentColorSpace.CMYK"){
	alert("Document Color Space is CMYK. Script will not rename Swatches.");
	//Else, the document ColorSpace is RGB. Cycle through the Swatches.
}else{
	for(i=docRef.swatches.length-1;i>=0;i--){
		var swatchRef=docRef.swatches[i];
		//Check if the Swatch's color is RGB.
		if(swatchRef.color=="[RGBColor]"){
			var R=Math.floor(swatchRef.color.red);
			var G=Math.floor(swatchRef.color.green);
			var B=Math.floor(swatchRef.color.blue);
			//Call the RGBtoHex function and use its result to name the Swatch.
			swatchRef.name=RGBtoHex(R,G,B);
		}
		//Handle Global Colors, which Illustrator stupidly thinks are Spot Colors
		if((swatchRef.color=="[SpotColor]")&&(swatchRef.color.spot.color=="[RGBColor]")){
			var R=Math.floor(swatchRef.color.spot.color.red);
			var G=Math.floor(swatchRef.color.spot.color.green);
			var B=Math.floor(swatchRef.color.spot.color.blue);
			//Call the RGBtoHex function and use its result to name the Swatch.
			swatchRef.name=RGBtoHex(R,G,B);
			}//end if
	}//end for
}//end else

function RGBtoHex(red, green, blue)
{
    var decColor = (blue) + (256 * green) + (65536 * red);
    var hexColor=decColor.toString(16);
	while(hexColor.length < 6) {
		hexColor = "0" + hexColor; 
}
	return hexColor.toUpperCase();
}