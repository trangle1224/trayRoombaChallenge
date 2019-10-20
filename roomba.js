



getFunc();

function getFunc(input) {
  

	var fs = require('fs');
	var lineOfText = fs.readFileSync('input.txt').toString().split("\n");
	//console.log(lineOfText[0]);


	var roomdim = lineOfText[0].split(" "); //first lineOfText is room dimensions
	var width = parseInt(roomdim[0]);
	var height = parseInt(roomdim[1]);


	var startcoord = lineOfText[1].split(" "); //second lineOfText is start coordinates
	var currx = parseInt(startcoord[0]); //current x and y at starting coordinates
	var curry = parseInt(startcoord[1]);


	var numPatches = lineOfText.length - 3; //-3 because 1st, 2nd, and last line aren't patch coords

	var patchMap = new Map(); //create Map of Patch coordinates

	var i;
	for(i=0;i<numPatches;i++){ //loop through patches and add to patchMap
		patchMap.set(JSON.stringify(lineOfText[i+2].split(" ")),i);
	}


	var numMoves = lineOfText[lineOfText.length-1].length; //Number of moves roomba makes
	var movesList = lineOfText[lineOfText.length-1];

	var patchesCleaned = 0;
	var j;

	//check if initial position has patch
		var temp = JSON.stringify([currx.toString(),curry.toString()]);
		if(patchMap.has(temp)){ //if there is a patch at the current location
			patchesCleaned++; 
			patchMap.delete(temp); // delete patch from map if already cleaned
		}

	for(j=0;j<numMoves;j++){
		
		if(movesList[j]=='N' && curry+1<height){ //move roomba if within wall boundaries
			curry=curry+1;
		}
		if(movesList[j]=='E' && currx+1<width){
			currx=currx+1;
		}
		if(movesList[j]=='S' && curry-1>=0){
			curry=curry-1;
		}
		if(movesList[j]=='W' && currx-1>=0){
			currx=currx-1;
		}

		var temp = JSON.stringify([currx.toString(),curry.toString()]);
		if(patchMap.has(temp)){ //if there is a patch at the current location
			patchesCleaned++; 
			patchMap.delete(temp); // delete patch from map if already cleaned
		}

	}



	console.log(width + ' ' + height);
	//console.log(numPatches);
	//console.log(patchMap);
	//console.log(numMoves);
	//console.log(movesList);

	console.log(currx + ' ' + curry); //First Answer Line
	console.log(patchesCleaned); // Second Answer Line



}
