  (function() {
    'use strict';
    var video = document.querySelector('video')
      , canvas;
    /**
     *  generates a still frame image from the stream in the <video>
     *  appends the image to the <body>
     */
    function takeSnapshot() {
      var img = document.querySelector('img') || document.createElement('img');
      var context;
      var width = video.offsetWidth
        , height = video.offsetHeight;
      canvas = canvas || document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, width, height);
      img.src = canvas.toDataURL('image/png');
      return img;
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
                        var fx = new fxHelper();
                        fx.applyFilter("face_1", coordinates, "cat");
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
  
    // use MediaDevices API
    // docs: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    if (navigator.mediaDevices) {
      // access the web cam
      navigator.mediaDevices.getUserMedia({video: true})
      // permission granted:
        .then(function(stream) {
          video.src = window.URL.createObjectURL(stream);
          video.addEventListener('click', takeSnapshot);
        })
        // permission denied:
        .catch(function(error) {
          $('#webcamComments').text('Could not access the camera. Error: ' + error.name);
        });
    }
  })();