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
        html += '</h3>';
        html += '<form style="position: absolute;right: 10px;top: -9px;width: 400px;">';
        html += '<div class="ui-field-contain">';
        html += '<label for="slider-' + count + '" style="margin-right:-25px;">Точки:</label>';
        html += '<input name="slider-' + count + '" id="slider-' + count + '" data-mini="true" min="0" max="100" value="0" type="range">';
        html += '</div>';
        html += '</form>';
        html += '</h3>';
        html += '<div>';
        html += value.description;
        html += '</div>';
        html += '</div>';

        count++;
    })

    html += '</div>';

    $('.required-wrap').html(html);
}
