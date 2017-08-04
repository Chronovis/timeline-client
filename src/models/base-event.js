"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateUtils = require("../utils/dates");
var BaseEvent = (function () {
    function BaseEvent(data) {
        var _this = this;
        this.body = '';
        this.coordinates = [];
        this.date = null;
        this.dateRange = null;
        this.dateRangeUncertain = null;
        this.dateUncertain = null;
        this.from = null;
        this.to = null;
        this.slug = '';
        this.title = '';
        this.types = [];
        this.dateGranularity = 2 /* DAY */;
        this.dateRangeGranularity = null;
        this.formatDate = function (dateToFormat) {
            var date = _this.date;
            var granularity = _this.dateGranularity;
            if (date == null) {
                if (_this.dateUncertain != null) {
                    var from = DateUtils.format(_this.dateUncertain.from, _this.dateGranularity);
                    var to = DateUtils.format(_this.dateUncertain.to, _this.dateRangeGranularity);
                    return from + " - " + to;
                }
                else if (dateToFormat == null) {
                    throw new Error('[formatDate] Unknown date to format!');
                }
                else {
                    granularity = (dateToFormat === 'from') ?
                        _this.dateGranularity :
                        _this.dateRangeGranularity;
                    if (_this.dateRangeUncertain == null) {
                        date = _this.dateRange[dateToFormat];
                    }
                    else {
                        if (DateUtils.isEqual(_this.dateRange[dateToFormat], _this.dateRangeUncertain[dateToFormat])) {
                            date = _this.dateRangeUncertain[dateToFormat];
                        }
                        else {
                            var from = DateUtils.format(_this.dateRange[dateToFormat], granularity);
                            var to = DateUtils.format(_this.dateRangeUncertain[dateToFormat], granularity);
                            return from + " - " + to;
                        }
                    }
                }
            }
            return DateUtils.format(date, granularity);
        };
        Object.assign(this, data);
        this.setTo();
        this.setFrom();
    }
    BaseEvent.prototype.countDays = function () {
        return DateUtils.countDays(this.from, this.to);
    };
    BaseEvent.prototype.formatFromDate = function () {
        return this.formatDate('from');
    };
    BaseEvent.prototype.formatToDate = function () {
        return this.formatDate('to');
    };
    BaseEvent.prototype.isInterval = function () {
        return this.dateRange != null;
    };
    BaseEvent.prototype.isUncertain = function () {
        return this.dateUncertain != null || this.dateRangeUncertain != null;
    };
    BaseEvent.prototype.setFrom = function () {
        this.from = (this.dateRange != null) ?
            this.dateRange.infiniteFrom ?
                new Date(-4713, 0, 1) :
                this.dateRange.from :
            this.date != null ?
                this.date :
                (this.dateUncertain != null) ?
                    this.dateUncertain.from :
                    null;
    };
    BaseEvent.prototype.setTo = function () {
        this.to = (this.dateRange != null) ?
            this.dateRange.infiniteTo ?
                new Date() :
                this.dateRange.to :
            (this.dateUncertain != null) ?
                this.dateUncertain.to :
                null;
    };
    return BaseEvent;
}());
exports.default = BaseEvent;
