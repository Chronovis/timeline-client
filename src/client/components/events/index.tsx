import * as React from 'react';
import { extractFrom } from '../../utils/dates';
import IntervalOfTime from './interval-of-time';
import PointInTime from './point-in-time';

interface IEventsProps extends IEventFunctions {
	events: IEvent[];
	root: IEvent;
}

class Events extends React.Component<IEventsProps, {}> {
	public render() {
		const { eventLeftPosition, events, eventWidth, flipPointInTime } = this.props;

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
