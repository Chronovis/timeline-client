"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countDays = function (from, to) {
    if (to == null)
        return 0;
    return Math.round(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
};
exports.isEqual = function (date1, date2) { return date1.getTime() === date2.getTime(); };
// export const extractFrom = (event): Date =>
// 	(event.isInterval) ?
// 		event.dateRange.infiniteFrom ? new Date(-4700, 0, 1) : event.dateRange.from :
// 		event.date != null ?
// 			event.date :
// 			(event.dateUncertain != null) ?
// 				event.dateUncertain.from :
// 				null;
//
// export const extractTo = (event): Date =>
// 	(event.isInterval) ?
// 		event.dateRange.infiniteTo ? new Date() : event.dateRange.to :
// 		(event.dateUncertain != null) ?
// 			event.dateUncertain.to :
// 			null;
//
// export const extractFromAndTo = (event: IEvent): [Date, Date] =>
// 	[extractFrom(event), extractTo(event)];
// export const countDaysInRange = (event: IEvent): number => {
// 	const [from, to] = extractFromAndTo(event);
// 	if (to == null) return null;
// 	return countDays(from, to);
// };
exports.format = function (date, granularity) {
    if (date == null)
        return '∞';
    var displayDate = date.getFullYear().toString();
    if (granularity >= 1 /* MONTH */) {
        var months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];
        displayDate = months[date.getMonth()] + " " + displayDate;
    }
    if (granularity >= 2 /* DAY */) {
        displayDate = date.getDay() + " " + displayDate;
    }
    if (granularity === 3 /* TIME */) {
        displayDate = date.getHours() + ":" + date.getMinutes() + " " + displayDate;
    }
    return displayDate;
};
