import * as React from 'react';
import { connect } from 'react-redux';
import NewEvent from './new-event';
import { setEventKeyValues, resetEvent, saveEvent } from '../../actions/events';
import { proportionalDate } from '../../utils/dates';
const Input = require('hire-forms-input').default;

interface IAddEventProps {
	newEvent: IEvent;
	resetEvent: () => void;
	root: IEvent;
	saveEvent: () => void;
	setEventKeyValues: (keyValues: IKeyValues) => void;
}

class AddEvent extends React.Component<IAddEventProps, {}> {
	public state = {
		editTitle: true,
		title: '',
	};

	private rootElement;

	public render() {
		const {
			newEvent,
			resetEvent,
			root,
			saveEvent,
			setEventKeyValues,
		} = this.props;

		return (
			<div
				className="add-event"
				ref={(el) => { if (el != null) this.rootElement = el; }}
			>
				{
					(newEvent.title === '') ?
						<Input
							onChange={(v) => this.setState({ title: v })}
							onKeyUp={this.handleKeyUp}
							placeholder="Title of new event..."
							value={this.state.title}
						/> :
						<NewEvent
							newEvent={newEvent}
							resetEvent={resetEvent}
							root={root}
							saveEvent={saveEvent}
							setEventKeyValues={setEventKeyValues}
						/>
				}
			</div>
		);
	}

	private handleKeyUp = (ev) => {
		if (ev.keyCode === 13) {
			this.props.setEventKeyValues({
				date: proportionalDate(this.props.root, 0.5).toISOString(),
				title: this.state.title,
			});
		}
	};
}

export default connect(
	state => ({
		newEvent: state.events.newEvent,
		root: state.events.root,
	}), {
		resetEvent,
		saveEvent,
		setEventKeyValues,
	}
)(AddEvent);
