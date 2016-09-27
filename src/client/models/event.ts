import BaseEvent from './base-event';
import * as Constants from '../constants';

class Event extends BaseEvent implements IEvent {
	public flip = null;
	public left = null;
	public top = null;
	public width = null;
	private root = null;

	constructor(data, root) {
		super(data);
		this.root = root; // TODO remove this.root? Root is only used in the constructor
		this.left = this.root.leftPositionAtDate(this.from);
		this.flip = (this.left + Constants.EVENT_MIN_SPACE > Constants.timelineWidth()) ? true : false;

		const width = this.countDays() * this.root.pixelsPerDay;
		this.width = (width > 0 && width < 12) ? 12 : width;
	}

	/**
	 * The space of an event is the left position and the width of the event.
	 * The width differs from this.width() that this.space() takes the label into account.
	 *
	 * @returns {[number, number]} The first element is the left position, the second element the width.
	 */
	public space(): [number, number] {
		const minWidth = (w) => (w === 0 || w < Constants.EVENT_MIN_SPACE) ? Constants.EVENT_MIN_SPACE : w;
		const width = minWidth(this.width);

		if (this.flip) {
			return [this.left - width, width];
		} else {
			return [this.left, width];
		}
	}
}

export default Event;
