/*global ko*/

var SPEEDTEST = this.SPEEDTEST || {};

(function () {
    "use strict";
    var speedtestViewModel = new SPEEDTEST.speedtestViewModel();

    ko.applyBindings(speedtestViewModel);
}());