// Attach Text To Path
// Nathaniel Vaughn KELSO
// 2016.Oct.20 
// at Colorado Springs, CO
// Version 0.1
// DESC: Takes a path and some text and joins them onto the path

if(documents.length > 0) {
	doc = activeDocument;
	mySelection = activeDocument.selection;

	// If there are enough to process
	if (mySelection instanceof Array)

    // and delete the text object
    var thePathWantingText = null;
    var theTextWantingPath = null;
    var characterStyle = null;
    
    if( mySelection.length == 2 ) {
        // For each of the selected items
        for(i=0; i<mySelection.length; i++) {
            // That are textFrames
            //if (mySelection[i].typename == "TextFrame" && mySelection[i].kind == TextType.PATHTEXT) {
            if (mySelection[i].typename == "PathItem" ) {
                thePathWantingText = mySelection[i];
              }
          
            if (mySelection[i].typename == "TextFrame" ) {
                if (mySelection[i].contents.length > 0 ) {
                    theTextWantingPath = mySelection[i];
                    
                    if( theTextWantingPath.textRange.characterStyles.length > 0) {
                        characterStyle = theTextWantingPath.textRange.characterStyles[0];
                     }
                } else {                    
                    var lineObj = doc.pathItems.add();
                    var pathArray = [];
                    var pathPointsLength = mySelection[i].textPath.pathPoints.length;
                    
                    for(j=0; j<pathPointsLength; j++) {
                        pathArray.push( mySelection[i].textPath.pathPoints[j].anchor );
                    }    
                        
                    lineObj.setEntirePath( pathArray );

                    thePathWantingText = lineObj;
                    
                    mySelection[i].remove();        
                }
            }
         }
     
        if( thePathWantingText && theTextWantingPath ) {

              var linePathText = doc.textFrames.pathText(thePathWantingText);
              linePathText.contents = theTextWantingPath.contents;
              
              if( characterStyle) {
                  characterStyle.applyTo(linePathText.textRange);
              } else {
                  // NOTE: This code path isn't excercised because the Normal Style in the doc is always matched
                  // but future work could look at the character style overrides from the theTextWantingPath
                  // incrementally increase the scale of each character
                  var charCount = theTextWantingPath.textRange.length;
                  for(i=0; i<charCount; i++) {
                      linePathText.textRange.characters[i].characterAttributes.size = theTextWantingPath.textRange.characters[i].characterAttributes.size;
                      // & etc for color, and other font characteristics
                  }              
              }

               // Remove the text object (the content of which is now on the path)
              theTextWantingPath.remove();        
        } else {
            alert( "Select a path and some text, dude." );  
        }
   } else {
            alert( "Select 2 things, dude." );  
       }
}
