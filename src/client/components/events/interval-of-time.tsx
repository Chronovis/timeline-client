import * as React from 'react';
import { Link } from 'react-router';
import * as cx from 'classnames';

const IntervalOfTime = ({ isNewEvent = false, event, left, width }) => {
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
								className={cx('title', event.types)}
							>
								{event.title}
							</div>
						</div>
						<div className="e-resize-handle" />
					</div> :
					<Link
						to={`/timelines/${event.slug}`}
						className={cx(event.types)}
					>
						{event.title}
					</Link>
			}
		</li>
	);
};

export default IntervalOfTime;
