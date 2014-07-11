var url = 'http://rcss.eu/work/hbuilding/admin/teamlist.php';

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
    },
    receivedEvent: function (id) {
        console.log('here');
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

function createJson(text) {
    var json = JSON.parse(text);

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
        html += '<input name="slider-' + count + '" id="slider-' + count + '" data-mini="true" min="0" max="100" value="0" type="range">';
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
        html += '<select name="flip-' + count + '" id="flip-' + count + '" data-role="flipswitch" data-theme="b" data-mini="true">';
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
        html += '<select name="flip-q-' + count + '" id="flip-q-' + count + '" data-role="flipswitch" data-theme="b" data-mini="true">';
        html += '<option value="0">Не</option>';
        html += '<option value="1">Да</option>';
        html += '</select>';
        html += '</form>';
        html += '</td>';
        html += '</tr>';

        count++;
    })

    $('.questions-wrap').append(html);
}
