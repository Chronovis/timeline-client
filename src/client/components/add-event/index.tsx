import * as React from 'react';
import { connect } from 'react-redux';
import history from '../../routes/history';
import NewEvent from './new-event';
import { setEventKeyValues } from '../../actions/events';
import { proportionalDate } from '../../utils/dates';
const Input = require('hire-forms-input').default;

interface IAddEventProps extends IEventFunctions {
	newEvent: IEvent;
	params: {
		slug: string;
	};
	root: IEvent;
	setEventKeyValues: (keyValues: IKeyValues) => void;
}

class AddEvent extends React.Component<IAddEventProps, {}> {
	public state = {
		editTitle: true,
		title: '',
	};

	private rootElement;

	public componentDidMount() {
		document.addEventListener('click', this.handleDocumentClick);
	}

	public componentWillUnmount() {
		document.removeEventListener('click', this.handleDocumentClick);
	}

	public render() {
		const {
			dateAtLeftPosition,
			eventLeftPosition,
			eventWidth,
			flipPointInTime,
			newEvent,
			root,
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
							dateAtLeftPosition={dateAtLeftPosition}
							eventLeftPosition={eventLeftPosition}
							eventWidth={eventWidth}
							flipPointInTime={flipPointInTime}
							newEvent={newEvent}
							root={root}
							setEventKeyValues={setEventKeyValues}
						/>
				}
			</div>
		);
	}

	private handleDocumentClick = (ev) => {
		if (
			!(
				this.rootElement.contains(ev.target) ||
				this.rootElement === ev.target ||
				ev.target.matches('li.hire-forms-option')
			)
		) {
			history.push(`/timelines/${this.props.params.slug}`);
		}
	}

	private handleKeyUp = (ev) => {
		if (ev.keyCode === 13) {
			this.props.setEventKeyValues({
				date: proportionalDate(this.props.root, 0.5),
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
		setEventKeyValues,
	}
)(AddEvent);
