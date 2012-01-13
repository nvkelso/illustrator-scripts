/////////////////////////////////////////////////////////////////
//Join TextFrames v.1.2 -- CS,CS2
//>=--------------------------------------
// When Adobe came out with the new CS text engine,
// the text fields in documents saved in an older format were
// often broken into "sub" fields.
//
// This script is a rudimentary tool to help 
// rejoin the broken text fields.
//
// It collects text from any number of selected (non-grouped) textframes 
// and aggrigates them into a single text frame.
// the order is based on relative x,y coordinates.
//
// If a selected text anchors vertical coordinate is the same as the next one, 
// text areas are assumed to be on the same line.
//
// If a selected text anchors vertical coordinate is different, 
// the text areas are assumed to be sequential lines, 
//
//
// THIS script WILL NOT make any attempt to maintain visual integrety of 
// character placement. It will only join the fields for easier editing,
// but sometimes, just this little bit is a HUGE time saver.
//
//>=--------------------------------------
// JS code (c) copyright: John Wundes ( john@wundes.com ) www.wundes.com
//copyright full text here:  http://www.wundes.com/js4ai/copyright.txt
////////////////////////////////////////////////////////////////// 

mainSel = activeDocument.selection;
var groupFound = 0;
//join all ungrouped TextFrames.
sortAndJoin(mainSel);	




//-----------FUNCTIONS----------------

function sortAndJoin(sel){
	var slen = sel.length;
	if (slen >0)
	{

		textObjects = new Array();
		// OK, I'll give you ONE level of grouping for free...
		if(slen==1 && sel[0].typename == "GroupItem"){
			sel=sel[0].textFrames;
			slen = sel.length;
		}

		for (j=0;j<slen;j++ )
		{
			if(sel[j].typename == "TextFrame"){
				textObjects.push(sel[j]);
				//But if there are more groups selected, screw it...
			}else if(sel[j].typename == "GroupItem"){
				groupFound = 1;
			}
		}
		if (groupFound==1)
		{
			alert("Please ungroup selection first.");
		}else {
			var tlen = textObjects.length;
			//now sort the list
			if(tlen > 0){
				var tob=textObjects;

				sort(tob);

				var disp = "";
				for (j=0;j<tlen-1;j++)
				{
					if (tob[j].name == "left")
					{
						disp+=tob[j].contents+"";
					} else {
						disp+=tob[j].contents+"\r";
					}
				}
				try{
					disp+= tob[tlen-1].contents;
				}catch(e){
					//nothing here! 
					alert(sel+"\n"+e);
				}
				tob[0].contents = disp;
				//now kill all textfields...
				///*
				for (j=(tlen-1);j>0;j--)
				{
					tob[j].remove();
				}
				//*/
				
			}
		}
	}
	//alert("Text Objects:"+textObjects);
}

function copyText(a,b){
	//Copies text from a object to b object... 
	b.contents = a.contents;
} 
function addText(a,b){
	//Copies text from a object to b object... 
	b.contents += ("\n"+ a.contents);
}  
//anchor x,y
//position x,y
function isHiOrLeft(a,b){
	if(a.position[1]-a.height > b.position[1]-b.height){
		a.name = "hi";
		return true;
	} else if (a.position[1]-a.height == b.position[1]-b.height && a.position[0] < b.position[0]) {
		a.name = "left";
		return true;
	}
	return false;
}
function swapItems(arr,aNum,bNum){
	//Copies text from a object to b object... 
	tmp = arr[aNum];
	arr[aNum]= arr[bNum];
	arr[bNum]=tmp;
}  

function sort(objArr){
  var x, y, holder;
  // The Bubble Sort method.
	obLen = objArr.length;
  for(x = 0; x < obLen; x++) {
    for(y = 0; y < (obLen-1); y++) {
      if(isHiOrLeft(objArr[y+1],objArr[y])) {
        holder = objArr[y+1];
        objArr[y+1] =objArr[y];
        objArr[y] = holder;
      }
    }
  }


}