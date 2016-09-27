import * as React from 'react';
import * as cx from 'classnames';
import * as Constants from '../../constants';

interface IPointInTimeStyle {
	left?: string;
	right?: string;
	top?: string;
}

const PointInTime = ({ event }) => {
	const { flip, left, title, top, types, width } = event;
	const style: IPointInTimeStyle = flip ?
		{ right: `${Constants.timelineWidth() - left}px` } :
		{ left: `${left}px` };
	style.top = `${top}px`;

	if (width > 0 && width < 12) event.width = 12;
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
				types,
				{
					flip,
					uncertain: width > 0,
				},
			)}
			style={style}
			title={title}
		>
			{flip ? null : point}
			<div
				className="title"
				style={titleStyle}
			>
				{title}
			</div>
			{flip ? point : null}
		</li>
	);
};

export default PointInTime;
