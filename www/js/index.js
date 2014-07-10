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
    alert('1');
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
    alert('2');
    fileSystem.root.getFile("/sdcard/scavenger/data/config.txt", null, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    alert('3');
    fileEntry.file(gotFile, fail);
}

function gotFile(file){
    alert('4');
    readAsText(file);
}

function readAsText(file) {
    alert('5');
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        alert("Read as text");
        alert(evt.target.result);
    };
    reader.readAsText(file);
}

function fail(evt) {
    alert('6');
    alert(evt.target.error.code);
}
