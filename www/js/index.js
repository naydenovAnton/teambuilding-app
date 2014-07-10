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

function gotFile(file){
    readAsText(file);
}

function readAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
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
    $('.score-wrap').text(json.scores);
}
