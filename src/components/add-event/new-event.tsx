import * as React from 'react';
import history from '../../store/history';
import Slider from './slider/index';
import Form from "./form/index";
import {IKeyValues} from "../../reducers/index";
import {IRootEvent} from "../../models/root-event";
import {IEvent} from "../../models/event";
import styled from "styled-components";

interface INewEventProps {
	newEvent: IEvent;
	resetEvent: () => void;
	root: IRootEvent;
	saveEvent: () => void;
	setEventKeyValues: (keyValues: IKeyValues) => void;
}

const SlideArea = styled.div`
	height: 30px;
	left: 1%;
	margin-bottom: 20px;
	position: relative;
	right: 1%;
`;

const Footer = styled.footer`
	bottom: 0;
	position: absolute;
`;

class NewEvent extends React.Component<INewEventProps, {}> {
	public render() {
		const {
			newEvent,
			resetEvent,
			root,
			saveEvent,
			setEventKeyValues,
		} = this.props;

		return (
			<div>
				<SlideArea>
					<Slider
						event={newEvent}
						root={root}
						setEventKeyValues={setEventKeyValues}
					/>
				</SlideArea>
				<Form
					event={newEvent}
					root={root}
					setEventKeyValues={setEventKeyValues}
				/>
				<Footer>
					<button
						onClick={() => {
							resetEvent();
							history.push(`/timelines/${root.slug}`);
						}}
					>
						Cancel
					</button>
					<button
						onClick={() => {
							saveEvent();
							history.push(`/timelines/${root.slug}`);
						}}
					>Save</button>
				</Footer>
			</div>
		);
	}
}

export default NewEvent;
