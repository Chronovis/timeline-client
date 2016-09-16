import * as React from 'react';
import { Link } from 'react-router';
import * as cx from 'classnames';
import { EVENT_MIN_SPACE } from '../constants';

const IntervalOfTime = ({ isNewEvent = false, event }) => {
	const { left, top,  width } = event.boundingBox;

	return (
		<li
			className="interval-of-time"
			style={{
				left: `${left}px`,
				top: `${top}px`,
				width: `${width}px`,
			}}
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
