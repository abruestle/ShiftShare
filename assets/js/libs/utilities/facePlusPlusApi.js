function facePlusPlusApi() {
    this.api_key = "4t2b5e4MCSdAU0ij3IYu6fAM_T50sc5k";
    this.api_secret = "_T3VEWO8jHrUbsRYddGye4Ow2QkY_vzJ";
    this.detect_url = 'https://api-us.faceplusplus.com/facepp/v3/detect';
    this.analyze_url = 'https://api-us.faceplusplus.com/facepp/v3/face/analyze';

    this.detectFaceFromForm = function (file_input_id) {

        var data = new FormData();
        jQuery.each(jQuery("#" + file_input_id)[0].files, function (i, file) {
            data.append('image_file', file);
        });
        // If you want to add an extra field for the FormData
        data.append("image_file", $('#file').val());
        data.append("api_key", this.api_key);
        data.append("api_secret", this.api_secret);
        var token = ""
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: this.detect_url,
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            async: false,
            success: function (data) {

                token = data.faces[0].face_token;
            },
            error: function (e) {

                $("#result").text(e.responseText);
                console.log("ERROR : ", e);
                $("#btnSubmit").prop("disabled", false);
            }
        });
        return token;
    }

    this.detectFaceFromBlob = function(blob) {
           var data = new FormData();
        data.append('image_file', blob);
          data.append("api_key", this.api_key);
        data.append("api_secret", this.api_secret);
        var token = "";
        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: this.detect_url,
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            async: false,
            success: function (data) {
                if (typeof data.faces[0] == 'undefined') {
                    token = false
                } else {
                     token = data.faces[0].face_token;
                     console.log("good");
                }
            },
            error: function (e) {

                $("#result").text(e.responseText);
                console.log("ERROR : ", e);
                $("#btnSubmit").prop("disabled", false);
            }
        });
        return token;
    }

    this.analyzeFace = function (token) {
        var data = {api_key: this.api_key, api_secret: this.api_secret, face_tokens: token, return_landmark: 1};
        var response = {};
        $.ajax({
            type: "POST",
            url: this.analyze_url,
            data: data,
            async: false,
            success: function (data) {
                response = data;
            },
            error: function (e) {

                $("#result").text(e.responseText);
                console.log("ERROR : ", e);
                $("#btnSubmit").prop("disabled", false);
            }
        });
        var result = {"rectangle": response.faces[0].face_rectangle, "coordinates": response.faces[0].landmark};
        return result;
    }

    this.setCanvasDimensionsFromFileInput = function (file_input_id, canvas_id) {
        var input = $("#" + file_input_id);
        var reader = new FileReader();
        var result = {};
        reader.onload = function (e) {
            var img = new Image;
            img.onload = function () {
                var width = img.width;
                var height = img.height;
                $("#" + canvas_id).attr("width", width);
                $("#" + canvas_id).attr("height", height);
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(input[0].files[0]);
        return result;
    }

   this.setCanvasDimensionsFromBlob = function (blob, canvas_id) {
         var reader = new FileReader();
        var result = {};
        reader.onload = function (e) {
            var img = new Image;
            img.onload = function () {
                var width = img.naturalWidth;
                var height = img.naturalHeight; 
                var canvas = document.getElementById(canvas_id);
                canvas.height = height;
                canvas.width = width;
                $("#" + canvas_id).attr("width", width);
                $("#" + canvas_id).attr("height", height);
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(blob);
        return result;
    }


    this.drawCanvasImageFromBlob = function (blob, canvas_id, coordinates, options) {
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
         var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.addEventListener("load", function () {
                context.drawImage(img, 0, 0);
                var face = new facePlusPlusApi();
                if (options.boundingbox === true) {
                    face.drawBoundingBox(canvas_id, coordinates);
                }
                if (options.highlight === true) {
                    face.highlightLandmarks(canvas_id, coordinates);
                }
            });
            img.src = e.target.result;
        };
        reader.readAsDataURL(blob);
    }


    this.drawCanvasImageFromFileUpload = function (file_input_id, canvas_id, coordinates, options) {
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var input = $("#" + file_input_id);
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();
            img.addEventListener("load", function () {
                context.drawImage(img, 0, 0);
                var face = new facePlusPlusApi();
                if (options.boundingbox === true) {
                    face.drawBoundingBox(canvas_id, coordinates);
                }
                if (options.highlight === true) {
                    face.highlightLandmarks(canvas_id, coordinates);
                }
            });
            img.src = e.target.result;
        };
        reader.readAsDataURL(input[0].files[0]);
    }

    this.drawBoundingBox = function (canvas_id, coordinates) {
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var rectangle = coordinates.rectangle;
        context.moveTo(rectangle.left, rectangle.top);
        context.lineTo(rectangle.left + rectangle.width, rectangle.top);
        context.lineTo(rectangle.left + rectangle.width, rectangle.top + rectangle.height);
        context.lineTo(rectangle.left, rectangle.top + rectangle.height);
        context.lineTo(rectangle.left, rectangle.top);
        context.stroke();
    }

    this.highlightLandmarks = function (canvas_id, coordinates) {
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var landmarks = coordinates.coordinates;
        for (var key in landmarks) {
            context.fillStyle = "#ffff4d";
            context.fillRect(landmarks[key].x, landmarks[key].y, 3, 3)

        }
    }

    this.getFeatureDimensions = function (feature, coordinates) {
        switch (feature) {
            case "left-brow":
                return  this.getLeftBrow(coordinates);
            case "right-brow":
                return  this.getRightBrow(coordinates);
            case "left-eye":
                return  this.getLeftEye(coordinates);
            case "right-eye":
                return  this.getLeftEye(coordinates);
            case "nose":
                return  this.getNose(coordinates);
            case "nose-tip":
                return  this.getNoseTip(coordinates);
            case "nose-bridge":
                return  this.getNoseBridge(coordinates);
            case "mouth":
                return  this.getLeftBrow(coordinates);
            case "top-lip":
                return  this.getTopLip(coordinates);
            case "bottom-lip":
                return  this.getBottomLip(coordinates);
            case "chin":
                return  this.getLeftBrow(coordinates);
            case "left-cheek":
                return  this.getLeftBrow(coordinates);
            case "right-cheek":
                return  this.getLeftBrow(coordinates);
        }
    }

    // FACIAL FEATURE GETTERS \\
    this.getLeftBrow = function (coordinates) {
        var landmarks = coordinates.coordinates;
        var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.left_eyebrow_upper_left_quarter;
        var topright = landmarks.left_eyebrow_upper_right_quarter;
        var bottomright = landmarks.left_eyebrow_lower_right_quarter;
        var bottomleft = landmarks.left_eyebrow_lower_left_quarter;
        var totalleft = landmarks.left_eyebrow_left_corner;
        var totalright = landmarks.left_eyebrow_right_corner;

        topleft.x = totalleft.x;
        bottomleft.x = totalleft.x;
        topright.x = totalright.x;
        bottomright.x = totalright.x;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getRightBrow = function (coordinates) {
        var landmarks = coordinates.coordinates;
        var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.right_eyebrow_upper_left_quarter;
        var topright = landmarks.right_eyebrow_upper_right_quarter;
        var bottomright = landmarks.right_eyebrow_lower_right_quarter;
        var bottomleft = landmarks.right_eyebrow_lower_left_quarter;
        var totalleft = landmarks.right_eyebrow_left_corner;
        var totalright = landmarks.right_eyebrow_right_corner;


        topleft.x = totalleft.x;
        bottomleft.x = totalleft.x;
        topright.x = totalright.x;
        bottomright.x = totalright.x;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getLeftEye = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.left_eye_upper_left_quarter;
        var topright = landmarks.left_eye_upper_right_quarter;
        var bottomright = landmarks.left_eye_lower_right_quarter;
        var bottomleft = landmarks.left_eye_lower_left_quarter;
        var totalleft = landmarks.left_eye_left_corner;
        var totalright = landmarks.left_eye_right_corner;
        var totaltop = landmarks.left_eye_top;
        var totalbottom = landmarks.left_eye_bottom;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getRightEye = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.right_eye_upper_left_quarter;
        var topright = landmarks.right_eye_upper_right_quarter;
        var bottomright = landmarks.right_eye_lower_right_quarter;
        var bottomleft = landmarks.right_eye_lower_left_quarter;
        var totalleft = landmarks.right_eye_left_corner;
        var totalright = landmarks.right_eye_right_corner;
        var totaltop = landmarks.right_eye_top;
        var totalbottom = landmarks.right_eye_bottom;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getNoseTip = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.nose_contour_left2;
        var topright = landmarks.nose_contour_right2;
        var bottomright = landmarks.nose_contour_right3;
        var bottomleft = landmarks.nose_contour_left3;
        var totalleft = landmarks.nose_left
        var totalright = landmarks.nose_right;
        var totaltop = (landmarks.nose_contour_left2 < landmarks.nose_contour_right2 ? landmarks.nose_contour_left2 : landmarks.nose_contour_right2);
        var totalbottom = landmarks.nose_contour_lower_middle;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getNoseBridge = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.nose_contour_left1;
        var topright = landmarks.nose_contour_right1;
        var bottomright = landmarks.nose_contour_right2;
        var bottomleft = landmarks.nose_contour_left2;
        var totalleft = landmarks.nose_contour_left1
        var totalright = landmarks.nose_contour_right1;
        var totaltop = (landmarks.nose_contour_left1 < landmarks.nose_contour_right1 ? landmarks.nose_contour_left1 : landmarks.nose_contour_right1);
        var totalbottom = landmarks.nose_contour_left2;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getNose = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.nose_contour_left1;
        var topright = landmarks.nose_contour_right1;
        var bottomright = landmarks.nose_contour_right2;
        var bottomleft = landmarks.nose_contour_left2;
        var totalleft = landmarks.nose_left
        var totalright = landmarks.nose_right;
        var totaltop = (landmarks.nose_contour_left1 < landmarks.nose_contour_right1 ? landmarks.nose_contour_left1 : landmarks.nose_contour_right1);
        var totalbottom = landmarks.nose_contour_lower_middle;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getMouth = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.mouth_upper_lip_left_contour2;
        var topright = landmarks.mouth_upper_lip_right_contour2;
        var bottomright = landmarks.mouth_lower_lip_right_contour2;
        var bottomleft = landmarks.mouth_lower_lip_left_contour2;
        var totalleft = landmarks.mouth_left_corner
        var totalright = landmarks.mouth_right_corner;
        var totaltop = landmarks.mouth_upper_lip_right_contour1;
        var totalbottom = landmarks.mouth_lower_lip_bottom;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getTopLip = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.mouth_upper_lip_left_contour1;
        var topright = landmarks.mouth_upper_lip_right_contour1;
        var bottomright = landmarks.mouth_upper_lip_right_contour2;
        var bottomleft = landmarks.mouth_upper_lip_left_contour2;
        var totalleft = landmarks.mouth_left_corner
        var totalright = landmarks.mouth_right_corner;
        var totaltop = landmarks.mouth_upper_lip_right_contour1;
        var totalbottom = landmarks.mouth_upper_lip_bottom;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getBottomLip = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.mouth_lower_lip_left_contour1;
        var topright = landmarks.mouth_lower_lip_right_contour1;
        var bottomright = landmarks.mouth_lower_lip_right_contour2;
        var bottomleft = landmarks.mouth_lower_lip_left_contour2;
        var totalleft = landmarks.mouth_left_corner
        var totalright = landmarks.mouth_right_corner;
        var totaltop = landmarks.mouth_lower_lip_right_contour1;
        var totalbottom = landmarks.mouth_lower_lip_bottom;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getEyesToMouth = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.left_eyebrow_upper_left_quarter;
        var topright = landmarks.right_eyebrow_upper_right_quarter;
        var bottomright = landmarks.mouth_lower_lip_right_contour2;
        var bottomleft = landmarks.mouth_lower_lip_left_contour2;
        var totalleft = landmarks.left_eyebrow_left_corner
        var totalright = landmarks.right_eyebrow_right_corner;
        var totaltop = landmarks.right_eyebrow_upper_left_quarter;
        var totalbottom = landmarks.mouth_lower_lip_bottom;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getEyesToEyes = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.left_eyebrow_upper_left_quarter;
        var topright = landmarks.right_eyebrow_upper_right_quarter;
        var bottomright = landmarks.right_eye_lower_right_quarter;
        var bottomleft = landmarks.left_eye_lower_left_quarter;
        var totalleft = landmarks.left_eyebrow_left_corner
        var totalright = landmarks.right_eyebrow_right_corner;
        var totaltop = landmarks.right_eyebrow_upper_left_quarter;
        var totalbottom = (landmarks.right_eye_bottom < landmarks.left_eye_bottom ? landmarks.right_eye_bottom : landmarks.left_eye_bottom);
        ;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getLeftEyeLaser = function (coordinates) {
        var landmarks = coordinates.coordinates;
        var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = {x: 0, y: landmarks.left_eyebrow_upper_right_quarter.x};
        var topright = landmarks.left_eyebrow_upper_right_quarter;
        var bottomright = {x: landmarks.left_eyebrow_upper_right_quarter.x, y: 0};
        var bottomleft = {x: 0, y: 0};
        var totalleft = {x: 0, y: 0};
        var totalright = landmarks.left_eye_right_corner;
        var totaltop = landmarks.left_eye_top;
        var totalbottom = {x: 0, y: 0};

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getRightEyeLaser = function (coordinates) {
        var landmarks = coordinates.coordinates;
        var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = {x: 0, y: landmarks.right_eyebrow_upper_right_quarter.x};
        var topright = landmarks.right_eyebrow_upper_right_quarter;
        var bottomright = {x: 0, y: 0};
        var bottomleft = {x: 0, y: 0};
        var totalleft = landmarks.right_eye_left_corner;
        var totalright = {x: 0, y: 0};
        var totaltop = landmarks.right_eye_top;
        var totalbottom = {x: 0, y: 0};

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getLeftEyeRed = function (coordinates) {
        var landmarks = coordinates.coordinates;
        var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = {x: 0, y: landmarks.left_eyebrow_upper_right_quarter.x};
        var topright = landmarks.left_eyebrow_upper_right_quarter;
        var bottomright = {x: landmarks.left_eyebrow_upper_right_quarter.x, y: 0};
        var bottomleft = {x: 0, y: 0};
        var totalleft = landmarks.left_eye_left_corner;
        var totalright = landmarks.left_eye_right_corner;
        var totaltop = landmarks.left_eyebrow_upper_right_quarter;
        var totalbottom = landmarks.left_eye_bottom;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getRightEyeRed = function (coordinates) {
        var landmarks = coordinates.coordinates;
        var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = {x: 0, y: landmarks.right_eyebrow_upper_right_quarter.x};
        var topright = landmarks.right_eyebrow_upper_right_quarter;
        var bottomright = {x: 0, y: 0};
        var bottomleft = {x: 0, y: 0};
       var totalleft = landmarks.right_eye_left_corner;
        var totalright = landmarks.right_eye_right_corner;
        var totaltop = landmarks.right_eyebrow_upper_right_quarter;
        var totalbottom = landmarks.right_eye_bottom;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getMonocle = function (coordinates) {
        var landmarks = coordinates.coordinates;
        var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};
         var topleft = {x: 0, y: landmarks.right_eyebrow_upper_right_quarter.x};
        var topright = landmarks.contour_right1;
        var bottomright = {x: landmarks.contour_right1.x, y: 0};
        var bottomleft = {x: 0, y: 0};
        var totalleft = landmarks.right_eye_left_corner;
        var totalright = landmarks.contour_right1;
        var totaltop = landmarks.right_eye_top;
        var totalbottom = landmarks.contour_chin;
        totalright.x *= 1.10;
        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getTopHat = function (coordinates) {
        var landmarks = coordinates.coordinates;
        var boundingbox = coordinates.rectangle;

        var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};
         var topleft = {x: 0, y: landmarks.right_eyebrow_upper_right_quarter.x};
        var topright = landmarks.contour_right1;
        var bottomright = {x: landmarks.contour_right1.x, y: 0};
        var bottomleft = {x: landmarks.contour_left1.x, y: 0};
        var totalleft = landmarks.contour_left1;
        var totalright = landmarks.contour_right1;
        var totaltop = {x: 0, y: 0};
        var totalbottom = {x: 0, y: boundingbox.top};
        totalright.x *= 1.10;
        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getNoseToMouth = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.nose_contour_left2;
        var topright = landmarks.nose_contour_right2;
        var bottomright = landmarks.mouth_lower_lip_right_contour2;
        var bottomleft = landmarks.mouth_lower_lip_left_contour2;
        var totalleft = landmarks.mouth_left_corner
        var totalright = landmarks.mouth_right_corner;
        var totaltop = (landmarks.nose_contour_left2 < landmarks.nose_contour_right2 ? landmarks.nose_contour_left2 : landmarks.nose_contour_right2);
        var totalbottom = landmarks.mouth_lower_lip_bottom;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }

    this.getCatNoseToMouth = function (coordinates) {
        var landmarks = coordinates.coordinates;
         var rectangle = {topleft: 0, topright: 0, bottomright: 0, bottomleft: 0};

        var topleft = landmarks.nose_contour_left2;
        var topright = landmarks.nose_contour_right2;
        var bottomright = landmarks.mouth_lower_lip_right_contour2;
        var bottomleft = landmarks.mouth_lower_lip_left_contour2;
        var totalleft = landmarks.contour_left1;
        var totalright = landmarks.contour_right1;
        var totaltop = (landmarks.nose_contour_left2 < landmarks.nose_contour_right2 ? landmarks.nose_contour_left2 : landmarks.nose_contour_right2);
        var totalbottom = landmarks.contour_chin;

        topleft.x = totalleft.x;
        topleft.y = totaltop.y;
        bottomleft.x = totalleft.x;
        bottomleft.y = totalbottom.y;
        topright.x = totalright.x;
        topright.y = totaltop.y;
        bottomright.x = totalright.x;
        bottomright.y = totalbottom.y;

        rectangle.topleft = topleft;
        rectangle.topright = topright;
        rectangle.bottomright = bottomright;
        rectangle.bottomleft = bottomleft;
        return rectangle;
    }


    // Drawing Tools \\

    this.drawRectangle = function (canvas_id, rectangle) {
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        context.moveTo(rectangle.topleft.x, rectangle.topleft.y);
        context.lineTo(rectangle.topright.x, rectangle.topright.y);
        context.lineTo(rectangle.bottomright.x, rectangle.bottomright.y);
        context.lineTo(rectangle.bottomleft.x, rectangle.bottomleft.y);
        context.lineTo(rectangle.topleft.x, rectangle.topleft.y);
        context.stroke();
    }

    this.getRectangleCenter = function (rectangle) {
        var x = Math.floor((rectangle.topleft.x + rectangle.topright.x) / 2);
        var y = Math.floor((rectangle.topleft.y + rectangle.bottomright.y) / 2);
        return {x: x, y: y};
    }
}
