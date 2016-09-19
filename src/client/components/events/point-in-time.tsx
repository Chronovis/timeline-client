import * as React from 'react';
import * as cx from 'classnames';
import {timelineWidth, EVENT_MIN_SPACE} from "../constants";

const flipPointInTime = (left: number): [boolean, number] => {
	const width = timelineWidth();
	const flip = left > (width - EVENT_MIN_SPACE);
	const distance = flip ? width - left : left;
	return [flip, distance];
};

interface IPointInTimeStyle {
	left?: string;
	right?: string;
	top?: string;
}

const PointInTime = ({ event }) => {
	let { flip, left, top, width } = event.boundingBox;
	const style: IPointInTimeStyle = flip ?
		{ right: `${timelineWidth() - left}px` } :
		{ left: `${left}px` };
	style.top = `${top}px`;

	if (width > 0 && width < 12) width = 12;
	const pointStyle = (width > 0) ? { width: `${width}px`} : null;
	const titleStyle = (width > 0) ? { marginLeft: `${(width / -2)}px`} : null;

	const point =
		<div
			className="point"
			style={pointStyle}
		/>;

	return (
		<li
			className={cx(
				'point-in-time',
				event.types,
				{
					flip,
					uncertain: width > 0,
				},
			)}
			style={style}
			title={event.title}
		>
			{flip ? null : point}
			<div
				className="title"
				style={titleStyle}
			>
				{event.title}
			</div>
			{flip ? point : null}
		</li>
	);
};

export default PointInTime;
