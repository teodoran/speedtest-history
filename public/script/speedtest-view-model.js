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
                    self.speedtestData.push({
                        'date': new Date(logPoint.substring(1, 22)),
                        'download': parseFloat(logPoint.split('Download: ')[1].substring(0, 5)),
                        'upload': parseFloat(logPoint.split('Upload: ')[1].substring(0, 5))
                    });
                });
        });
    };
}(SPEEDTEST));