import * as React from 'react';
import IntervalOfTime from './interval-of-time';
import PointInTime from './point-in-time';

interface IEventsProps {
	events: IEvent[];
	root: IEvent;
}

class Events extends React.Component<IEventsProps, {}> {
	public addRowData() {
		const rowData = [];
		const calc = (event) => {
			// for (let i = 0; i < rowData.length; i++) {
			//
			// }
			return event;
		};
		return this.props.events.map(calc);
	}

	public render() {
		const events = this.addRowData();

		return (
			<ul className="events">
				{
					events.map((event, index) =>
						(event.isInterval) ?
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
