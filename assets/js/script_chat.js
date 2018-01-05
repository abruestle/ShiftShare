
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
var currentUser = "Anonymous";
var textInput = "";
// collapsing chat event handlers

function collapseFooter() {
	//collapses!
  $("body").attr("class","bodyCollapsed");
  $(".footer2").attr("class","footer footer2 footerCollapsed");

}

function showFooter() {
  $("body").removeAttr("class");
  $(".footer2").attr("class","footer footer2");
  setTimeout(function(){ $("#chat").scrollTop($("#chat")[0].scrollHeight); }, 380);
}

function chat() {
	event.preventDefault();
	showFooter();
	if(($("#chatText").val()).trim() != "") {
		//code here for adding name of user

		var p = $("<p>");
    textInput = $("#chatText").val();
		// p.text(textInput);
    // $("#chat").append(p);
    //code here to send out to firebase
    database.ref().update({
      chat: textInput,
      user: currentUser,
    });
	}
	$("#chatText").val("");

	$("#chat").scrollTop($("#chat")[0].scrollHeight);
}

function setUser(user){
  currentUser = user;
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


$( "#chatFooterArea" ).hover(
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
    if("" !== snapshot.val().chat){
      $("#chat").append("<p class=\"chatName\">" + snapshot.val().user + "</p>");
      $("#chat").append("<p>"+snapshot.val().chat + "</p>");
      var temp = "";
      database.ref().update({
        chat: temp
      });
    }
  }
},function(error){
    console.log(error);
});

