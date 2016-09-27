import * as React from 'react';
import * as DateUtils from '../../utils/dates';
import IntervalOfTime from '../events/interval-of-time';
import PointInTime from '../events/point-in-time';

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
			offset: event.left - ev.pageX,
		});
	};

	private handleMouseMove = (ev) => {
		if (this.state.dragging) {
			const left = ev.pageX + this.state.offset;
			const { event, root } = this.props;
			let from = event.from;
			let to = event.to;

			if (this.state.handle === 'move') {
				from = DateUtils.dateAtLeftPosition(left, root);
				to = DateUtils.dateAtLeftPosition(left + event.width, root);
			} else if (this.state.handle === 'west-resize') {
				from = DateUtils.dateAtLeftPosition(left, root);
			} else if (this.state.handle === 'east-resize') {
				to = DateUtils.dateAtLeftPosition(ev.pageX, root);
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
