import * as React from 'react';
import { Link } from 'react-router';
import * as cx from 'classnames';
import {EVENT_MIN_SPACE, timelineBlue, timelineLightBlue, timelineLighestBlue} from '../constants';
import {extractFromAndTo} from "../../utils/dates";

const percentageOfDateInEvent = (date: Date, event: IEvent): number => {
	const [from, to] = extractFromAndTo(event);
	console.log(date, from, to)
	return (date.getTime() - from.getTime()) / (to.getTime() - from.getTime());
};


const IntervalOfTime = ({ event, isNewEvent = false }) => {
	const { flip, left, top,  width } = event.boundingBox;

	const style = {
		background: null,
		left: `${left}px`,
		top: `${top}px`,
		width: `${width}px`,
	};

	if (event.dateRangeUncertain != null) {
		const percFrom = percentageOfDateInEvent(event.dateRangeUncertain.from, event);
		const percTo = percentageOfDateInEvent(event.dateRangeUncertain.to, event);
		style.background = `linear-gradient(to right, ${timelineBlue}, ${timelineLighestBlue} ${percFrom * 100}%, ${timelineLighestBlue} ${percTo * 100}%, ${timelineBlue})`;
	}

	return (
		<li
			className={cx('interval-of-time', { flip })}
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
									fill: width > EVENT_MIN_SPACE,
								})}
							>
								{event.title}
							</div>
						</div>
						<div className="e-resize-handle" />
					</div> :
					<Link
						className={cx(event.types, {
							fill: width > EVENT_MIN_SPACE,
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
