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
var base_event_1 = require("./base-event");
var Constants = require("../constants");
var Event = (function (_super) {
    __extends(Event, _super);
    function Event(data, root) {
        var _this = _super.call(this, data) || this;
        _this.flip = null;
        _this.left = null;
        _this.top = null;
        _this.width = null;
        _this.root = null;
        _this.root = root; // TODO remove this.root? Root is only used in the constructor
        _this.left = _this.root.leftPositionAtDate(_this.from);
        _this.flip = (_this.left + Constants.EVENT_MIN_SPACE > Constants.timelineWidth()) ? true : false;
        var width = _this.countDays() * _this.root.pixelsPerDay;
        _this.width = (width > 0 && width < 12) ? 12 : width;
        return _this;
    }
    /**
     * The space of an event is the left position and the width of the event.
     * The width differs from this.width() that this.space() takes the label into account.
     *
     * @returns {[number, number]} The first element is the left position, the second element the width.
     */
    Event.prototype.space = function () {
        var minWidth = function (w) { return (w === 0 || w < Constants.EVENT_MIN_SPACE) ? Constants.EVENT_MIN_SPACE : w; };
        var width = minWidth(this.width);
        var left = (this.flip) ? this.left - width : this.left;
        return [left, width];
    };
    return Event;
}(base_event_1.default));
exports.default = Event;
