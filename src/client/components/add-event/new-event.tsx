import * as React from 'react';
import * as cx from 'classnames';
import {middleDate, extractFromAndTo} from '../../utils/dates';
const Input = require('hire-forms-input').default;
const Select = require('hire-forms-select').default;

interface INewEventProps {
	title: string;
	root: IEvent;
}

interface INewEventState {
	fromDate?: string;
	toDate?: string;
	type?: string;
}

class NewEvent extends React.Component<INewEventProps, INewEventState> {
	public state = (() => {
		const [from, to] = extractFromAndTo(this.props.root.dateRange);
		return ({
			fromDate: middleDate(from, to).toISOString(),
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
		const toDate = (type === 'Interval of time') ?
			new Date().toISOString() :
			null;

		this.setState({
			toDate,
			type,
		});
	}
}

export default NewEvent;
