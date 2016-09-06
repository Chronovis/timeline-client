import * as React from 'react';
import { Link } from 'react-router';
import * as cx from 'classnames';
import { EVENT_MAX_WIDTH } from '../constants';

const IntervalOfTime = ({ isNewEvent = false, event }) => {
	const { left, width } = event.boundingBox;

	return (
		<li
			className="interval-of-time"
			style={{
				left: `${left}px`,
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
									fill: width > EVENT_MAX_WIDTH,
								})}
							>
								{event.title}
							</div>
						</div>
						<div className="e-resize-handle" />
					</div> :
					<Link
						className={cx(event.types, {
							fill: width > EVENT_MAX_WIDTH,
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
