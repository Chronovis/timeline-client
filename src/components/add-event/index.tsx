import * as React from 'react';
import { connect } from 'react-redux';
import history from '../../store/history';
import NewEvent from './new-event';
import { setEventKeyValues, resetEvent, saveEvent } from '../../actions/events';
import Input from 'hire-forms-input';
import {IKeyValues} from "../../reducers/index";
import {IEvent} from "../../models/event";
import {IRootEvent} from "../../models/root-event";
import styled from "styled-components";
import {timelineBlue} from "../../constants";

interface IAddEventProps {
	match: any;
	newEvent: IEvent;
	resetEvent: () => void;
	root: IRootEvent;
	saveEvent: () => void;
	setEventKeyValues: (keyValues: IKeyValues) => void;
}

const Wrapper = styled.div`
	background: ${timelineBlue};
	box-sizing: border-box;
	height: 30%;
	margin: 0 auto;
	padding: 1em 0;
	position: absolute;
	top: 35%;
	width: 100%;
`;

class AddEvent extends React.Component<IAddEventProps, {}> {
	public state = {
		title: '',
	};

	public render() {
		const {
			match,
			newEvent,
			resetEvent,
			root,
			saveEvent,
			setEventKeyValues,
		} = this.props;

		if (newEvent == null) return null;

		return (
			<Wrapper className="add-event-wrapper">
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
			</Wrapper>
		);
	}

	private handleKeyUp = (ev) => {
		if (ev.keyCode === 13) {
			this.props.setEventKeyValues({
				date: this.props.root.dateAtProportion(0.5),
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
