import * as React from 'react';
import {
	extractFromAndTo,
	proportionalDate,
	extractFrom,
	extractTo,
} from '../../utils/dates';
import Handle from './handle';
const Input = require('hire-forms-input').default;
const Select = require('hire-forms-select').default;

interface INewEventProps extends IEventBoxProps {
	newEvent: IEvent;
	root: IEvent;
	setEventKeyValues: (keyValues: IKeyValues) => void;
}

class NewEvent extends React.Component<INewEventProps, {}> {
	public handleChangeEventType = (value) => {
		const [from, to] = extractFromAndTo(this.props.root);

		const keyValues = (value === 'Point in time') ?
			{
				date: proportionalDate(from, to, 0.5),
				dateRange: null,
				dateRangeUncertain: null,
				dateUncertain: null,
				isInterval: false,
			} :
			{
				date: null,
				dateRange: {
					from: proportionalDate(from, to, 0.45),
					to: proportionalDate(from, to, 0.55),
				},
				dateRangeUncertain: null,
				dateUncertain: null,
				isInterval: true,
			};

		this.props.setEventKeyValues(keyValues)
	};

	public render() {
		const { eventLeftPosition, eventWidth, newEvent } = this.props;

		return (
			<div className="new-event">
				<div className="new-event-slide-area">
					<Handle
						event={newEvent}
						eventLeftPosition={eventLeftPosition}
						eventWidth={eventWidth}
					/>
				</div>
				<div className="form">
					<Select
						onChange={this.handleChangeEventType}
						value={newEvent.isInterval ? 'Interval of time' : 'Point in time'}
						options={['Point in time', 'Interval of time']}
					/>
					<Input
						onChange={(from: string) => console.log()}
						value={extractFrom(newEvent).toISOString()}
					/>
					{
						(newEvent.isInterval) ?
							<Input
								onChange={(to: string) => console.log()}
								value={extractTo(newEvent).toISOString()}
							/> :
							null
					}
				</div>
			</div>
		);
	}
}

export default NewEvent;
