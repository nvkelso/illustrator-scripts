// LayersDeleteEmpty
// Deletes all layers which do not have content (empty layers) in the active document
// Nathaniel Vaughn KELSO
// 2007.July.8 
// at Hyattsville, MD
// Version 0.1

// only do for the active document
if(documents.length > 0) {
	doc = activeDocument;
}

// Flag to determine if LAYERS only or also look at empty Sublayers
//  WARNING pageItems does NOT include sublayer if they are present!
var doSubLayers = 1;
var layersDeleted = 0;
var subLayersDeleted = 0;
var targetDocument = doc;var layerCount = targetDocument.layers.length;

// Loop through layers from the back, to preserve index// of remaining layers when we remove one
// TODO: Only looks one level of sublayers deep!!!
for (var ii = layerCount - 1; ii >= 0; ii-- ) {	targetLayer = targetDocument.layers[ii];	var layerObjects = new Number( targetLayer.pageItems.length );

	// For completely empty layers
	if ( layerObjects == 0 && targetLayer.layers.length==0 ) {		targetDocument.layers[ii].remove();		layersDeleted++;

	// What if the layer has sublayers?
	// TODO: Only looks one level of sublayers deep!!!	} else if (doSubLayers ) {
		var subLayerCount = targetLayer.layers.length;
		for (var iii = subLayerCount - 1; iii >= 0; iii-- ) {			targetSubLayer = targetLayer.layers[iii];			var subLayerObjects = new Number( targetSubLayer.pageItems.length );

			// For completely empty layers
			if ( subLayerObjects == 0 && targetSubLayer.layers.length==0) {				targetSubLayer.remove();				subLayersDeleted++;
			}
		}
		// Check again to see if the layer is now empty if all the empty sublayer have beeen deleted
		// For completely empty layers
		if ( layerObjects == 0 && targetLayer.layers.length==0 ) {			targetDocument.layers[ii].remove();			layersDeleted++;
		}
	}}