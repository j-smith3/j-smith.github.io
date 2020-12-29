/*
 Name: Justin Smith
   Course: ITSE 2402
   Date: 3/6/2019
   Date updated: 3/28/2019
   Lab #: Lab 3 - Navigation Effects
   Description: Scripts for navigation effects
   Filename: jds_3_mynav.js
*/
/*global array that contains hiddenNav class elements*/
var hiddenNav=document.getElementsByClassName("hiddenNav");
var hiddenNav2=document.getElementsByClassName("hiddenNav2");

function toggleDropDown(){	//this toggles the display for the hidden navigation items 
	
	for (var i=0;i<hiddenNav.length;i++){
		
		if (hiddenNav[i].style.display==="block"){			
			hiddenNav[i].style.display="none";
		}
		else{
			hiddenNav[i].style.display="block";
			hiddenNav[i].focus();
		}		 		
	}		
}		//end toggleDropDown

function toggleDropDown2(){	//this toggles the display for the second hidden navigation items 
	
	for (var i=0;i<hiddenNav2.length;i++){
		
		if (hiddenNav2[i].style.display==="block"){			
			hiddenNav2[i].style.display="none";
		}
		else{
			hiddenNav2[i].style.display="block";
			hiddenNav2[i].focus();
		}		 		
	}		
}		//end toggleDropDown2
	

/* create event listeners for all input elements */
function createEventListeners() {		
	var tips=document.getElementById("tips");
	if (tips.addEventListener) {			//listen for mouseover of #tips in DOM (tips is the link for buying tips)
		tips.addEventListener("click", toggleDropDown , false);
	}	
	
	var bike_clubs=document.getElementById("bike_clubs");
	if (bike_clubs.addEventListener) {			//listen for mouseover of #tips in DOM (tips is the link for buying tips)
		bike_clubs.addEventListener("click", toggleDropDown2 , false);
	}	
}//end createEventListeners

/* create event listeners when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
}//end addEventListener


