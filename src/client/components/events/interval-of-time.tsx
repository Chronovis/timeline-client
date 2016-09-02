import * as React from 'react';
import { Link } from 'react-router';
import * as cx from 'classnames';

const IntervalOfTime = ({ event, left, width }) => {
	return (
		<li
			className="interval-of-time"
			style={{
				left: `${left}px`,
				width: `${width}px`,
			}}
			title={event.title}
		>
			<Link
				to={`/timelines/${event.slug}`}
				className={cx(event.types)}
			>
				{event.title}
			</Link>
		</li>
	);
};

export default IntervalOfTime;
