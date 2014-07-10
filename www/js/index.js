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
        alert('here');
        loadFile();
    }
};

function loadFile() {
    alert('111');
    console.log('1');
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
    console.log('2');
    fileSystem.root.getFile("/sdcard/scavenger/data/config.txt", null, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    console.log('3');
    fileEntry.file(gotFile, fail);
}

function gotFile(file){
    console.log('4');
    readAsText(file);
}

function readAsText(file) {
    console.log('5');
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        console.log("Read as text");
        console.log(evt.target.result);
    };
    reader.readAsText(file);
}

function fail(evt) {
    console.log('6');
    console.log(evt.target.error.code);
}
