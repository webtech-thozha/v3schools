var express = require('express');
var app = express();

var fs = require('fs');
var path = require('path');
var programDir = './logical Programs/';

app.use('/style', express.static(__dirname + '/style'));
app.use('/js', express.static(__dirname + '/js'));

app.get('/', function(req, res) {

    res.sendFile(__dirname + '/index.html');
    
});

app.get('/filelist', function(req, res) {
    res.send(getFileList());
});

app.get('/src', function(req, res) {
    var fileList = fs.readdirSync(programDir);
    for(var i = 0;i < fileList.length;i++) {
        if(path.parse(fileList[i]).name == req.query.fileName) {
            res.send(getFile(fileList[i]));
            break;
        }
    }
});

var server = app.listen(8090, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});

function getFileList() {
    var fileList = fs.readdirSync(programDir);
    for(var i = 0;i < fileList.length;i++) {
        fileList[i] = path.parse(fileList[i]).name;
    }
    console.log(fileList);
    return fileList;
}

function getFile(fileBaseName) {
    var fileBuffer = fs.readFileSync(programDir + fileBaseName);
    return fileBuffer.toString();
}