/*
 Name: Justin Smith
   Course: ITSE 2402
   Date: 3/6/2019
   Date updated: 3/19/2019
   Lab #: Lab 3 - Validation Scripts
   Description: Scripts File for Chades Bicycle Company
   Filename: jds_3_myscript.js
*/
var invalidEmail=false;		//boolean that indicates if email field is in invalid format
var invalidMonth=false;
var invalidZip=false;

/* global variables referencing text input elements */
var fName=document.forms["custForm"]["firstname"];
var lName=document.forms["custForm"]["lastname"];
var myAddress=document.forms["custForm"]["address"];
var myCity=document.forms["custForm"]["city"];
var myState=document.forms["custForm"]["state"];
var myZip=document.forms["custForm"]["zip"];
var myEmail=document.forms["custForm"]["email"];
var myMonths=document.forms["custForm"]["ridingMonths"];

var alertBox=document.createElement("div");		 //create a new div fragment
var myForm=document.querySelector("form");		// reference the form element
var myFieldSet=document.querySelector("fieldset"); 	//reference fieldset element
var elem=document.getElementById("custForm").elements;		//reference for all elements in form 
	
	
function myAlert(msg){		//this function will create a new document fragment and add it to the DOM (will indicate an incomplete field)
	
	alertBox.textContent=msg;			//modify layout of new document fragment
	alertBox.id="alertBox";			//define a DOM id for the new alertBox... used in CSS for styles 	
	myForm.insertBefore(alertBox, myFieldSet);		//add new created div fragment in front of first fieldset element (so now the div is the first child of the form)
	window.scrollTo(0,0);
}	//end myAlert

function removeAlert(){
	alertBox.style.display="none";
	//myForm.removeChild(alertBox);
}

	function validateEmail(emailString){			
		var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			invalidEmail=false;
		try{         
			 if (!(validEmail.test(emailString))) {
				invalidEmail=true;	//indicate that this is an invalidEmail entry..relates to validateForm().. so true it is invalid 
				 throw 'Please enter an email address with the format "name@domain.com"';
			 }
		}	//end try
		catch(msg){
			myAlert(msg);
		}	//end catch
	}	//end validate_email


//function to reset the form
function validateForm(){
	var valid=true;
	
	try	{
		for (var i = 0; i < elem.length; i++){		
			if (elem[i].type==="text" && elem[i].required){				//if a text type
				if (elem[i].value==="" && elem[i].name!=="email" && elem[i].name!=="zip"){
					valid=false;
					elem[i].style.border="2px solid #DCAE1D";
				}
				if (elem[i].name==="email"){		//if the element name is email (the email field),  then validate its format		
					validateEmail(elem[i].value);		
					if (invalidEmail){
						elem[i].style.border="2px solid #DCAE1D";//elem[i].style.backgroundColor="#CAE4DB";		
					} else if (!invalidEmail){
						elem[i].style.border="";
					}
				}	//end if
				if (elem[i].name==="zip" && (elem[i].name==="" || elem[i].value.length!==5 || isNaN(elem[i].value))){
					elem[i].style.border="2px solid #DCAE1D";
					invalidZip=true;
					throw "Please enter a 5 digit zip code";
				}
				if(elem[i].value!=="" && elem[i].required && elem[i].name!=="email"){
					elem[i].style.border="";
				}
			}	//end if			
		}	//end for	
		
		if (myMonths.value!=""){	// if content in months field, it must be 1-12
			if (myMonths.value<1 || myMonths.value>12){
				invalidMonth=true;	
				myMonths.style.border="2px solid red";				
				} else if (myMonths.value>1 || myMonths.value<12){
					invalidMonth=false;
					myMonths.style.border="";
				}//end else if		
		}//end if	
		
		if(!valid){
			throw "Please fill in the required fields";	//maybe change to a shape		
		}
		if(invalidMonth){
			
			throw "Please enter a number between 1-12 months";	
		}
		if (valid && !invalidEmail && !invalidMonth && !invalidZip){
			myAlert("Thank you for signing up for our newsletter!");
			return true;
			form.sendBtn.disabled=true;  
		}
		
				
	}//end try			
	catch(errorMessage){	// catch error message 
		myAlert(errorMessage);
		return false;
	}//end catch	  
}//end validateForm	

//function to reset the form
function resetForm(){	
	for (var i = 0; i < elem.length; i++){		
		if (elem[i].type==="text"){				//if a text type
			elem[i].value="";					
			elem[i].style.border="";
		}//end if
		else if (elem[i].type==="textarea"){		//if a textarea type
			elem[i].value="";
			elem[i].style.border="";
		}//end if
		else if (elem[i].type==="checkbox"|| elem[i].type==="radio"){		//if a radio or checkbox 
			elem[i].checked=false;	
			elem[i].style.border="";			
		}//end if
	}//end for loop	
	removeAlert();
}//end resetForm


/* create event listeners for all input elements */
function createEventListeners() {		
	var sendB=document.getElementById("sendBtn");		
	if (sendB.addEventListener) {			/* when send button is clicked*/
		sendB.addEventListener("click", validateForm, false);
	}else if (sendB.attachEvent) {
		sendB.attachEvent("onclick", validateForm);
	}
	
	var resetB=document.getElementById("resetBtn");
	if (resetB.addEventListener) {			/*when reset button is clicked*/
		resetB.addEventListener("click", resetForm, false);
	}else if (resetB.attachEvent) {
		resetB.attachEvent("onclick", resetForm);
	}
}//end createEventListeners

/* create event listeners when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}//end addEventListener

















