import * as React from 'react';
import * as cx from 'classnames';
import * as Constants from '../../constants';

interface IPointInTimeStyle {
	left?: string;
	right?: string;
	top?: string;
}

class PointInTime extends React.Component<any, any> {
	public render() {
		const { event, isNewEvent } = this.props;
		const {flip, left, title, top, types, width} = event;
		const style: IPointInTimeStyle = flip ?
			{right: `${Constants.timelineWidth() - left}px`} :
			{left: `${left}px`};
		style.top = `${top}px`;

		if (width > 0 && width < 12) event.width = 12;
		const pointStyle = (width > 0) ? {width: `${width}px`} : null;
		const titleStyle = (width > 0) ? {marginLeft: `${(width / -2)}px`} : null;

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
						uncertain: event.isUncertain(),
					},
				)}
				onMouseDown={this.handleMouseDown}
				style={style}
				title={title}
			>
				{
					isNewEvent && event.isUncertain() ?
						<div
							className="uncertain-w-resize-handle"
						/> :
						null
				}
				{flip ? null : point}
				<div
					className="title"
					style={titleStyle}
				>
					{title}
				</div>
				{flip ? point : null}
				{
					isNewEvent && event.isUncertain() ?
						<div
							className="uncertain-e-resize-handle"
						/> :
						null
				}
			</li>
		);
	};

	private handleMouseDown = (ev) => {
		let handle;
		if (ev.target.matches('div.uncertain-w-resize-handle')) {
			handle = 'west-resize';
		} else if (ev.target.matches('div.uncertain-e-resize-handle')) {
			handle = 'east-resize';
		} else if (ev.target.matches('li.point-in-time') || ev.target.matches('li.point-in-time *')) {
			handle = 'move';
		}

		this.props.onHandleMouseDown(handle, ev.pageX);
	};
}

export default PointInTime;
