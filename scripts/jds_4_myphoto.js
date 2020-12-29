/*
 Name: Justin Smith
   Course: ITSE 2402
   Date: 3/29/2019
   Date updated: 3/29/2019
   Lab #: Lab4 - Photo Gallery
   Description: Scripts that cycles photos
   Filename: jds_4_myphoto.js
*/

var photoArray=document.querySelectorAll("figure img");


function startPhoto(){
	photoArray[0].style.display="block"
	setInterval(changePhoto,3000); 		//call change photo every 3 seconds
}


function changePhoto (){		//this function will determine which image is displayed, and then cycle to the next image 
	var valid=true;		//this will prevent first image from disappearing after first loop completes
	
	if(photoArray[4].style.display==="block"){		//so if image 5 is displayed, then hide it and redisplay the first image	
		photoArray[4].style.display="";
		photoArray[0].style.display="block";
		valid=false;			//changing to false prevents the last if from executing and 'skipping' first image 
	}
	if(photoArray[3].style.display==="block"){		//so if image 4 is displayed, then hide it and display the 5th image 
		photoArray[3].style.display="";
		photoArray[4].style.display="block";	
	}
	if(photoArray[2].style.display==="block"){
		photoArray[2].style.display="";
		photoArray[3].style.display="block";	
	}
	if(photoArray[1].style.display==="block"){
		photoArray[1].style.display="";
		photoArray[2].style.display="block";	
	}
	if(photoArray[0].style.display==="block" &&	valid){
		photoArray[0].style.display="";
		photoArray[1].style.display="block";	
	}
}


function zoom(){
	this.style.maxWidth="100";
}

/* create event listeners for all input elements */
function createEventListeners() {	
	startPhoto();	
	
	var activePhoto=document.getElementById("gallery");
	if (activePhoto.addEventListener){
		activePhoto.addEventListener("mouseover", zoom, false);
	}
}//end createEventListeners

/* create event listeners when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}//end addEventListener