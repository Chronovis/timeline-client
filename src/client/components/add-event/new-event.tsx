import * as React from 'react';
import * as cx from 'classnames';
import {middleDate, extractFromAndTo} from '../../utils/dates';
import { defaultState as defaultEvent } from '../../reducers/events';
const Input = require('hire-forms-input').default;
const Select = require('hire-forms-select').default;

interface INewEventProps extends IEventBoxProps {
	title: string;
	root: IEvent;
}

// interface INewEventState {
// 	fromDate?: string;
// 	toDate?: string;
// 	type?: string;
// }

class NewEvent extends React.Component<INewEventProps, IEvent> {
	// public state = (() => {
	// 	const [from, to] = extractFromAndTo(this.props.root.dateRange);
	// 	return ({
	// 		fromDate: middleDate(from, to).toISOString(),
	// 		toDate: null,
	// 		type: 'Point in time',
	// 	});
	// })();
	public state = defaultEvent.root;

	public render() {

		return (
			<div className="new-event">
				<div className="new-event-slide-area">
					<div
						className={cx('handle', {
							'interval-of-time': this.state.isInterval,
							'point-in-time': !this.state.isInterval,
						})}
					>
						<span className="title">{this.props.title}</span>
					</div>
				</div>
				<div className="form">
					<Select
						onChange={this.handleChangeType}
						value={this.state.isInterval ? 'Interval of time' : 'Point in time'}
						options={['Point in time', 'Interval of time']}
					/>
					<Input
						onChange={(fromDate) => this.setState({ fromDate })}
						value={this.state.fromDate}
					/>
					{
						(this.state.isInterval) ?
							<Input
								onChange={(toDate) => this.setState({ toDate })}
								value={this.state.toDate}
							/> :
							null
					}
				</div>
			</div>
		);
	}

	private handleChangeType = (type) => {
		const [from, to] = extractFromAndTo(this.props.root.dateRange);

		const nextState = (type === 'Interval of time') ?
			{
				fromDate: proportionalDate(from, to, 0.4).toISOString(),
				toDate: proportionalDate(from, to, 0.6).toISOString(),
			} :
			{
				fromDate: proportionalDate(from, to, 0.5).toISOString(),
				toDate: null,
			};

		this.setState(Object.assign(nextState, {type}));
	}
}

export default NewEvent;
