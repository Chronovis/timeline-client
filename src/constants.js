"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timelineWidth = function () { return document.documentElement.clientWidth * 0.98; };
// The minimal space (in px) an event should take. This space can be bigger
// than the width of the event, to accommodate the text.
exports.EVENT_MIN_SPACE = 240;
// The height (in px) of a row of events.
exports.EVENT_ROW_HEIGHT = 32;
exports.timelineBlue = '#0091EA';
exports.timelineLightBlue = '#00B0FF';
exports.timelineLighterBlue = '#40C4FF';
exports.timelineLightestBlue = '#80D8FF';
