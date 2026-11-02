/* function validate() will validate form data using jQuery and pop-up modal window */
function validate() {
	var sid = $("#sid").val();
	var pwd1 = $("#pwd1").val();
	var pwd2 = $("#pwd2").val();
	var uname = $("#uname").val();
	var genm = $("#genm").prop("checked");
	var genf = $("#genf").prop("checked");

	var errMsg = "";								/* create variable to store the error message */
	var result = true;								/* assumes no errors */
	var pattern = /^[a-zA-Z ]+$/;					/* regular expression for letters and spaces only */

	/* Rule 1, check if all required data are entered */
	if (sid == "") {
		errMsg += "<li>User ID cannot be empty.</li>";
	}
	if (pwd1 == "") {
		errMsg += "<li>Password cannot be empty.</li>";
	}
	if (pwd2 == "") {
		errMsg += "<li>Retype password cannot be empty.</li>";
	}
	if (uname == "") {
		errMsg += "<li>User name cannot be empty.</li>";
	}
	if ((!genm) && (!genf)) {
		errMsg += "<li>A gender must be selected.</li>";
	}
	
	/* Rule 2, check if the user ID contains an @ symbol */
	if (sid.indexOf('@') == 0) {
		errMsg += "<li>User ID cannot start with an @ symbol.</li>";
	}
	if (sid.indexOf('@') < 0) {
		errMsg += "<li>User ID must contain an @ symbol.</li>";
	}
	
	/* Rule 3, check if password and retype password are the same */
	if (pwd1 != pwd2) {
		errMsg += "<li>Passwords do not match.</li>";
	}
	
	/* Rule 4, check if user name contains only letters and spaces */
	if (!uname.match(pattern)) {
		errMsg += "<li>User name contains symbols.</li>";
	}

	/* Display error message pop-up window if any error(s) is/are detected */
	if (errMsg != "") {
		errMsg = "<div id='scrnOverlay'></div>"   //Create screen overlay
			+ "<section id='errWin' class='window'><ul>"
			+ errMsg
			+ "</ul><a href='#' id='errBtn' class='button'>Close</a></section>";
		
		/* Count the number of error, and store the value  */
		var numOfItems = ((errMsg.match(/<li>/g)).length) + 6;

		/* add error message HTML immediately after the body element */
		$("body").after(errMsg);
		/* make the screen overlay visible */
		$("#scrnOverlay").css('visibility', 'visible');
		/* adjust the window height and center accordingly */
		$("#errWin").css('height', numOfItems.toString() + 'em');
		$("#errWin").css('margin-top', (numOfItems / -2).toString() + 'em');
		$("#errWin").show();
		
		$("#errBtn").click(function () {
			$("#scrnOverlay").remove();
			$("#errWin").remove();
		});

		result = false;
	} 
	return result;
}

/* Toggle function to collapse/expand sections */
function toggle() {
	$(this).parent().next().slideToggle();
	if ($(this).html() == "[-]") {
		$(this).html("[+]");
	} else {
		$(this).html("[-]");
	}
}

/* link HTML elements to corresponding event functions */
function init() {
	$(".collapse").click(toggle);                  /* link collapse/expand to buttons */
	$("#regform").submit(validate);                /* link function validate() to form submit event */
}

/* execute function init() once the document is ready */
$(document).ready(init);