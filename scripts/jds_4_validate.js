/*
 Name: Justin Smith
   Course: ITSE 2402
   Date: 4/4/2019
   Date updated: 4/9/2019
   Lab # 4 - Validation Scripts
   Description: JavaScript Form Validation Script
   Filename: jds_4_validate.js
*/
/*GLOBAL VARIABLES*/
var valid_form=true;	//will track valid form completion
var form_elements=document.querySelector("form").elements;		//reference for all elements in form 
var alertBox=document.createElement("div");		 //create a new div fragment
var myForm=document.querySelector("form");		// reference the form element
var myFieldSet=document.querySelector("fieldset"); 	//reference fieldset element

//boolean global variables
var myState;
var myZip;
var myPhone;
var myEmail;
var bike_type;
var myCC;
var radio_CC;

function myAlert(msg){		//this function will create a new document fragment and add it to the DOM (will indicate an incomplete field)	
	alertBox.textContent=msg;			//modify content of new document fragment
	alertBox.id="alertBox";			//define a DOM id for the new alertBox... used in CSS for styles 	
	myForm.insertBefore(alertBox, myFieldSet);		//add new created div fragment in front of first fieldset element (so now the div is the first child of the form)
	window.scrollTo(0,0);	
}	//end myAlert

function removeAlert(){
	alertBox.style.display="none";
}


function validateEmail(emailString){			
	var validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;	       
    
	if ((validEmail.test(emailString))) {
		return true;				
    }	
	else{
		return false;
	}
}	//end validateEmail

function validatePhone(phoneString){			
	var validPhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;	       
    
	if ((validPhone.test(phoneString))) {
		return true;				
    }	
	else{
		return false;
	}
}	//end validatePhone

function validateForm(){		
	try	{
		for (var i = 0; i < form_elements.length; i++){	
			if (form_elements[i].required){
				if(form_elements[i].name==="zip"){
					if(form_elements[i].value.length!==5 || (isNaN(form_elements[i].value))){
						form_elements[i].style.border="2px solid #DCAE1D";
						myZip=false;
						form_elements[i].focus();				
					}//end if
					else if (form_elements[i].value.length==5 && !(isNaN(form_elements[i].value))){
						form_elements[i].style.border="";
						myZip=true;
					}
				}//end if
				if(form_elements[i].name==="phone"){		//if the element name is phone, then validate it
					var valid_phone=validatePhone(form_elements[i].value);		//pass string entered in DOM phone field, to validation function
					if (!valid_phone){
						myPhone=false;
						form_elements[i].style.border="2px solid #DCAE1D";
						form_elements[i].focus();									
					} else if (valid_phone){
						myPhone=true;
						form_elements[i].style.border="";
					}
				}//end if				
				if(form_elements[i].name==="email"){		//if the element name is email, then validate it
					var valid_email=validateEmail(form_elements[i].value);		//pass string entered in DOM email field, to validation function
					if (!valid_email){
						myEmail=false;
						form_elements[i].style.border="2px solid #DCAE1D";form_elements[i].focus();									
					} else if (valid_email){
						myEmail=true;
						form_elements[i].style.border="";
					}
				}//end if
								
				if(form_elements[i].name==="card_number"){
					if(form_elements[i].value.length!==16 || (isNaN(form_elements[i].value))){
						form_elements[i].style.border="2px solid #DCAE1D";
						myCC=false;	
						form_elements[i].focus();						
					}//end if
					else if (form_elements[i].value.length==16 && !(isNaN(form_elements[i].value))){
						form_elements[i].style.border="";
						myCC=true;
					}
				}//end if
				
				if(form_elements[i].name==="state-select"){
					if((form_elements[i].value=="-1")) {						
						form_elements[i].style.border="2px solid #DCAE1D";
						myState=false;
						form_elements[i].focus();
					}//end if
					else if (!(form_elements[i].value=="-1")){
						myState=true;
						form_elements[i].style.border="";
					}
				}//end if
				
				if(form_elements[i].name==="bikeType-select"){
					if((form_elements[i].value=="-1")) {						
						form_elements[i].style.border="2px solid #DCAE1D";
						bike_type=false;
						form_elements[i].focus();
					}//end if
					else if (!(form_elements[i].value=="-1")){
						bike_type=true;
						form_elements[i].style.border="";
					}
				}//end if
			}//end if required	
			if (form_elements[i].value==="" && form_elements[i].required){
				form_elements[i].style.border="2px solid #DCAE1D";
				valid_form=false;
				form_elements[i].focus();
			}//end if
			else if (form_elements[i].value!=="" && form_elements[i].required){
				valid_form=true;
				form_elements[i].style.border="";
			}//end else
		}//end for
		
		//validate the radio buttons with this for loop
		var radio=document.getElementsByName("payment_type");
			for (var i=0; i<radio.length;i++){
				if(radio[i].checked){
					radio_CC=true;
				}
			}
			
		if (!valid_form){
			throw "Please fill in the required fields";
		}
		if(!myZip){
			throw "Please enter a 5 digit zip code";
		}
		if(!myPhone){
			throw 'Please enter a phone number with the format (866) 740-4531';
		}
		if(!myEmail){
			throw 'Please enter an email address with the format "name@domain.com"';
		}
		if(!myCC){
			throw 'Please enter a valid 16-digit credit card number';
		}
		if (!radio_CC){
			throw 'Please select a credit card type'
		}
		if (!myState){
			throw 'Please select a state option'
		}
		if (!bike_type){
			throw 'Please select a bike type option'
		}
		
	} //end try 
	catch(errorMessage){	// catch error message 
		myAlert(errorMessage);
		return false;
	}//end catch

	if(valid_form && myState && myZip && myPhone && myEmail && bike_type && myCC && radio_CC && myState ){
		myAlert("Thank you for your purchase! We will begin processing your order immediately.");
		return true;
		form.sendBtn.disabled=true; 
	}	
}//end validateForm	

//function to reset the form
function resetForm(){	
	for (var i = 0; i < form_elements.length; i++){		
		if (form_elements[i].type==="text"){				//if a text type
			form_elements[i].value="";					
			form_elements[i].style.border="";
		}//end if
		else if (form_elements[i].type==="textarea"){		//if a textarea type
			form_elements[i].value="";
			form_elements[i].style.border="";
		}//end if
		else if (form_elements[i].type==="checkbox"|| form_elements[i].type==="radio"){		//if a radio or checkbox 
			form_elements[i].checked=false;	
			form_elements[i].style.border="";			
		}//end if
	}//end for loop	
	removeAlert();
}//end resetForm

function copy_info(){
	if (form_elements[14].checked){		
		form_elements[15].value=form_elements[1].value;
		form_elements[16].value=form_elements[2].value;
		form_elements[17].value=form_elements[3].value;
		form_elements[18].value=form_elements[4].value;
		form_elements[19].selectedIndex=form_elements[5].selectedIndex;
		form_elements[20].value=form_elements[6].value;
	}
	else {
		form_elements[14].value="";
		form_elements[15].value="";
		form_elements[16].value="";
		form_elements[17].value="";
		form_elements[18].value="";
		form_elements[19].selectedIndex=-1;
		form_elements[20].value="";
	}
} //end copy_info


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
	
	var same_shipping=document.getElementById("same_as_shipping");
	if(same_shipping.addEventListener){
		same_shipping.addEventListener('change', copy_info, false);
	}
}//end createEventListeners

/* create event listeners when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}//end addEventListener
		
		
		
		
		
		
		
		
		