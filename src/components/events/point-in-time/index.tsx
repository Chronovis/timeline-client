import * as React from 'react';
import styled, {StyledFunction} from "styled-components";
import * as Constants from '../../../constants';
import {eventCSS} from "../event";
import {IEvent} from "../../../models/event";
import Point from "./point";
import Title from "./title";

export interface IPointInTime {
	className?: string;
	event: IEvent;
	isNewEvent?: boolean;
	onHandleMouseDown?: (string, number) => void;
	style?: any;
}

interface IPointInTimeContainer {
	event: IEvent;
}
const li: StyledFunction<IPointInTimeContainer & React.HTMLProps<HTMLUListElement | HTMLOListElement>> = styled.li;
export const PointInTimeContainer = li.attrs({
	// Use inline style, because the component is moved by the mouse in edit mode.
	style: (props: IPointInTime) => ({
		left: props.event.flip ? 'initial' : `${props.event.left}px`,
		paddingLeft: props.event.isUncertain() ? 'initial' : '12px',
		paddingRight: props.event.flip ? '12px' : 'intitial',
		right: props.event.flip ? `${Constants.timelineWidth() - props.event.left}px` : 'initial',
		width: props.event.width === 0 ?
			'initial' :
			props.event.width > 0 && props.event.width < 12 ?
				'12px' :
				`${props.event.width}px`
	}),
	title: (props: IPointInTime) => props.event.title,
})`
	${eventCSS}
	
	// Check if top prop exists. A new event does not have a top prop.
 	${props => props.event.top != null ? `top: ${props.event.top}px;` : ''}
`;


const PointInTime: React.StatelessComponent<IPointInTime> = (props) =>
	<PointInTimeContainer event={props.event}>
		{props.event.flip ? null : <Point event={props.event} />}
		<Title event={props.event}>
			{props.event.title}
		</Title>
		{props.event.flip ? <Point event={props.event} /> : null}
	</PointInTimeContainer>;

export default PointInTime;
