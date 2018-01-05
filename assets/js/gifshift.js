totalframes = 0;
currentframe = 0;
faces = true;

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

function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
}

function wasteTime() {
        console.log("time wasted");
}



async function generateCanvases(parent, pngs) {
        $("#canvas-gif-container").html("");
        var total = pngs.length;
        var noface = 0;
        for (var key in pngs) {
                currentframe++;
                var percent = Math.floor((currentframe / totalframes)  * 100);
                var progressbar = parent.querySelector(".progress-bar");
                progressbar.style.width = percent + "%";
                var png = pngs[key];
                var blob = dataURItoBlob(png);
                console.log(blob);
                var options = {
                        boundingbox: false,
                        highlight: false
                };
                var face = new facePlusPlusApi();
                await sleep(1000);
                var token = face.detectFaceFromBlob(blob);
                if (token === false) {
                     noface++;
                     if (noface === total) {
                        faces = false; 
                     }   
                        var canvas = document.createElement("canvas");
                        canvas.crossOrigin = "anonymous";
                        document.getElementById("canvas-gif-container").appendChild(canvas);
                        canvas.id = blob.size;
                        face.setCanvasDimensionsFromBlob(blob, canvas.id);
                        face.drawCanvasImageFromBlob(blob, canvas.id, {}, options); 
                }else {
                        await sleep(1000);
                        var coordinates = face.analyzeFace(token);
                        var canvas = document.createElement("canvas");
                        canvas.crossOrigin = "anonymous";
                        document.getElementById("canvas-gif-container").appendChild(canvas);
                        canvas.id = blob.size;
                        face.setCanvasDimensionsFromBlob(blob, canvas.id);
                        face.drawCanvasImageFromBlob(blob, canvas.id, coordinates, options);
                        await sleep(1000);
                        var fx = new fxHelper();
                        fx.applyFilter(canvas.id, coordinates, currentfilter);
                         await sleep(1000);
                }
        }
        return new Promise(resolve => setTimeout(resolve, 1));
}

async function gifSplitter(parent, gif, pngs) {
        var encoder = new GIFEncoder();
        encoder.setRepeat(0);
        encoder.setDelay(200);
        encoder.start();
        await generateCanvases(parent, pngs);
        console.log("this should be after wasted time");
        $("#canvas-gif-container canvas").each(function(){
                var id = $(this).attr("id");
                var canvas = document.getElementById(id);
                var context = canvas.getContext('2d');
                encoder.addFrame(context);
        });
        encoder.finish();
        var binary_gif = encoder.stream().getData()
        var data_url = 'data:image/gif;base64,' + encode64(binary_gif);
        var gif = document.getElementById(gif);
        if (faces) {
                gif.src = data_url;
        } else {
                var parent = gif.parentNode;
                var progressarea = parent.querySelector("#progressArea");
                var shift = parent.querySelector(".shift");
                var share = parent.querySelector(".share");
                progressarea.innerHTML = "<span class='badge badge-primary'>No faces found</span>";
                shift.setAttribute("disabled", true);
                share.setAttribute("disabled", true);
                faces = true;
        }
 }

$(document).ready(function () {
       $('body').on('click', '.shift:not(.shift-snapshot)', function () {
                currentframe = 0;
                var id = $(this).val();
                var gif = document.getElementById(id);
                var parent = gif.parentNode;
                $("#img-container").append(gif);
                gif.src = gif.getAttribute("data-animate");
                var sg = new SuperGif({gif:gif});
                sg.load();
                var html = parent.innerHTML;
                parent.innerHTML = gif.outerHTML + html;
                setTimeout(function(){
                        var pngs = sg.get_png_srcs();
                        totalframes = pngs.length;
                         gifSplitter(parent, id, pngs);
                }, 500);
        });
});
	
