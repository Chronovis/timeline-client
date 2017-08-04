import * as React from 'react';
import * as Constants from '../../constants';
import styled from "styled-components";
import {eventCSS} from "./event";
import {IEvent} from "../../models/event";
import {EVENT_MIN_SPACE, timelineBlue} from "../../constants";

interface IPointInTimeStyle {
	left?: string;
	right?: string;
	top?: string;
}

const Point = styled.div`
	background: ${(props: {event: IEvent}) =>
		props.event.isUncertain() ? `linear-gradient(to right, white, ${timelineBlue}, white)` : 'initial'
	}; 
	display: inline-block;
	line-height: 26px;
	text-align: center;
	vertical-align: top;
	width: ${(props: {event: IEvent}) =>
		props.event.width > 0 ? `${props.event.width}px` : 'initial'
	};
	
	&:before {
		content: '| ';
	}	
`;

const Title = styled.div`
	display: inline-block;
	line-height: 26px;
	margin-left: ${(props: {event: IEvent}) =>
		(props.event.width > 0) ? `${(props.event.width / -2)}px` : 'initial'
	};
	max-width: calc(${EVENT_MIN_SPACE}px - 12px);
	overflow: hidden;
	padding-left: ${(props: {event: IEvent}) =>
		props.event.isUncertain() ? '12px' : 'initial'
	};
	text-overflow: ellipsis;
`;

class PointInTimeComp extends React.Component<any, any> {
	public render() {
		const { event, isNewEvent } = this.props;
		// const {flip, left, title, top, types, width} = event;
		//
		// const style: IPointInTimeStyle = flip ?
		// 	{right: `${Constants.timelineWidth() - left}px`} :
		// 	{left: `${left}px`};

		// style.top = `${top}px`;

		// if (width > 0 && width < 12) event.width = 12;
		// const pointStyle = (width > 0) ? {width: `${width}px`} : null;
		// const titleStyle = (width > 0) ? {marginLeft: `${(width / -2)}px`} : null;

		return (
			<li
				className={this.props.className}
				onMouseDown={this.handleMouseDown}
				title={event.title}
			>
				{
					isNewEvent && event.isUncertain() ?
						<div
							className="uncertain-w-resize-handle"
						/> :
						null
				}
				{event.flip ? null : <Point event={event} />}
				<Title event={event}>
					{event.title}
				</Title>
				{event.flip ? <Point event={event} /> : null}
				{
					isNewEvent && event.isUncertain() ?
						<div
							className="uncertain-e-resize-handle"
						/> :
						null
				}
			</li>
		);
	};

	private handleMouseDown = (ev) => {
		let handle;
		if (ev.target.matches('div.uncertain-w-resize-handle')) {
			handle = 'west-resize';
		} else if (ev.target.matches('div.uncertain-e-resize-handle')) {
			handle = 'east-resize';
		} else if (ev.target.matches('li.point-in-time') || ev.target.matches('li.point-in-time *')) {
			handle = 'move';
		}

		this.props.onHandleMouseDown(handle, ev.pageX);
	};
}

const PointInTime = styled(PointInTimeComp)`
	${eventCSS}
	padding-left: ${(props: {event: IEvent}) =>
		props.event.isUncertain() ? 'initial' : '12px'
	};
	padding-right: ${(props: {event: IEvent}) =>
		props.event.flip ? '12px' : 'intitial'
	};
	left: ${props =>
		props.event.flip ? 'initial' : `${props.event.left}px`
	};
	right: ${props =>
		props.event.flip ? `${Constants.timelineWidth() - props.event.left}px` : 'initial'
	};
	top: ${props => props.event.top}px;
	width: ${props =>
		props.event.width > 0 && props.event.width < 12 ? '12' : props.event.width
	}px;
`;

export default PointInTime;
