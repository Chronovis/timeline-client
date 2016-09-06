import * as React from 'react';
import {extractFromAndTo, dateAtLeftPosition} from '../../utils/dates';
import IntervalOfTime from '../events/interval-of-time';
import PointInTime from '../events/point-in-time';
import {eventWidth, eventLeftPosition} from '../../utils/event';

interface ISliderProps {
	event: IEvent;
	root: IEvent;
	setEventKeyValues: (keyValues: IKeyValues) => void;
}

class Slider extends React.Component<ISliderProps, any> {
	public state = {
		dragging: false,
		handle: null,
		offset: null,
	};

	private rootElement: HTMLElement = null;

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
				onMouseDown={this.handleMouseDown}
				ref={(el) => {
					if (el != null) {
						this.rootElement = el;
					}
				}}
			>
				{
					event.isInterval ?
						<IntervalOfTime
							event={event}
							isNewEvent
						/> :
						<PointInTime
							event={event}
						/>
				}
			</ul>
		);
	}

	private handleMouseDown = (ev) => {
		const { event, root } = this.props;
		const left = eventLeftPosition(event, root);
		const handle = (
			ev.target.matches('.move-handle') ||
			ev.target.matches('.move-handle .title') ||
			ev.target.matches('.interval-of-time') ||
			ev.target.matches('.point-in-time') ||
			ev.target.matches('.point-in-time .title')
		) ?
			'move' :
			(ev.target.matches('.w-resize-handle')) ?
				'west-resize' :
				'east-resize';

		document.body.classList.add('user-select-none', handle);

		this.setState({
			dragging: true,
			handle,
			offset: left - ev.pageX,
		});
	};

	private handleMouseMove = (ev) => {
		if (this.state.dragging) {
			const left = ev.pageX + this.state.offset;
			const { event, root } = this.props;
			let [from, to] = extractFromAndTo(event);

			if (this.state.handle === 'move') {
				from = dateAtLeftPosition(left, root);
				to = dateAtLeftPosition(left + eventWidth(event, root), root);
			} else if (this.state.handle === 'west-resize') {
				from = dateAtLeftPosition(left, root);
			} else if (this.state.handle === 'east-resize') {
				to = dateAtLeftPosition(ev.pageX, root);
			}

			const keyValues = this.props.event.isInterval ?
				{
					dateRange: {
						from,
						to,
					},
				} :
				{
					date: from,
				};

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
