/*
 Name: Justin Smith
   Course: ITSE 2402
   Date: 4/5/2019
   Date updated: 4/12/2019
   Lab #4 - Validation Scripts for Sign In
   Description: Scripts File that will generate 5 random numbers for sign in validation
   Filename: jds_4_secure_login.js
*/
var images=document.querySelectorAll("#security_img_div img");	//array to hold all 5 images
var security_key=new Array();
function rndNumber(num) {	//generate a random number
   return Math.floor((num+1)*Math.random());
} //end rndNumber

function showImg() {  	//display the images with a loop
	for(var i=0; i<5; i++){
		var imgNumber = rndNumber(9); // Return a random number from 0 to 9
		images[i].src="images/"+imgNumber+".jpg";
		security_key+=imgNumber;
	} //end for     
}//end showImg

/*GLOBAL VARIABLES*/
var valid_form=true;	//will track valid form completion
var form_elements=document.querySelector("form").elements;		//reference for all elements in form 
var alertBox=document.createElement("div");		 //create a new div fragment
var myForm=document.querySelector("form");		// reference the form element
var myFieldSet=document.querySelector("fieldset"); 	//reference fieldset element


function myAlert(msg){		//this function will create a new document fragment and add it to the DOM (will indicate an incomplete field)	
	alertBox.textContent=msg;			//modify content of new document fragment
	alertBox.id="alertBox";			//define a DOM id for the new alertBox... used in CSS for styles 	
	myForm.insertBefore(alertBox, myFieldSet);		//add new created div fragment in front of first fieldset element (so now the div is the first child of the form)
	window.scrollTo(0,0);	
}	//end myAlert

function validateForm(){
	var valid_name;
	var valid_password;
	var valid_security;
	
	try{
		for (var i = 0; i < form_elements.length; i++){	
			if(form_elements[i].name==="user_name"){
				if(form_elements[i].value===""){
					valid_name=false;
					form_elements[i].style.border="2px solid #DCAE1D";
				}
				else if (form_elements[i].value!==""){
					valid_name=true;
					form_elements[i].style.border="";
				}			
			}	
			
			if(form_elements[i].name==="password"){
				if(form_elements[i].value===""){
					valid_password=false;
					form_elements[i].style.border="2px solid #DCAE1D";
				}
				else if (form_elements[i].value!==""){
					valid_password=true;
					form_elements[i].style.border="";
				}			
			}
			if(form_elements[i].name==="security"){
				if(form_elements[i].value===""){
					valid_security=false;
					form_elements[i].style.border="2px solid #DCAE1D";
				}
				else if (form_elements[i].value!==security_key){
					valid_security=false;
					form_elements[i].style.border="2px solid #DCAE1D";
				}
				else if (form_elements[i].value===security_key){
					valid_security=true;
					form_elements[i].style.border="";
				}
			}
			
		}//end for loop
		
		if(!valid_name){
			throw 'Enter a valid username';
		}
		if(!valid_password){
			throw 'Enter a valid password';
		}
		if(!valid_security){
			throw 'Please enter the security key as seen on screen';
		}
	}//end try
	
	catch(errorMessage){	// catch error message 
		myAlert(errorMessage);
		return false;
	}//end catch
	
	if(valid_name && valid_password && valid_security){
		myAlert("Sign in successful");
		return true;
		form.sendBtn.disabled=true; 
	}
}//end validateForm





/* create event listeners for all input elements */
function createEventListeners() {	
	showImg();
	
	var login_button=document.getElementById("login");		
	if (login_button.addEventListener) {			/* when send button is clicked*/
		login_button.addEventListener("click", validateForm, false);
	}else if (login_button.attachEvent) {
		login_button.attachEvent("onclick", validateForm);
	}

	
	
}//end createEventListeners

/* create event listeners when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}//end addEventListener

