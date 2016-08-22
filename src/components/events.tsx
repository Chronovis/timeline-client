import * as React from 'react';
import { Link } from 'react-router';
import { countDays, countDaysInRange } from '../utils/dates';

const PointInTime = ({ event, root, pixelsPerDay }) =>
	<li
		className="point-in-time"
		style={{
				left: `${countDays(root.dateRange.from, event.date != null ? event.date : event.dateUncertain.from) * pixelsPerDay}px`,
			}}
	>
		{event.title}
	</li>;

const IntervalOfTime = ({ event, root, pixelsPerDay }) => {
	return (
		<li
			className="interval-of-time"
			style={{
				left: `${countDays(root.dateRange.from, event.dateRange.from) * pixelsPerDay}px`,
				width: `${countDaysInRange(event.dateRange) * pixelsPerDay}px`,
			}}
		>
			<Link to={`/timelines/${event.slug}`}>{event.title}</Link>
		</li>
	);
};

interface IEventsProps {
	root: IEvent;
	events: IEvent[];
}

interface IEventsState {
	pixelsPerDay: number;
}

// TODO width of <ul class="events"> is 95% of clientWidth
const pixelsPerDay = (root: IEvent): number => {
	const clientWidth = document.documentElement.clientWidth;
	const daysCount = countDaysInRange(root.dateRange);

	return clientWidth / daysCount;
};

class Events extends React.Component<IEventsProps, IEventsState> {
	public state = {
		pixelsPerDay: pixelsPerDay(this.props.root),
	};

	public render() {
		const { events, root } = this.props;

		return (
			<ul className="events">
				{
					events.map((event, index) =>
						(event.date != null || event.dateUncertain != null) ?
							<PointInTime
								{...this.state}
								event={event}
								key={index}
								root={root}
							/> :
							<IntervalOfTime
								{...this.state}
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
