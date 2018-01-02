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

//create refererence to images child
var imagesRef = storageRef.child('images');

//upload file from file type input
function uploadFile(file){
	console.log("in uploadFile from fileStorage.js");
	var currentImageRef = imagesRef.child(file.name);
	currentImageRef.put(file);
}

//upload canvas as blob to 
function uploadImage(canvas, id){
	console.log("uploadImage");
	canvas.toBlob(function (blob) { var currentImageRef = imagesRef.child(id); currentImageRef.put(blob); })
}


//add file from html file input
function handleFileUpload(event){

	event.stopPropagation();
	event.preventDefault();
	var file = evt.target.files[0];

	var metadata = {
		'contentType': file.type
	};

	imagesRef.child(file.name).put(file, metadata);
}

//nonfunctional. will return canvas or add it directly to page
function getImageCanvas(imageID){
	imagesRef.child(imageID).getDownloadURL().then(function(url){
		//insert code to instantiate new canvas and add to page display
		var context = canvas.getContext('2d');
		var imageOBJ = new Image();
		imageObj = new Image();
		imageObj.onload = function() {
			context.drawImage(this,0,0);
		};
		imageObj.src = imageID;
	}).catch(function(error){
		console.log("firebase errors");
	});
}

window.onload = function() {
	document.getElementById('file').addEventListener('change', handleFileUpload);
}

