//backend file storage. Not currently tested/working

// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyCqW_av0XGX8OP-LQUWL2BweGy1HpxS2L8",
//   authDomain: "shiftshare-3be77.firebaseapp.com",
//   databaseURL: "https://shiftshare-3be77.firebaseio.com",
//   projectId: "shiftshare-3be77",
//   storageBucket: "shiftshare-3be77.appspot.com",
//   messagingSenderId: "732473847830"
// };
// firebase.initializeApp(config);

//creates storage references to firebase
var storage = firebase.storage();
var storageRef = storage.ref();
console.log("in storage.js");
//create refererence to images child
var imagesRef = storageRef.child('images');

var imageNames = [];
var imageNum = 0;

database.ref().on("value", function(snapshot){
	if(snapshot.val()===null){}
  else{
  	imageNames = snapshot.val().imgNames;
  	imageNum = snapshot.val().imageNum;
  }
});
//upload file from file type input
function uploadFile(file){
	console.log("in uploadFile from fileStorage.js");
	var currentImageRef = imagesRef.child(file.name);
	currentImageRef.put(file);
}

//upload canvas as blob to 
function uploadImage(id){
	console.log("uploadImage");
	document.getElementById(id).toBlob(function (blob) { 
		console.log(blob); 
		var currentImageRef = imagesRef.child(id); 
		currentImageRef.put(blob); });
	// var dataUrl = document.getElementById(id).toDataURL();
	// var currentImageRef = imagesRef.child(id);
	// currentImageRef.putString(dataUrl, 'data_url');

	imageNames.push(id);
	imageNum++;
	database.ref().set({
		imgNames: imageNames,
		imageNum: imageNum
	});
}


//add file from html file input
// function handleFileUpload(event){

// 	event.stopPropagation();
// 	event.preventDefault();
// 	var file = event.target.files[0];

// 	var metadata = {
// 		'contentType': file.type
// 	};

// 	imagesRef.child(file.name).put(file, metadata);
// }

//nonfunctional. will return canvas or add it directly to page
function getImageCanvas(imageID){
	console.log("infunction");
	console.log(storageRef);
	console.log(imagesRef);


// 	var test = storageRef.child('images/face_1.png');
// 	test.getDownloadURL().then(function(url) {
//   // `url` is the download URL for 'images/stars.jpg'

//   // This can be downloaded directly:
//   var xhr = new XMLHttpRequest();
//   xhr.responseType = 'blob';
//   xhr.onload = function(event) {
//     var blob = xhr.response;
//     console.log(blob);
//   };
//   xhr.open('GET', url);
//   xhr.send();
// }).catch(function(error) {
// 	console.log(error);
// });

	imagesRef.child(imageID).getDownloadURL().then(function(url){
		//insert code to instantiate new canvas and add to page display
		var temp = $("<canvas>");
		temp.attr("class", "face");
		temp.attr("id", "face_test");
		$("body").append(temp);
		var canvas = document.getElementById("face_test");
		console.log(url);
		var context = canvas.getContext('2d');
		var imageObj = new Image();
		imageObj.onload = function() {
			console.log("in onload");
			context.drawImage(this,0,0);
		};
		imageObj.src = url;
	}).catch(function(error){
		console.log("firebase errors");
		console.log(error);
	});
}

// window.onload = function() {
// 	document.getElementById('file').addEventListener('change', handleFileUpload);
// }


//var database has already been declared

