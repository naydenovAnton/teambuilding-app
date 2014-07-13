var pictureSource; // picture source
var destinationType; // sets the format of returned value
var destinationPath;

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
        $('.swipebox').swipebox();
    },
    receivedEvent: function (id) {
        pictureSource = navigator.camera.PictureSourceType;
        destinationType = navigator.camera.DestinationType;
        loadFile();
    }
};

function loadFile() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
    fileSystem.root.getFile("/sdcard/scavenger/data/config.txt", null, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    fileEntry.file(gotFile, fail);
}

function gotFile(file) {
    readAsText(file);
}

function readAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function (evt) {
        createJson(evt.target.result);
    };
    reader.readAsText(file);
}

function fail(evt) {
    alert(evt.target.error.code);
}


//Image start

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
// Get image handle
//

    var smallImage = document.getElementById('smallImage_' + destinationPath);

// Unhide image elements
//
    smallImage.style.display = 'block';

// Show the captured photo
// The inline CSS rules are used to resize the image
//
    smallImage.src = "data:image/jpeg;base64," + imageData;
}
// Called when a photo is successfully retrieved
//
function onPhotoFileSuccess(imageData) {

    if (destinationPath == -1) {

        var images = $('.free-image-wrap').find('img').size();
        var theme = '';

        if (images == 0) {
            theme = 'a';
        }

        if (images == 1) {
            theme = 'b';
        }

        if (images == 2) {
            theme = 'c';
        }

        if (images == 3) {
            theme = 'd';
        }

        if (images % 4 == 0) {
            theme = 'a';
        }

        if (images % 5 == 0) {
            theme = 'b';
        }

        if (images % 6 == 0) {
            theme = 'c';
        }

        if (images % 7 == 0) {
            theme = 'd';
        }

        var html = '<div class="ui-block-' + theme + '">';
        html += '<div class="ui-bar ui-bar-a">';
        html += '<div style="height: 150px;overflow: hidden">';
        html += '<img src="' + imageData + '" width="200" />';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        $('.free-image-wrap').append(html)
    } else {
        var smallImage = document.getElementById('smallImage_' + destinationPath);
        smallImage.style.display = 'block';
        smallImage.src = imageData;
    }
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
// Uncomment to view the image file URI
// console.log(imageURI);

// Get image handle
//
    var largeImage = document.getElementById('largeImage');

// Unhide image elements
//
    largeImage.style.display = 'block';

// Show the captured photo
// The inline CSS rules are used to resize the image
//
    largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhotoWithData() {
// Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {quality: 50});
}

function capturePhotoWithFile(id) {
    destinationPath = id;
    navigator.camera.getPicture(onPhotoFileSuccess, onFail, {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
    });
}
// A button will call this function
//
function getPhoto(source) {
// Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.FILE_URI,
        sourceType: source
    });
}

// Called if something bad happens.
//
function onFail(message) {
    alert('Failed because: ' + message);
}

//Image end

function createJson(text) {
    var json = JSON.parse(text);

    $('.scavenger-title').text(json.title);
    $('.homePageText').text(json.message);
    $('.score-wrap').html(json.scores);
    $('.info-wrap').html(json.instructions);

    var required = json.required;

    var html = '<div data-role="collapsible-set" data-theme="b">';

    var count = 1;
    $.each(required, function (key, value) {
        html += '<div data-role="collapsible">';
        html += '<h3 style="position:relative">';
        html += value.title;
        html += '<form style="position: absolute;right: 10px;top: -9px;width: 400px;">';
        html += '<div class="ui-field-contain">';
        html += '<label for="slider-' + count + '" style="margin-right:-25px;">Точки:</label>';
        html += '<input class="requited_slider" name="slider-' + count + '" id="slider-' + count + '" data-mini="true" min="-50" max="100" value="0" type="range">';
        html += '</div>';
        html += '</form>';
        html += '</h3>';
        html += '<div><pre>';
        html += value.description;
        html += '</pre></div>';
        html += '</div>';

        count++;
    })

    html += '</div>';

    $('.required-wrap').append(html);


    var optional = json.optional;

    var html = '';

    var count = 1;
    $.each(optional, function (key, value) {
        html += '<tr>';
        html += '<th>' + count + '</th>';
        html += '<th>' + value.description + '</th>';

        html += '<td>';
        html += '<form>';
        html += '<select class="zadacha" name="flip-' + count + '" id="flip-' + count + '" data-role="flipswitch" data-theme="b" data-mini="true">';
        html += '<option value="0">Не</option>';
        html += '<option value="1">Да</option>';
        html += '</select>';
        html += '</form>';
        html += '</td>';
        html += '</tr>';

        count++;
    })

    $('.optional-wrap').append(html);

    var questions = json.questions;

    var html = '';

    var count = 1;
    $.each(questions, function (key, value) {
        html += '<tr>';
        html += '<th>' + count + '</th>';
        html += '<th>' + value.description + '</th>';
        html += '<td><textarea cols="40" rows="8" name="textarea-' + count + ' id="textarea-' + count + '" data-mini="true"></textarea></td>';
        html += '<td>';
        html += '<form>';
        html += '<select class="questions-flip" name="flip-q-' + count + '" id="flip-q-' + count + '" data-role="flipswitch" data-theme="b" data-mini="true">';
        html += '<option value="0">Не</option>';
        html += '<option value="1">Да</option>';
        html += '</select>';
        html += '</form>';
        html += '</td>';
        html += '</tr>';

        count++;
    })

    $('.questions-wrap').append(html);

    var count = 0;
    var unique = 0;
    $.each(json.images, function (key, image) {

        var column = '';

        if (count == 0) {
            column = 'a';
        }

        if (count == 1) {
            column = 'b';
        }

        if (count == 2) {
            column = 'c';
            count = 0;
        }

        if (count == 3) {
            column = 'd';
            count = 0;
        }

        var html = '<div class="ui-block-' + column + '">';
        html += '<div class="ui-bar ui-bar-a">';
        html += '<div style="height: 150px;overflow: hidden">';
        html += '<img src="file:///mnt/sdcard/scavenger/images/' + image + '" width="200" />';
        html += '</div>';


        html += '<div style="height: 150px;overflow: hidden"><img style="width:200px;" id="smallImage_' + unique + '" src="img/no_image.gif" /></div>';
        html += '<button onclick="capturePhotoWithFile(' + unique + ');">Снимай</button>';
        html += '<form>';
        html += '<input class="object-find" name="checkbox-mini-' + unique + '" id="checkbox-mini-' + unique + '" data-mini="true" type="checkbox">';
        html += '<label for="checkbox-mini-' + unique + '">Намерено</label>';
        html += '</form>';
        html += '</div>';
        html += '</div>';

        count++;
        unique++;
        if (count == 3) {
            count = 0;
        }

        $('.image_wrap').append(html).after(function () {
        });
    });
}

function calculate() {

    var result_required = 0;

    $('.required-wrap').find('.requited_slider').each(function () {
        result_required += parseInt($(this).val(), 10);
    });
    $('.result-required').text(result_required);

    var result_optional = 0;

    $('.zadacha').each(function () {
        if (parseInt($(this).val(), 10) == 1) {
            result_optional += 20;
        }
    });

    $('.result-optional').text(result_optional);

    var result_questions = 0;

    $('.questions-flip').each(function () {
        if (parseInt($(this).val(), 10) == 1) {
            result_questions += 10;
        }
    });

    $('.result-question').text(result_questions);

    var result_objects = 0;

    $('.object-find').each(function () {
        if (parseInt($(this).val(), 10) == 1) {
            result_objects += 40;
        }
    });

    $('.result-objects').text(result_objects);



}
