import * as React from 'react';
import {extractFrom, extractFromAndTo} from '../../utils/dates';
import IntervalOfTime from '../events/interval-of-time';
import PointInTime from '../events/point-in-time';

interface IHandleProps extends IEventFunctions {
	event: IEvent;
	setEventKeyValues: (keyValues: IKeyValues) => void;
}

class Handle extends React.Component<IHandleProps, any> {
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
		const handle = (ev.target.matches('.move-handle') || ev.target.matches('.move-handle .title')) ?
			'move' :
			(ev.target.matches('.w-resize-handle')) ?
				'west-resize' :
				'east-resize';

		this.setState({
			dragging: true,
			handle,
			offset: left - ev.pageX,
		});

		document.body.classList.add('user-select-none', 'cursor-move');
	};

	private handleMouseMove = (ev) => {
		if (this.state.dragging) {
			const left = ev.pageX + this.state.offset;
			let [from, to] = extractFromAndTo(this.props.event);

			if (this.state.handle === 'move') {
				from = this.props.dateAtLeftPosition(left);

				// TODO fix
				to = this.props.dateAtLeftPosition(left + 200);
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
		this.setState({
			dragging: false,
			handle: null,
			offset: null,
		});

		document.body.classList.remove('user-select-none', 'cursor-move');
	};
}

export default Handle;
