import * as React from 'react';
import { Link } from 'react-router-dom';
import * as cx from 'classnames';
import {EVENT_MIN_SPACE, timelineBlue, timelineLighestBlue} from '../../constants';

const percentageOfDateInEvent = (date: Date, event: IEvent): number => {
	return (date.getTime() - event.from.getTime()) / (event.to.getTime() - event.from.getTime());
};

class IntervalOfTime extends React.Component<any, any> {
	public render() {
		const { event, isNewEvent } = this.props;
		const style = {
			background: null,
			left: `${event.left}px`,
			top: `${event.top}px`,
			width: `${event.width}px`,
		};

		if (event.dateRangeUncertain != null) {
			const percFrom = percentageOfDateInEvent(event.dateRangeUncertain.from, event);
			const percTo = percentageOfDateInEvent(event.dateRangeUncertain.to, event);
			style.background = `linear-gradient(to right, ${timelineBlue}, ${timelineLighestBlue} ${percFrom * 100}%, ${timelineLighestBlue} ${percTo * 100}%, ${timelineBlue})`;
		}

		return (
			<li
				className={cx('interval-of-time', { flip: event.flip })}
				onMouseDown={isNewEvent && this.handleMouseDown}
				style={style}
				title={event.title}
			>
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
						<Link
							className={cx(event.types, {
								fill: event.width > EVENT_MIN_SPACE,
							})}
							to={`/timelines/${event.slug}`}
						>
							{event.title}
						</Link>
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

export default IntervalOfTime;
