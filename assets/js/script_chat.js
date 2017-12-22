
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCqW_av0XGX8OP-LQUWL2BweGy1HpxS2L8",
  authDomain: "shiftshare-3be77.firebaseapp.com",
  databaseURL: "https://shiftshare-3be77.firebaseio.com",
  projectId: "shiftshare-3be77",
  storageBucket: "shiftshare-3be77.appspot.com",
  messagingSenderId: "732473847830"
};
firebase.initializeApp(config);
var database = firebase.database();
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
}

function chat() {
	event.preventDefault();
	showFooter();
	if(($("#chatText").val()).trim() != "") {
		//code here for adding name of user

		var p = $("<p>");
    var textInput = $("#chatText").val();
		p.text(textInput);
    // $("#chat").append(p);
    //code here to send out to firebase
    database.ref().set({
      chat: textInput
    });
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

database.ref().on("value", function(snapshot){
  if(snapshot.val() == null){
  }
  else{
    $("#chat").append("<p>"+snapshot.val().chat + "</p>");
  }
},function(error){
    console.log(error);
});

