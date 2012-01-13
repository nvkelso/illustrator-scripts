//////////////////////////////////////////////////////////// english //
// -------------------------------
// -=> WR-reversePathDirection <=-
// -------------------------------
//
// A Javascript for Adobe Illustrator
// by Wolfgang Reszel (ai-js@rumborak.de)
//
// Version 0.2 from 1.12.2004
//
// This script reverses the path-direction of all selected paths.
//
// To enable the english messages change the "de" into "en" in line 40.
//
// Sorry for my bad english. For any corrections send an email to:
// ai-js@rumborak.de
//
//////////////////////////////////////////////////////////// Deutsch //
// -------------------------------
// -=> WR-reversePathDirection <=-
// -------------------------------
//
// Ein Javascript fuer Adobe Illustrator
// von Wolfgang Reszel (ai-js@rumborak.de)
//
// Version 0.2 vom 1.12.2004
//
// Dieses Skript kehrt die Pfadrichtung aller markierten Pfadobjekte um.
//
// Um dieses Skript mit deutschen Meldungen zu versehen, muss in Zeile
// 40 das "en" durch ein "de" ersetzt werden.
//
// Verbesserungsvorschlaege an: ai-js@rumborak.de
//

//$.bp();

// -------------------------------------------------------------------

var language="en";   // "de" fuer Deutsch

// -------------------------------------------------------------------

var WR="WR-reversePathDirection v0.2\n\n";

if (language == "de") {

  var MSG_noobjects = WR+"Bitte w\xE4hle vorher einige Objekte aus.";
  var MSG_nodocs = WR+"Kein Dokument ge\xF6ffnet.";

} else {

  var MSG_noobjects = WR+"Please select some objects.";
  var MSG_nodocs = WR+"You have no open document."

}

var error=0;

if (documents.length<1) {
  error++;
  alert(MSG_nodocs);
}
if (error == 0) {
  var theObjects=selection;

  if (theObjects.length<1 && error == 0) {
    error++;
    alert(MSG_noobjects);
  }
}
if (error < 1) {
  reversePaths(theObjects);
}

function reversePaths(theItems) {
  if (theItems.typename == "TextPath") {
    pathLen = theItems.pathPoints.length;

    for ( k = 0; k < pathLen/2; k++ ) {
      h = pathLen-k-1;

      HintenAnchor = theItems.pathPoints[h].anchor;
      HintenLeft = theItems.pathPoints[h].leftDirection;
      HintenType = theItems.pathPoints[h].pointType;
      HintenRight = theItems.pathPoints[h].rightDirection;

      theItems.pathPoints[h].anchor = theItems.pathPoints[k].anchor;
      theItems.pathPoints[h].leftDirection = theItems.pathPoints[k].rightDirection;
      theItems.pathPoints[h].pointType = theItems.pathPoints[k].pointType;
      theItems.pathPoints[h].rightDirection = theItems.pathPoints[k].leftDirection;
      theItems.pathPoints[k].anchor = HintenAnchor;
      theItems.pathPoints[k].leftDirection = HintenRight;
      theItems.pathPoints[k].pointType = HintenType;
      theItems.pathPoints[k].rightDirection = HintenLeft;

    }
  }

  for (var i = 0 ; i < theItems.length; i++)
  {
    if (theItems[i].typename == "GroupItem" || theItems[i].typename == "CompoundPathItem" ) {
      reversePaths(theItems[i].pathItems);
      try {reversePaths(theItems[i].compoundPathItems)} catch (e) {};
    }
    if (theItems[i].typename == "TextFrame" ) {reversePaths(theItems[i].textPath);}
    if (theItems[i].typename == "TextArtItem" ) {reversePaths(theItems[i].textPaths);}
    if ( theItems[i].typename == "PathItem" && !theItems[i].locked && !theItems[i].parent.locked && !theItems[i].layer.locked ) {

      pathLen = theItems[i].pathPoints.length;

      for ( k = 0; k < pathLen/2; k++ ) {
        h = pathLen-k-1;

        HintenAnchor = theItems[i].pathPoints[h].anchor;
        HintenLeft = theItems[i].pathPoints[h].leftDirection;
        HintenType = theItems[i].pathPoints[h].pointType;
        HintenRight = theItems[i].pathPoints[h].rightDirection;

        theItems[i].pathPoints[h].anchor = theItems[i].pathPoints[k].anchor;
        theItems[i].pathPoints[h].leftDirection = theItems[i].pathPoints[k].rightDirection;
        theItems[i].pathPoints[h].pointType = theItems[i].pathPoints[k].pointType;
        theItems[i].pathPoints[h].rightDirection = theItems[i].pathPoints[k].leftDirection;
        theItems[i].pathPoints[k].anchor = HintenAnchor;
        theItems[i].pathPoints[k].leftDirection = HintenRight;
        theItems[i].pathPoints[k].pointType = HintenType;
        theItems[i].pathPoints[k].rightDirection = HintenLeft;
      }
    }
    if ( theItems[i].typename == "TextPath" && !theItems[i].locked && !theItems[i].parent.locked && !theItems[i].parent.layer.locked ) {

      pathLen = theItems[i].textPathObject.pathPoints.length;

      for ( k = 0; k < pathLen/2; k++ ) {
        h = pathLen-k-1;

        HintenAnchor = theItems[i].textPathObject.pathPoints[h].anchor;
        HintenLeft = theItems[i].textPathObject.pathPoints[h].leftDirection;
        HintenType = theItems[i].textPathObject.pathPoints[h].pointType;
        HintenRight = theItems[i].textPathObject.pathPoints[h].rightDirection;

        theItems[i].textPathObject.pathPoints[h].anchor = theItems[i].textPathObject.pathPoints[k].anchor;
        theItems[i].textPathObject.pathPoints[h].leftDirection = theItems[i].textPathObject.pathPoints[k].rightDirection;
        theItems[i].textPathObject.pathPoints[h].pointType = theItems[i].textPathObject.pathPoints[k].pointType;
        theItems[i].textPathObject.pathPoints[h].rightDirection = theItems[i].textPathObject.pathPoints[k].leftDirection;
        theItems[i].textPathObject.pathPoints[k].anchor = HintenAnchor;
        theItems[i].textPathObject.pathPoints[k].leftDirection = HintenRight;
        theItems[i].textPathObject.pathPoints[k].pointType = HintenType;
        theItems[i].textPathObject.pathPoints[k].rightDirection = HintenLeft;
      }
    }
  }
}
