  function facePlusPlusApi() {

                /// Face++ api 
                // Author: Bradley Pulaski
                // detectFaceFromForm() argument is file input id, returns face token
                // analyzeFace() argument is face token, returns coordinates of facial landmarks and face rectangle bounding box

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
            }
