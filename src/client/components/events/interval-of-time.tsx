import * as React from 'react';
import { Link } from 'react-router';
import * as cx from 'classnames';
import {EVENT_MIN_SPACE, timelineBlue, timelineLightBlue, timelineLighestBlue} from '../../constants';

const percentageOfDateInEvent = (date: Date, event: IEvent): number => {
	return (date.getTime() - event.from.getTime()) / (event.to.getTime() - event.from.getTime());
};


const IntervalOfTime = ({ event, isNewEvent = false }) => {
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
			style={style}
			title={event.title}
		>
			{
				isNewEvent ?
					<div className="handles">
						<div className="w-resize-handle" />
						<div className="move-handle">
							<div
								className={cx('title', event.types, {
									fill: event.width > EVENT_MIN_SPACE,
								})}
							>
								{event.title}
							</div>
						</div>
						<div className="e-resize-handle" />
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
};

export default IntervalOfTime;
