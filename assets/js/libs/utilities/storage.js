var imageNum = 0;
var images = [];

database.ref().on("value", function(snapshot){
	if(snapshot.val()===null){}
  else{
  	if(snapshot.val().images !== undefined){
  		images = snapshot.val().images;
  		if(snapshot.val().imageNum !== undefined){
  			imageNum = snapshot.val().imageNum;
  		}
  		// console.log(image);
  		$(".carousel-inner").empty();
  		for(var i = 0; i < images.length; i++){
  			var div = document.createElement('div');
  			div.classList.add("carousel-item");
  			div.classList.add("col-md-3");
  			if(i === 0){
  				div.classList.add("active");
  			}
  			var divcard = document.createElement('div');
  			divcard.classList.add("card");
  			div.append(divcard);
  			divcard.innerHTML = images[i];
  			divcard.children[0].class = "gif";
  			// console.log(divcard.children[0].id);
  			var divLast = document.createElement('div');
  			divLast.classList.add("row");
  			divLast.classList.add("justify-content-center");
  			divcard.append(divLast);
  			divLast.innerHTML = "<div class=\"col-md-2\"><button type=\"button\" class=\"btn btn-primary btn-sm see\" value=\"'"+ divcard.children[0].id +"'\">See!</button></div><div class=\"col-md-2\">"+
					"<button type=\"button\" class=\"btn btn-primary btn-sm save\" value=\"'"+ divcard.children[0].id+"'\">Save!</button></div><div class=\"col text-right\" id=\"progressArea\"><div class=\"progress\">"+
					"<div class=\"progress-bar\" style=\"width:0%\"></div></div></div>";
  			console.log(div);
  			$(".carousel-inner").prepend(
  				//"<div class=\"carousel-item col-md-3 active\"><div class=\"card\">"+	image +
  			div
				// 	"<div class=\"row justify-content-center\">

				// <div class=\"col-md-2\"><button type=\"button\" class=\"btn btn-primary btn-sm see\" value=\"'"+ image.getAttribute("id") +"'\">See!</button></div><div class=\"col-md-2\">"+
				// 	"<button type=\"button\" class=\"btn btn-primary btn-sm save\" value=\"'"+image.getAttribute("id")+"'\">Save!</button></div><div class=\"col text-right\" id=\"progressArea\"><div class=\"progress\">"+
				// 	"<div class=\"progress-bar\" style=\"width:0%\"></div></div></div>
				//</div></div></div>"
				);
  		}
  	}
  }
}),

$(document).on("click", ".share", function(){
	console.log("share clicked");
	var id = this.getAttribute("value");
	var img = document.getElementById(id);
	var store = img.outerHTML;
	// console.log(store);
	// store = store.replace(/\\\//g, "/");
	// console.log(store);
	if(imageNum < 10){
		images.push(store);
		imageNum++;
	}else{
			images[imageNum%10] = store;
			imageNum++;
	}
	database.ref().update({
		images: images,
		imageNum: imageNum
	});
});

function uploadImage(id){
	console.log("uploadImage");
	var image = document.getElementById(id);
	var store = image.outerHTML;
	// console.log(store);
	// store = store.replace(/\\\//g, "/");
	// console.log(store);
	database.ref().update({
		image: store
	});
}

//upload canvas as blob to 
// function uploadImage(id){
// 	console.log("uploadImage");
// 	var image = document.getElementById(id);
// 	var url = 

// 	images.push(id);
// 	imageNum++;
// 	database.ref().set({
// 		imgNames: imageNames,
// 		imageNum: imageNum
// 	});
// }


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
// function getImageCanvas(imageID){
// 	console.log("infunction");
// 	console.log(storageRef);
// 	console.log(imagesRef);


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

// 	imagesRef.child(imageID).getDownloadURL().then(function(url){
// 		//insert code to instantiate new canvas and add to page display
// 		var temp = $("<canvas>");
// 		temp.attr("class", "face");
// 		temp.attr("id", "face_test");
// 		$("body").append(temp);
// 		var canvas = document.getElementById("face_test");
// 		console.log(url);
// 		var context = canvas.getContext('2d');
// 		var imageObj = new Image();
// 		imageObj.onload = function() {
// 			console.log("in onload");
// 			context.drawImage(this,0,0);
// 		};
// 		imageObj.src = url;
// 	}).catch(function(error){
// 		console.log("firebase errors");
// 		console.log(error);
// 	});
// }

// window.onload = function() {
// 	document.getElementById('file').addEventListener('change', handleFileUpload);
// }


//var database has already been declared

