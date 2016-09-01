import * as React from 'react';
import * as cx from 'classnames';
import { Link } from 'react-router';
import { extractFrom } from '../utils/dates';

// TODO move PointInTime and IntervalOfTime to seperate files

const PointInTime = ({ event, flipPointInTime, left }) => {
	const [flip, distance] = flipPointInTime(left);
	const style = flip ?
		{ right: `${distance}px`} :
		{ left: `${distance}px` };

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
			<Link
				to={`/timelines/${event.slug}`}
				className={cx(event.types)}
			>
				{event.title}
			</Link>
		</li>
	);
};

interface IEventsProps extends IEventBoxProps {
	events: IEvent[];
	root: IEvent;
}

class Events extends React.Component<IEventsProps, {}> {
	public render() {
		const { eventLeftPosition, events, eventWidth, flipPointInTime } = this.props;

		// TODO use extractFrom in left={}
		return (
			<ul className="events">
				{
					events.map((event, index) =>
						(event.isInterval) ?
							<IntervalOfTime
								event={event}
								key={index}
								left={eventLeftPosition(extractFrom(event))}
								width={eventWidth(event)}
							/> :
							<PointInTime
								{...this.props}
								event={event}
								flipPointInTime={flipPointInTime}
								key={index}
								left={eventLeftPosition(extractFrom(event))}
							/>
					)
				}
			</ul>
		);
	}
}

export default Events;
