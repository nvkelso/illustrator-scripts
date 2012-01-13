//////////////////////////////////////////////////////////// english //
// ------------------------
// -=> WR-closeAllPaths <=-
// ------------------------
//
// A Javascript for Adobe Illustrator
// by Wolfgang Reszel (ai-js@rumborak.de)
// bugfixed by Vladimir Kapustin
//
// Version 0.4 from 20.7.2005
//
// This script closes all (or all selected) open paths. It does not
// conncet touching paths, what's possible with the pathfinder-
// function "divide".
//
// To enable the english messages and change the "de" into "en" in line 44.
//
// Sorry for my bad english. For any corrections send an email to:
// ai-js@rumborak.de
//
//////////////////////////////////////////////////////////// Deutsch //
// ------------------------
// -=> WR-closeAllPaths <=-
// ------------------------
//
// Ein Javascript fuer Adobe Illustrator
// von Wolfgang Reszel (ai-js@rumborak.de)
// bugfixed by Vladimir Kapustin
//
// Version 0.4 vom 20.7.2005
//
// Das Skript ermoeglicht es, mehrere offen Pfade auf einmal zu
// schliessen. Es verbindet allerdings keine aneinanderhaengenden Pfade,
// das geht mit dem Pathfinder-Befehl "Flaechen aufteilen".
//
// Um dieses Skript mit deutschen Meldungen zu versehen, muss in Zeile
// 44 das "en" durch ein "de" ersetzt werden.
//
// Verbesserungsvorschlaege an: ai-js@rumborak.de
//

//$.bp();

// -------------------------------------------------------------------

var language="en";        // "de" fuer Deutsch
var warning_limit = 400;
var closeUnfilledPaths=false; // 'true' = Ungefüllte Pfade werden ebenfalls geschlossen.
                              // Set it to 'true' if you want to close all paths whether they are filled or not.

// -------------------------------------------------------------------

var WR="WR-closePaths v0.4\n\n";

if (language == "de") {

  var MSG_asksel = WR+"Willst du alle ausgew\xE4hlten offenen Pfadobjekte schlie\xDFen?";
  var MSG_ask = WR+"Willst du alle offenen Pfadobjekte im Dokument schlie\xDFen?";
  var MSG_allclosed = WR+"Es gibt keine offenen Pfadobjekte im Dokument.";
  var MSG_allselclosed = WR+"Die Auswahl enth\xE4lt keine offenen Pfadobjekte.";
  var MSG_nopath = WR+"Du hast kein Pfadobjekt ausgew\xE4hlt.";
  var MSG_nodocs = WR+"Kein Dokument ge\xF6ffnet.";
  var MSG_warning = WR+"Das Dokument wird auf offene Pfadobjekte untersucht ...";
  var MSG_status = WR+"Geschlossene Pfadobjekte: ";

} else {

  var MSG_asksel = WR+"Close all selected open path-items?";
  var MSG_ask = WR+"Close all open path-items in this document.";
  var MSG_allclosed = WR+"There are no open path-items in this document.";
  var MSG_allselclosed = WR+"The selection does not contain any open path-item.";
  var MSG_nopath = WR+"You have not selected any path-item.";
  var MSG_nodocs = WR+"You have no open document."
  var MSG_warning = WR+"The document will be analyzed for open path-items ...";
  var MSG_status = WR+"Closed path-items: ";

}

var error=0;
var proccessedItems = 0;
var selCount=0;
var onlySelection = false;
var locked = false;
var allPaths;
var pathsToProcess=[]; // open paths collected for processing
var pathsInSelection=0; // number of paths in document/selection

function collectPaths(){
	if (onlySelection) collectPathsInSelection();
	else collectPathsInDocument();
}

function collectPathsInSelection(){
	allPaths = activeDocument.selection;
	checkTotalAmount();
	collectOpenPaths(allPaths);
	if(pathsToProcess.length < 1){
		if(pathsInSelection > 0) alert(MSG_allselclosed);
		else alert(MSG_nopath);
	}
}

function collectPathsInDocument(){
	allPaths = activeDocument.pathItems;
	checkTotalAmount();
	collectOpenPaths(allPaths);
	if(pathsToProcess.length < 1){
		if(pathsInSelection > 0) alert(MSG_allclosed);
		else alert(MSG_nopath);
	}
}

function checkTotalAmount(){
	if (allPaths.length > warning_limit) alert (MSG_warning+ " ("+allPaths.length+")");
}

function collectOpenPaths(paths){
	for (var i = 0; i < paths.length; i++){
		var p = paths[i];
		switch (p.typename){
		case "PathItem":
			if((openPath(p))&&(notGuide(p))&&(notSimpleLine(p))&&(filledPath(p))&&(editablePath(p))){ //we do not process closed paths, guides, simple lines, open paths with no fill
				selCount++;
				pathsToProcess.push(p);
			}
			pathsInSelection++;
			break;
		case "CompoundPathItem":
			collectOpenPaths(p.pathItems);
			break;
		case "GroupItem":
			if(p.groupItems.length>0)collectOpenPaths(p.groupItems);
			if(p.pathItems.length>0)collectOpenPaths(p.pathItems);
			if(p.compoundPathItems.length>0)collectOpenPaths(p.compoundPathItems);
			break;
		}
	}
}

function openPath(p){
	return !p.closed;
}

function notSimpleLine(p){
	return p.pathPoints.length>2;
}

function notGuide(p){
	return !p.guides;
}

function filledPath(p){// exclude paths that could be art: unfilled open paths that are not clipping masks
	if(closeUnfilledPaths) return true; // ignore the 'filled' property if the user set the flag (see above).
	if(StartAndEndPointsCoinside(p)) return true //but first check whether the start and end point overlap or not, if they do - we will close this path anyway.
	return !((p.filled==false)&&(p.clipping==false));
}

function editablePath(p){//[TODO]check parents till layer
	if(p.typename=="Layer") return locked;
	else{}
	return !(p.locked||p.hidden);
}

function closePaths(confirmed){
	if(confirmed){
		close(pathsToProcess);
		if (proccessedItems != pathsToProcess.length){
			alert(MSG_status+proccessedItems+"/"+pathsToProcess.length);
		}else{
			alert(MSG_status+proccessedItems);
		}
	}
}

function close(thePaths){
	for (var i = 0; i < thePaths.length; i++) {
		var p = thePaths[i];
		if (StartAndEndPointsCoinside(p)){
			joinCoinsidedPoints(p);
		}else{
			try{
				p.closed=true;
				proccessedItems++;
			}catch(e){}
		}
	}
}

function StartAndEndPointsCoinside(path){
	var points = path.pathPoints;
	var firstPoint = points[0];
	var lastPoint = points[points.length-1];
	return (firstPoint.anchor[0] == lastPoint.anchor[0]) && (firstPoint.anchor[1] == lastPoint.anchor[1]);
}

function joinCoinsidedPoints(path){ // called when the start point coinsides with the end one, coz a simple setting 'closed' to 'true' creates cricical artefacts.
	var points = path.pathPoints;
	var lastPoint = points[points.length-1];
	var firstPoint = points[0];
	var LP_LD=lastPoint.leftDirection;
	try{
		path.closed=true;
		lastPoint.remove();
		firstPoint.leftDirection=LP_LD;
		proccessedItems++;
	}catch(e){}
}

function confirmClosure(){
	if (onlySelection) return confirm(MSG_asksel + " ("+pathsToProcess.length+")");
	else return confirm(MSG_ask + " ("+pathsToProcess.length+")" );
}

//-------- MAIN ----------//
if(documents.length<1){
	alert(MSG_nodocs);
}else{
	onlySelection=activeDocument.selection.length > 0; //  Set flag to work in selection or in whole document
	collectPaths(); // Count all open paths in document/selection and put them in array 'pathsToProcess'.
	if(pathsToProcess.length > 0) closePaths(confirmClosure());
}
