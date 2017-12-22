// collapsing chat event handlers

function collapseFooter() {
	//collapses!
  $("body").attr("class","bodyCollapsed");
  $(".footer2").attr("class","footer footer2 footerCollapsed");
  $("#chat").collapse("hide");

}
function showFooter() {
  $("body").removeAttr("class");
  $(".footer2").attr("class","footer footer2");
  $("#chat").collapse("show");
  setTimeout(function(){ $("#chat").scrollTop($("#chat")[0].scrollHeight); }, 380);
}

function chat() {
	event.preventDefault();
	showFooter();
	if(($("#chatText").val()).trim() != "") {
		//code here for adding name of user

		var p = $("<p>");
		p.text($("#chatText").val());
        $("#chat").append(p);
        //code here to send out to firebase
	}
	$("#chatText").val("");

	$("#chat").scrollTop($("#chat")[0].scrollHeight);
}

// Triggers for uncollapsing: hover over chat; new text added to chat
// Triggers for collapsing again: after 5 seconds, it collapses if not hovering

// $(".footer").mouseenter( showFooter()).mouseleave( collapseFooter() );


$("#chat").bind("DOMSubtreeModified", function() {
  showFooter();
    setTimeout(function() {
    	collapseFooter();
    }, 5000);
});

$("body").on("click", "#chatEnter", function() {
	chat();
});


$( ".footer" ).hover(
  function() {
    showFooter();
  }, function() {
    collapseFooter();
  }
);

