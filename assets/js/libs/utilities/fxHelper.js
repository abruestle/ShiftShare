function fxHelper() {

//    Properties ______________________________________________________
    this.url = "";
    this.clown_face = this.url + "effects/clown-face.png";
    this.nose_mustache = this.url + "effects/nose-mustache.png";
    this.hipster_glasses = this.url + "effects/hipster-glasses.png";
    this.crazy_eye_glasses = this.url + "effects/crazy-eye-glasses.png";
    this.laser_eye_left = this.url + "effects/laser-eye-left.png";
    this.laser_eye_right = this.url + "effects/laser-eye-right.png";
    this.imonocle = this.url + "effects/monocle.png";
    this.top_hat = this.url + "effects/top-hat.png";
    this.anime_eye_left = this.url + "effects/anime-eye-left.png";
    this.anime_eye_right = this.url + "effects/anime-eye-right.png";
    this.big_lips = this.url + "effects/big-lips.png";
    this.brow_ring = this.url + "effects/brow-ring.png";
    this.nose_ring = this.url + "effects/nose-ring.png";
    this.bunny_nose = this.url + "effects/bunny-nose.png";
    this.bunny_left_ear = this.url + "effects/bunny-left-ear.png";
    this.bunny_right_ear = this.url + "effects/bunny-right-ear.png";
    this.cat_nose = this.url + "effects/cat-nose.png";
    this.cat_left_ear = this.url + "effects/cat-left-ear.png";
    this.cat_right_ear = this.url + "effects/cat-right-ear.png";
    this.dog_nose = this.url + "effects/dog-nosft-ear.png";
    this.dog_right_ear = this.url + "effects/dog-right-ear.png";
    this.rainbow_vomit = this.url + "effects/rainbow-ve.png";
    this.dog_left_ear = this.url + "effects/dog-leomit.gif";
    this.red_eye_left = this.url + "effects/red-eye-left.png";
    this.red_eye_right = this.url + "effects/red-eye-right.png";
    this.red_eye = this.url + "effects/red-eye.png";
//    _______________________________________________________________

    //  Main Methods

    this.applyFilter = function (canvas_id, coordinates, filter) {
        switch (filter) {
            case "clown-face":
                this.clownFace(canvas_id, coordinates);
                break;
            case "nose-mustache":
                this.noseMustache(canvas_id, coordinates);
                break;
            case "hipster-glasses":
                this.hipsterGlasses(canvas_id, coordinates);
                break;
            case "crazy-eye-glasses":
                this.crazyEyeGlasses(canvas_id, coordinates);
                break;
            case "eye-lasers":
                this.eyeLasers(canvas_id, coordinates);
                break;
            case "monocle":
                this.monocle(canvas_id, coordinates);
                break;
            case "top-hat":
                this.topHat(canvas_id, coordinates);
                break;
            case "anime-eyes":
                this.animeEyes(canvas_id, coordinates);
                break;
            case "big-lips":
                this.bigLips(canvas_id, coordinates);
                break;
            case "brow-ring":
                this.browRing(canvas_id, coordinates);
                break;
            case "nose-ring":
                this.noseRing(canvas_id, coordinates);
                break;
            case "bunny":
                this.bunny(canvas_id, coordinates);
                break;
            case "cat":
                this.cat(canvas_id, coordinates);
                break;
            case "dog":
                this.dog(canvas_id, coordinates);
                break;
            case "red-eyes":
                this.redEyes(canvas_id, coordinates);
                break;
            case "rainbow-vomit":
                this.rainbowVomit(canvas_id, coordinates);
                break;
        }
    }

    //  Filters

    this.clownFace = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getEyesToMouth(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        var img = new Image;
        img.src = this.clown_face;

        var paddedwidth = width * 1.12;
        var paddedheight = height * 1.12;
        var offsetwidth = paddedwidth - width;
        var offsetheight = paddedheight - height;
        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x - offsetwidth / 2, rectangle.bottomright.y - (offsetheight / 1.1), paddedwidth, paddedheight);
        };
    }

    this.noseMustache = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getEyesToMouth(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        var img = new Image;
        img.src = this.nose_mustache;

        var paddedwidth = width * 1.12;
        var paddedheight = height * 1.12;
        var offsetwidth = paddedwidth - width;
        var offsetheight = paddedheight - height;
        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x - offsetwidth / 2, rectangle.bottomright.y - offsetheight / 6, paddedwidth, paddedheight);
        };
    }

    this.hipsterGlasses = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getEyesToEyes(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height * 1.25;
        var img = new Image;
        img.src = this.hipster_glasses;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x, rectangle.bottomright.y * 1.1, width, height);
        };
    }

    this.crazyEyeGlasses = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getEyesToEyes(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height * 1.25;
        var img = new Image;
        img.src = this.crazy_eye_glasses;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x, rectangle.bottomright.y * 1.1, width, height);
        };
    }

    this.eyeLasers = function (canvas_id, coordinates) {
        this.leftEyeLaser(canvas_id, coordinates);
        this.rightEyeLaser(canvas_id, coordinates);
    }

    this.animeEyes = function (canvas_id, coordinates) {
        this.leftAnimeEye(canvas_id, coordinates);
        this.rightAnimeEye(canvas_id, coordinates);
    }

    this.monocle = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getMonocle(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;


        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        var img = new Image;
        img.src = this.imonocle;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x, rectangle.bottomright.y, width, height);
        };
    }

    this.topHat = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getTopHat(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;


        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        var img = new Image;
        img.src = this.top_hat;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x * 0.9, rectangle.bottomright.y, width, height);
        };
    }

    this.bigLips = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getMouth(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;


        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height * 1.5;
        width = width * 1.3;
        var img = new Image;
        img.src = this.big_lips;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x + ((rectangle.bottomright.x * 1.04) - rectangle.bottomright.x), rectangle.bottomright.y + ((rectangle.bottomright.y * 1.02) - rectangle.bottomright.y), width, height);
        };
    }

    this.browRing = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getRightBrow(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;


        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        width = width / 2;
        var img = new Image;
        img.src = this.brow_ring;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x, rectangle.bottomright.y, width, height);
        };
    }

    this.noseRing = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getNoseTip(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;


        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        width = width / 2;
        var img = new Image;
        img.src = this.nose_ring;

        img.onload = function () {
            context.drawImage(img, coordinates.coordinates.nose_contour_left1.x, rectangle.bottomright.y, width, height);
        };
    }

    this.bunny = function (canvas_id, coordinates) {
        this.bunnyNose(canvas_id, coordinates);
        this.bunnyLeftEar(canvas_id, coordinates);
        this.bunnyRightEar(canvas_id, coordinates);
    }

    this.cat = function (canvas_id, coordinates) {
        this.catNose(canvas_id, coordinates);
        this.catLeftEar(canvas_id, coordinates);
        this.catRightEar(canvas_id, coordinates);
    }

    this.dog = function (canvas_id, coordinates) {
        this.dogNose(canvas_id, coordinates);
        this.dogLeftEar(canvas_id, coordinates);
        this.dogRightEar(canvas_id, coordinates);
    }

    this.redEyes = function (canvas_id, coordinates) {
        this.leftRedEye(canvas_id, coordinates);
        this.rightRedEye(canvas_id, coordinates);
    }

    this.rainbowVomit = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getMouth(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;
        rectangle.bottomleft.y = height;
        rectangle.bottomright.y = height;

        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;

        var img = new Image;
        img.src = this.rainbow_vomit;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x, rectangle.bottomright.y, width, height);
        };
    }

    //    Helper Methods

    this.getFilters = function () {
        var filters = [
            "clown-face",
            "nose-mustache",
            "hipster-glasses",
            "crazy-eye-glasses",
            "eye-lasers",
            "monocle",
            "top-hat",
            "anime-eyes",
            "big-lips",
            "brow-ring",
            "nose-ring",
            "bunny",
            "cat",
            "dog",
            "red-eyes",
            "rainbow-vomit"
        ];
        return filters;
    }

    this.animateCanvasFilter = function (canvas_id, gif, rectangle, width, height) {

    }

    //    Sub Filters 

    this.bunnyNose = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getNoseToMouth(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;


        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        var img = new Image;
        img.src = this.bunny_nose;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x, rectangle.bottomright.y, width, height);
        };
    }

    this.bunnyLeftEar = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getTopHat(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;

        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        width = width / 2;
        var img = new Image;
        img.src = this.bunny_left_ear;

        img.onload = function () {
            context.drawImage(img, coordinates.rectangle.left - width * .6, rectangle.bottomright.y, width, height);
        };
    }

    this.bunnyRightEar = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getTopHat(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;
        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        width = width / 2;
        var img = new Image;
        img.src = this.bunny_right_ear;

        img.onload = function () {
            context.drawImage(img, coordinates.rectangle.left + coordinates.rectangle.width * 1.3, rectangle.bottomright.y, width, height);
        };
    }

    this.catNose = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getCatNoseToMouth(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;


        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        var img = new Image;
        img.src = this.cat_nose;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x, rectangle.bottomright.y, width, height);
        };
    }

    this.catLeftEar = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getTopHat(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;

        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        width = width / 2;
        var img = new Image;
        img.src = this.cat_left_ear;

        img.onload = function () {
            context.drawImage(img, coordinates.rectangle.left - width * .6, rectangle.bottomright.y, width, height);
        };
    }

    this.catRightEar = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getTopHat(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;
        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        width = width / 2;
        var img = new Image;
        img.src = this.cat_right_ear;

        img.onload = function () {
            context.drawImage(img, coordinates.rectangle.left + coordinates.rectangle.width * 1.3, rectangle.bottomright.y, width, height);
        };
    }

    this.dogNose = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getNoseToMouth(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;


        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        var img = new Image;
        img.src = this.dog_nose;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x, rectangle.bottomright.y, width, height);
        };
    }

    this.dogLeftEar = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getTopHat(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;

        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        width = width / 2;
        var img = new Image;
        img.src = this.dog_left_ear;

        img.onload = function () {
            context.drawImage(img, coordinates.rectangle.left - width * .6, rectangle.bottomright.y, width, height);
        };
    }

    this.dogRightEar = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getTopHat(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;
        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        width = width / 2;
        var img = new Image;
        img.src = this.dog_right_ear;

        img.onload = function () {
            context.drawImage(img, coordinates.rectangle.left + coordinates.rectangle.width * 1.3, rectangle.bottomright.y, width, height);
        };
    }

    this.leftAnimeEye = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getLeftEye(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        var img = new Image;
        img.src = this.anime_eye_left;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x + ((rectangle.bottomright.x * 1.03 - rectangle.bottomright.x)), rectangle.bottomright.y + ((rectangle.bottomright.y * 1.03 - rectangle.bottomright.y)), width * 1.4, height * 1.4);
        };
    }

    this.rightAnimeEye = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getRightEye(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        var img = new Image;
        img.src = this.anime_eye_right;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x + ((rectangle.bottomright.x * 1.03 - rectangle.bottomright.x)), rectangle.bottomright.y + ((rectangle.bottomright.y * 1.03 - rectangle.bottomright.y)), width * 1.4, height * 1.4);
        };
    }

    this.leftEyeLaser = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getLeftEyeLaser(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;
        rectangle.bottomleft.y = height;
        rectangle.bottomright.y = height;

        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        var img = new Image;
        img.src = this.laser_eye_left;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x, rectangle.bottomright.y, width, height);
        };
    }

    this.rightEyeLaser = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getRightEyeLaser(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");
        var height = canvas.height;
        var width = canvas.width;
        rectangle.bottomleft.y = height;
        rectangle.bottomright.y = height;
        rectangle.bottomright.x = width;
        rectangle.topright.x = width;

        var width = rectangle.topleft.x - rectangle.topright.x;
        var height = rectangle.topleft.y - rectangle.bottomright.y;
        height = height;
        var img = new Image;
        img.src = this.laser_eye_right;

        img.onload = function () {
            context.drawImage(img, rectangle.bottomright.x, rectangle.bottomright.y, width, height);
        };
    }

    this.leftRedEye = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getLeftEyeRed(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");


        var width = rectangle.topright.x - rectangle.topleft.x;
        var height = rectangle.bottomright.y - rectangle.topleft.y;
        height = height * 2;
        width = height;
        var x = (rectangle.topleft.x - (width / 4));
        var y = (rectangle.topleft.y - (height / 6));



        var img = new Image;
        img.src = this.red_eye;

        img.onload = function () {
            context.drawImage(img, x, y, width, height);
        };
    }

    this.rightRedEye = function (canvas_id, coordinates) {
        var api = new facePlusPlusApi();
        var rectangle = api.getRightEyeRed(coordinates);
        var canvas = document.getElementById(canvas_id);
        var context = canvas.getContext("2d");


        var width = rectangle.topright.x - rectangle.topleft.x;
        var height = rectangle.bottomright.y - rectangle.topleft.y;
        height = height * 2;
        width = height;
        var x = (rectangle.topleft.x - (width / 5));
        var y = (rectangle.topleft.y - (height / 6));



        var img = new Image;
        img.src = this.red_eye;

        img.onload = function () {
            context.drawImage(img, x, y, width, height);
        };
    }

}