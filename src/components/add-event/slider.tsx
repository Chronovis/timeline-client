import * as React from 'react';
import IntervalOfTime from '../events/interval-of-time';
import PointInTime from '../events/point-in-time';
import {IKeyValues} from "../../reducers/index";
import {IEvent} from "../../models/event";
import {IRootEvent} from "../../models/root-event";

interface ISliderProps {
	event: IEvent;
	root: IRootEvent;
	setEventKeyValues: (keyValues: IKeyValues) => void;
}

class Slider extends React.Component<ISliderProps, any> {
	public state = {
		dragging: false,
		handle: null,
		offset: null,
	};

	public componentDidMount() {
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('mouseup', this.handleMouseUp);
	}

	public componentWillUnmount() {
		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('mouseup', this.handleMouseUp);
	}

	public render() {
		const { event } = this.props;

		return (
			<ul
				className="slider"
			>
				{
					event.isInterval() ?
						<IntervalOfTime
							event={event}
							isNewEvent
							onHandleMouseDown={this.handleMouseDown}
						/> :
						<PointInTime
							event={event}
						  isNewEvent
						  onHandleMouseDown={this.handleMouseDown}
						/>
				}
			</ul>
		);
	}

	private handleMouseDown = (handle, pageX) => {
		const { event } = this.props;
		// const handle = (
		// 	ev.target.matches('.move-handle') ||
		// 	ev.target.matches('.move-handle .title') ||
		// 	ev.target.matches('.interval-of-time') ||
		// 	ev.target.matches('.point-in-time') ||
		// 	ev.target.matches('.point-in-time .point') ||
		// 	ev.target.matches('.point-in-time .title')
		// ) ?
		// 	'move' :
		// 	(ev.target.matches('.w-resize-handle')) ?
		// 		'west-resize' :
		// 		'east-resize';
		console.log('h', handle)

		document.body.classList.add('user-select-none', handle);

		this.setState({
			dragging: true,
			handle,
			offset: event.left - pageX,
		});
	};

	private handleMouseMove = (ev) => {
		if (this.state.dragging) {
			const left = ev.pageX + this.state.offset;
			const { event, root } = this.props;
			let from = event.from;
			let to = event.to;

			if (this.state.handle === 'move') {
				from = root.dateAtLeftPosition(left);
				to = root.dateAtLeftPosition(left + event.width);
			} else if (this.state.handle === 'west-resize') {
				from = root.dateAtLeftPosition(left);
			} else if (this.state.handle === 'east-resize') {
				to = root.dateAtLeftPosition(ev.pageX);
			}

			// const keyValues = this.props.event.isInterval() ?
			// 	{
			// 		dateRange: {
			// 			from,
			// 			to,
			// 		},
			// 	} :
			// 	{
			// 		date: from,
			// 	};
			let keyValues;
			if (event.isInterval()) {
				// Move uncertain interval
				if (event.isUncertain()) {
					// TODO add dateRangeUncertain
					keyValues = {
						dateRange: { from, to },
					};
				// Move certain interval
				} else {
					keyValues = {
						dateRange: { from, to },
					};
				}
			} else {
				// Move uncertain point
				if (event.isUncertain()) {
					keyValues = {
						dateUncertain: { from, to },
					};
				// Move certain point
				} else {
					keyValues = { date: from };
				}
			}

			this.props.setEventKeyValues(keyValues);
		}
	};

	private handleMouseUp = () => {
		document.body.classList.remove('user-select-none', this.state.handle);

		this.setState({
			dragging: false,
			handle: null,
			offset: null,
		});
	};
}

export default Slider;
