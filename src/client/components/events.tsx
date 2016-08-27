import * as React from 'react';
import * as cx from 'classnames';
import { Link } from 'react-router';
import { countDays, countDaysInRange } from '../utils/dates';

const PointInTime = ({ event, root, pixelsPerDay, timelineWidth }) => {
	const toDate =  event.date != null ? event.date : event.dateUncertain.from;
	const left = countDays(root.dateRange.from, toDate) * pixelsPerDay;
	const flip = left > (timelineWidth - 240);
	const style = flip ?
		{ right: `${timelineWidth - left }px`} :
		{ left: `${left}px` };

	return (
		<li
			className={cx('point-in-time', { flip }, event.types)}
			style={style}
			title={event.title}
		>
			{event.title}
		</li>
	);
};

const IntervalOfTime = ({ event, root, pixelsPerDay }) => {
	return (
		<li
			className="interval-of-time"
			style={{
				left: `${countDays(root.dateRange.from, event.dateRange.from) * pixelsPerDay}px`,
				width: `${countDaysInRange(event.dateRange) * pixelsPerDay}px`,
			}}
			title={event.title}
		>
			<Link to={`/timelines/${event.slug}`}>{event.title}</Link>
		</li>
	);
};

interface IEventsProps {
	events: IEvent[];
	pixelsPerDay: number;
	root: IEvent;
	timelineWidth: number;
}

class Events extends React.Component<IEventsProps, {}> {
	public render() {
		const { events, root } = this.props;

		return (
			<ul className="events">
				{
					events.map((event, index) =>
						(event.date != null || event.dateUncertain != null) ?
							<PointInTime
								{...this.props}
								event={event}
								key={index}
								root={root}
							/> :
							<IntervalOfTime
								{...this.props}
								event={event}
								key={index}
								root={root}
							/>
					)
				}
			</ul>
		);
	}
}

export default Events;
