import * as React from 'react';
import history from '../../store/history';
import * as cx from 'classnames';
import {EVENT_MIN_SPACE, timelineBlue, timelineLightestBlue} from '../../constants';
import styled from "styled-components";
import {eventCSS, intervalOfTimeCSS} from './event';
import {IEvent} from "../../models/event";

const percentageOfDateInEvent = (date: Date, event: IEvent): number => {
	return (date.getTime() - event.from.getTime()) / (event.to.getTime() - event.from.getTime());
};


interface IProps {
	className?: string;
	event: IEvent;
	key?: number;
	isNewEvent?: boolean;
	onHandleMouseDown?: (string, number) => void;
}

const IntervalOfTimeLink = styled.a`
	color: #DDD;
	cursor: pointer;
	text-decoration: none;
	background: rgba(0, 0, 0, 0.4);
	border-radius: 2px;
	box-sizing: border-box;
	max-width: ${(props: {event: IEvent}) =>
		props.event.width > EVENT_MIN_SPACE ? 'calc(100% - 8px)' : EVENT_MIN_SPACE
	};
	overflow: hidden;
	right: ${(props: {event: IEvent}) =>
		props.event.flip ? '4px' : 'initial'
	};
	text-overflow: ellipsis;
	padding: 0 4px;
	position: absolute;
`;

// &.fill
// max-width calc(100% - 8px)

class IntervalOfTimeComp extends React.Component<IProps, null> {
	public render() {
		const { event, isNewEvent } = this.props;
		// const style = {
		// };
		//
		// if (event.dateRangeUncertain != null) {
		// 	const percFrom = percentageOfDateInEvent(event.dateRangeUncertain.from, event);
		// 	const percTo = percentageOfDateInEvent(event.dateRangeUncertain.to, event);
		// 	style.background = `linear-gradient(to right, ${timelineBlue}, ${timelineLightestBlue} ${percFrom * 100}%, ${timelineLightestBlue} ${percTo * 100}%, ${timelineBlue})`;
		// }

		return (
			<li className={this.props.className}>
				{
					isNewEvent ?
						<div className="handles">
							<div className="w-resize-handle"/>
							{isNewEvent && event.isUncertain() ? <div className="uncertain-w-resize-handle"/> : null}
							<div className="move-handle">
								<div
									className={cx('title', event.types, {
										fill: event.width > EVENT_MIN_SPACE,
									})}
								>
									{event.title}
								</div>
							</div>
							{isNewEvent && event.isUncertain() ? <div className="uncertain-e-resize-handle"/> : null}
							<div className="e-resize-handle"/>
						</div> :
						<IntervalOfTimeLink
							event={event}
							onClick={() => history.push(`/timelines/${event.slug}`)}
						>
							{event.title}
						</IntervalOfTimeLink>
				}
			</li>
		);
	}

	private handleMouseDown = (ev) => {
		let handle;
		if (ev.target.matches('div.uncertain-w-resize-handle')) {
			handle = 'west-resize';
		} else if (ev.target.matches('div.uncertain-e-resize-handle')) {
			handle = 'east-resize';
		} else if (ev.target.matches('div.w-resize-handle')) {
				handle = 'west-resize';
		} else if (ev.target.matches('div.e-resize-handle')) {
			handle = 'east-resize';
		} else if (
			ev.target.matches('li.interval-of-time') ||
			ev.target.matches('.move-handle') ||
			ev.target.matches('.move-handle .title')
		) {
			handle = 'move';
		}

		this.props.onHandleMouseDown(handle, ev.pageX);
	};
}

const IntervalOfTime = styled(IntervalOfTimeComp)`
	${eventCSS}
	${intervalOfTimeCSS}
	
	background: ${props => {
		if (props.event.dateRangeUncertain != null) {
			const percFrom = percentageOfDateInEvent(props.event.dateRangeUncertain.from, props.event);
			const percTo = percentageOfDateInEvent(props.event.dateRangeUncertain.to, props.event);
			return `linear-gradient(to right, ${timelineBlue}, ${timelineLightestBlue} ${percFrom * 100}%, ${timelineLightestBlue} ${percTo * 100}%, ${timelineBlue})`;
		} else {
			return timelineLightestBlue;
		}
	}};
	left: ${props => props.event.left}px;
	top: ${props => props.event.top}px;
	width: ${props => props.event.width}px;
`;

export default IntervalOfTime;
// <Event
// 	className={cx(this.props.className, 'interval-of-time', { flip: event.flip })}
// 	onMouseDown={isNewEvent && this.handleMouseDown}
// 	style={style}
// 	title={event.title}
// >


// className={cx(event.types, {
// 	fill: event.width > EVENT_MIN_SPACE,
// })}
