import * as React from 'react';
import * as cx from 'classnames';
import { extractFromAndTo, proportionalDate } from '../../utils/dates';
const Input = require('hire-forms-input').default;
const Select = require('hire-forms-select').default;

interface INewEventProps extends IEventBoxProps {
	title: string;
	root: IEvent;
}

// TODO make fromDate and toDate Date instead of string
interface INewEventState {
	fromDate?: string;
	toDate?: string;
	type?: string;
}

class NewEvent extends React.Component<INewEventProps, INewEventState> {
	public state = (() => {
		const [from, to] = extractFromAndTo(this.props.root.dateRange);
		return ({
			fromDate: proportionalDate(from, to, 0.5).toISOString(),
			toDate: null,
			type: 'Point in time',
		});
	})();

	public render() {
		return (
			<div className="new-event">
				<div className="new-event-slide-area">
					<div
						className={cx('handle', this.state.type.toLowerCase().replace(/\s/g, '-'))}
						style={{
							left: this.props.eventLeftPosition(new Date(this.state.fromDate)),
						}}
					>
						<span className="title">{this.props.title}</span>
					</div>
				</div>
				<div className="form">
					<Select
						onChange={this.handleChangeType}
						value={this.state.type}
						options={['Point in time', 'Interval of time']}
					/>
					<Input
						onChange={(fromDate) => this.setState({ fromDate })}
						value={this.state.fromDate}
					/>
					{
						(this.state.type === 'Interval of time') ?
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
