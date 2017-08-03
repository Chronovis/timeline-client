import * as React from 'react';
import IntervalOfTime from './interval-of-time';
import PointInTime from './point-in-time';
import {EVENT_MIN_SPACE, EVENT_ROW_HEIGHT} from '../../constants';

interface IEventsProps {
	events: IEvent[];
	root: IRootEvent;
}

class Events extends React.Component<IEventsProps, {}> {
	public render() {
		return (
			<ul className="events">
				{
					this.props.events.map((event, index) =>
						(event.isInterval()) ?
							<IntervalOfTime
								event={event}
								key={index}
							/> :
							<PointInTime
								event={event}
								key={index}
							/>
					)
				}
			</ul>
		);
	}
}

export default Events;