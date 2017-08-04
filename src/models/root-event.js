"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = require("../constants");
var DateUtils = require("../utils/dates");
var base_event_1 = require("./base-event");
var RootEvent = (function (_super) {
    __extends(RootEvent, _super);
    function RootEvent(data) {
        var _this = _super.call(this, data) || this;
        _this.pixelsPerDay = null;
        _this.pixelsPerDay = Constants.timelineWidth() / _this.countDays();
        return _this;
    }
    RootEvent.prototype.leftPositionAtDate = function (date) {
        return DateUtils.countDays(this.from, date) * this.pixelsPerDay;
    };
    RootEvent.prototype.dateAtLeftPosition = function (position) {
        return this.dateAtProportion(position / Constants.timelineWidth());
    };
    RootEvent.prototype.dateAtProportion = function (proportion) {
        if (proportion < 0 || proportion > 1)
            throw new Error('[dateAtProportion] proportion should be between 0 and 1.');
        var fromTime = this.from.getTime();
        var toTime = this.to.getTime();
        var newTime = fromTime + ((toTime - fromTime) * proportion);
        return new Date(newTime);
    };
    ;
    return RootEvent;
}(base_event_1.default));
exports.default = RootEvent;
