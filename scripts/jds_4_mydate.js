/*
 Name: Justin Smith
   Course: ITSE 2402
   Date: 4/2/19
   Date updated: 4/12/19
   Lab #: 4
   Description: file will import the current date and populate the date of order field on the form
   Filename: jds_4_mydate.js
*/



function getDate(){
	var myDate=new Date();/*new instance of JavaScript Date object*/
	var orderDate=document.getElementById("order_date");
	var curr_date= (myDate.getMonth()+1) + "/" + myDate.getDate() + "/" + myDate.getFullYear();
	orderDate.value=curr_date.toString();
	
}//end getDate

/* create event listeners when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", getDate, false);
} else if (window.attachEvent) {
   window.attachEvent("onload",getDate);
}//end addEventListener