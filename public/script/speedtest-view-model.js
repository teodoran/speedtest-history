/*jslint nomen:true*/
/*global ko, setInterval, $, _*/

var SPEEDTEST = this.SPEEDTEST || {};

(function (namespace) {
    "use strict";
    namespace.speedtestViewModel = function() {
        var self = this;

        self.speedtestData = ko.observableArray();

        $.get("/speedtest.log", function (log) {
            _.chain(log.split('New speedtest:'))
                .without('')
                .map(function (logPoint) {
                    var download = logPoint.split('Download: ')[1] || '00.00',
                        upload = logPoint.split('Upload: ')[1] || '00.00';

                    self.speedtestData.push({
                        'date': new Date(logPoint.substring(1, 22)),
                        'download': parseFloat(download.substring(0, 5)),
                        'upload': parseFloat(upload.substring(0, 5))
                    });
                });
        });
    };
}(SPEEDTEST));