$(document).ready(function() {
    app.init();
});

var app = (function(app) {
    var _fileList = [];
    var _currentSelectedIndex;
    app.init = function() {
        var ajaxObj = {
            url: '/filelist',
            type: 'get'
        };
        _dataProvider(ajaxObj).done(function(response) {
            console.log(response);
            $('#program-list').empty();
            if(Array.isArray(response)) {
                _fileList = response;
                _fileList.forEach(function(fileName) {
                    $('#program-list').append('<option>' + fileName + '</option>');
                });
                app.changeContent();
            }
        });
    };

    app.changeContent = function() {
        var select = $('#program-list')[0];
        if(_currentSelectedIndex != select.selectedIndex) {
            _currentSelectedIndex = select.selectedIndex;
            var fileName = select.options[select.selectedIndex].text;
            app.getSourceFile(fileName);
        }
    };

    app.getSourceFile = function(fileName) {
        var ajaxObj = {
            url: '/src',
            type: 'get',
            data: {'fileName': fileName}
        };
        _dataProvider(ajaxObj).done(function(response) {
            $('#code')[0].value = response;
            $('#output')[0].srcdoc = response;
        });
    };

    var _dataProvider = function(ajaxObj) {
        var promise = $.ajax({
            url: ajaxObj.url,
            type: ajaxObj.type,
            data: ajaxObj.data
        });
        return promise;
    };

    app.runCode = function() {
        $('#output')[0].srcdoc = $('#code')[0].value;
    };

    return app;

})({});