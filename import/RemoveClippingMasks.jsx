#target Illustrator
// script.name = RemoveClippingMasks.jsx
// script.description = deletes all PageItems being used as clipping masks.
// script.parent = Kenneth Webb // 01/07/2013
// script.elegant = true?
 
 
var docRef = app.activeDocument;
var clippingCount = 0
clipScan()
 
 
//loops through all pageItems, removing those that are clipping masks
function clipScan () {
    for (i=docRef.pageItems.length-1;i>=0;i--) { 
        if (docRef.pageItems[i].clipping == true){
            docRef.pageItems[i].remove();
            clippingCount++;
        }
    }
};
 
 
alert ("All "+clippingCount+" Clipping Masks Removed")
