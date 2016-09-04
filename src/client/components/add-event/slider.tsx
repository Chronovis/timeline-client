import * as React from 'react';
import {extractFrom, extractFromAndTo} from '../../utils/dates';
import IntervalOfTime from '../events/interval-of-time';
import PointInTime from '../events/point-in-time';

interface ISliderProps extends IEventFunctions {
	event: IEvent;
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
		const {
			event,
			eventLeftPosition,
			eventWidth,
			flipPointInTime,
		} = this.props;

		const left = eventLeftPosition(extractFrom(event));

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
							left={left}
							width={eventWidth(event)}
						/> :
						<PointInTime
							event={event}
							flipPointInTime={flipPointInTime}
							left={left}
						/>
				}
			</ul>
		);
	}

	private handleMouseDown = (ev) => {
		const { event, eventLeftPosition } = this.props;
		const left = eventLeftPosition(extractFrom(event));
		console.log(ev.target.className)
		const handle = (
			ev.target.matches('.move-handle') ||
			ev.target.matches('.move-handle .title') ||
			ev.target.matches('.interval-of-time') ||
			ev.target.matches('.point-in-time')
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
			let [from, to] = extractFromAndTo(this.props.event);

			if (this.state.handle === 'move') {
				from = this.props.dateAtLeftPosition(left);
				to = this.props.dateAtLeftPosition(left + this.props.eventWidth(this.props.event));
			} else if (this.state.handle === 'west-resize') {
				from = this.props.dateAtLeftPosition(left);
			} else if (this.state.handle === 'east-resize') {
				to = this.props.dateAtLeftPosition(ev.pageX);
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
