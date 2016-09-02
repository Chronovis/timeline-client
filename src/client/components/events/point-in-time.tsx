import * as React from 'react';
import * as cx from 'classnames';

const PointInTime = ({ event, flipPointInTime, left }) => {
	const [flip, distance] = flipPointInTime(left);
	const style = flip ?
	{ right: `${distance}px`} :
	{ left: `${distance}px` };

	return (
		<li
			className={cx('point-in-time', { flip }, event.types)}
			style={style}
			title={event.title}
		>
			{event.title}
		</li>
	);
};

export default PointInTime;
