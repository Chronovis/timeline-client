import * as React from 'react';
import * as cx from 'classnames';
import {timelineWidth, EVENT_MAX_WIDTH} from "../constants";

const flipPointInTime = (left: number): [boolean, number] => {
	const width = timelineWidth();
	const flip = left > (width - EVENT_MAX_WIDTH);
	const distance = flip ? width - left : left;
	return [flip, distance];
};

interface IPointInTimeStyle {
	left?: string;
	right?: string;
}

const PointInTime = ({ event }) => {
	let { left, width } = event.boundingBox;
	const [flip, distance] = flipPointInTime(left);
	const style: IPointInTimeStyle = flip ?
		{ right: `${distance}px`} :
		{ left: `${distance}px` };

	if (width > 0 && width < 12) width = 12;
	const pointStyle = (width > 0) ? { width: `${width}px`} : null;
	const titleStyle = (width > 0) ? { marginLeft: `${(width / -2)}px`} : null;

	const point =
		<div
			className={cx('point', {
				uncertain: width > 0,
			})}
			style={pointStyle}
		/>;

	return (
		<li
			className={cx('point-in-time', { flip }, event.types)}
			style={style}
			title={event.title}
		>
			{flip ? null : point}
			<div
				className="title" style={titleStyle}
			>
				{event.title}
			</div>
			{flip ? point : null}
		</li>
	);
};

export default PointInTime;
