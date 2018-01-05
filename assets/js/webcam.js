  (function() {
    'use strict';
    var video = document.querySelector('video')
      , canvas;
      var localstream = null;
    /**
     *  generates a still frame image from the stream in the <video>
     *  appends the image to the <body>
     */
    function takeSnapshot() {
      var img = document.createElement('img');
      var context;
      var width = video.offsetWidth
        , height = video.offsetHeight;
      canvas = document.getElementById('face_1');
      canvas.width = width;
      canvas.height = height;
      context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, width, height);
      img.src = canvas.toDataURL('image/png');
      $("#face_snapshot").attr("src", img.src);
      return img;
    }
	
	function addWebCamCard() {
			 var canvas = document.getElementById("face_1");
					 var url = canvas.toDataURL();
					 var html = $('<div class="col-md-4 grid-item"><div class="card"><img class="snapshot card-img-top img-fluid" src="'+ url +'"   data-original="'+ url +'"  data-still = "'+ url +'" data-animate = "'+ url +'" data-state = "still" class="gif" id="'+ url +'"><div class="card-block"><div class="row justify-content-center"><div class="col-md-2"><button type="button" class="btn btn-primary btn-sm shift shift-snapshot" value="'+ url +'">Shift!</button></div><div class="col-md-2"><button type="button" class="btn btn-primary btn-sm share" value="'+ url +'">Share!</button></div><div class="col text-right" id="progressArea"><div class="progress"><div class="progress-bar" style="width:0%"></div></div></div></div></div></div></div>');            
            
            $("#images .grid-sizer").after(html);    
            $grid.masonry( 'prepended', $(html) );    
            setTimeout(function(){    
              $grid.masonry();
            }, 200);
            setTimeout(function(){    
              $grid.masonry();
            }, 500);
	    setTimeout(function(){    
              $grid.masonry();
            }, 1200);
		$grid.masonry();
	}
   $("#snapshot").click(function() {
   		var img = takeSnapshot();
   		var blob = dataURItoBlob(img.src);
   	 	      var options = {
                        boundingbox: false,
                        highlight: false
                    };
                    var face = new facePlusPlusApi();
                    var token = face.detectFaceFromBlob(blob);
                    var coordinates = face.analyzeFace(token);
                    face.setCanvasDimensionsFromBlob(blob, "face_1");
                    face.drawCanvasImageFromBlob(blob, "face_1", coordinates, options);
                    setTimeout(function () {
                        // var fx = new fxHelper();
                        // fx.applyFilter("face_1", coordinates, "cat");
						setTimeout(addWebCamCard(), 500);
                     }, 500);
					 
				
   });
   function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type:mimeString});
}
  $("#nav-snap-tab").click(function(){
    // use MediaDevices API
    // docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    if (navigator.mediaDevices) {
      // access the web cam
      navigator.mediaDevices.getUserMedia({video: true})
      // permission granted:
        .then(function(stream) {
          localstream = stream;
          video.src = window.URL.createObjectURL(stream);
          video.addEventListener('click', takeSnapshot);
        })
        // permission denied:
        .catch(function(error) {
          $('#webcamComments').text('Could not access the camera. Error: ' + error.name);
        });
    }
    });

$("#nav-contact-tab").click(function(){
  vidOff();
});

$("#nav-shift-tab").click(function(){
  vidOff();
});

  function vidOff() {
   
  video.pause();
  video.src = "";
  localstream.getTracks()[0].stop();
  console.log("Vid off");
}

  function vidOn() {
  
  video.play();
  video.src = window.URL.createObjectURL(localstream);
  localstream.getTracks()[0].play();
  console.log("Vid on");
}
  })();
