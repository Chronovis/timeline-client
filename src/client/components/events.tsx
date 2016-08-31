import * as React from 'react';
import * as cx from 'classnames';
import { Link } from 'react-router';
import { extractFrom } from '../utils/dates';

const PointInTime = ({ event, left, timelineWidth }) => {
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

const IntervalOfTime = ({ event, left, width }) => {
	return (
		<li
			className="interval-of-time"
			style={{
				left: `${left}px`,
				width: `${width}px`,
			}}
			title={event.title}
		>
			<Link to={`/timelines/${event.slug}`}>{event.title}</Link>
		</li>
	);
};

interface IEventsProps extends IEventBoxProps {
	events: IEvent[];
	root: IEvent;
	timelineWidth: number;
}

class Events extends React.Component<IEventsProps, {}> {
	public render() {
		const { eventLeftPosition, events, eventWidth } = this.props;

		return (
			<ul className="events">
				{
					events.map((event, index) =>
						(event.date != null || event.dateUncertain != null) ?
							<PointInTime
								{...this.props}
								event={event}
								key={index}
								left={eventLeftPosition(extractFrom(event))}
							/> :
							<IntervalOfTime
								event={event}
								key={index}
								left={eventLeftPosition(event.dateRange.from)}
								width={eventWidth(event)}
							/>
					)
				}
			</ul>
		);
	}
}

export default Events;
