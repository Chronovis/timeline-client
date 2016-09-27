import * as Constants from '../constants';
import * as DateUtils from '../utils/dates';
import BaseEvent from './base-event';

class RootEvent extends BaseEvent implements IRootEvent {
	private pixelsPerDay = null;

	constructor(data) {
		super(data);
		this.pixelsPerDay = Constants.timelineWidth() / this.countDays();
	}

	public leftPositionAtDate(date: Date): number {
		return DateUtils.countDays(this.from, date) * this.pixelsPerDay;
	}
}

export default RootEvent;
