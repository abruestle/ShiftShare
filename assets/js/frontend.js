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

    return new Blob([ia], {type: mimeString});
}

$(function () {

    currentfilter = "cat";

    var fx = new fxHelper();
    fx.generateFilterButtons();
    $("#collapseGifEffects").removeClass("collapse");
    $(".filterButton").click(function () {
        currentfilter = $(this).val();
    });
    function applyFiltersToImage(canvas_id, img) {
        setTimeout(function () {
            var canvas = document.getElementById(canvas_id);

            var url = canvas.toDataURL();
            img.src = url
            img.setAttribute("data-still", url);
            img.setAttribute("data-animate", url);
        }, 2000)
    }

    $('body').on('dblclick', '.snapshot', function () {

        $(this).attr("src", $(this).attr("data-original"));
        $(this).attr("data-still", $(this).attr("data-original"));
        $(this).attr("data-animate", $(this).attr("data-original"));

    });
    $('body').on('click', '.shift-snapshot', function () {

        var canvas_id = Math.random();

        var id = $(this).val();
        $("#canvas-container").append("<canvas id='" + canvas_id + "'></canvas>");
        var canvas = document.getElementById(canvas_id);

        var img = document.getElementById(id);
        var blob = dataURItoBlob(img.src);
        var options = {
            boundingbox: false,
            highlight: false
        };
        var face = new facePlusPlusApi();
        face.setCanvasDimensionsFromBlob(blob, canvas.id);
        var token = face.detectFaceFromBlob(blob);
        var coordinates = face.analyzeFace(token);
        face.drawCanvasImageFromBlob(blob, canvas.id, coordinates, options);
        setTimeout(function () {
            var fx = new fxHelper();
            fx.applyFilter(canvas.id, coordinates, currentfilter);
            setTimeout(applyFiltersToImage(canvas.id, img), 3000);
        }, 500);
    });



});