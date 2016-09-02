import * as React from 'react';
import { extractFrom } from '../../utils/dates';
import IntervalOfTime from '../events/interval-of-time';
import PointInTime from '../events/point-in-time';

interface IHandleProps extends IEventFunctions {
	event: IEvent;
	setEventKeyValues: (keyValues: IKeyValues) => void;
}

class Handle extends React.Component<IHandleProps, any> {
	public state = {
		dragging: false,
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
				className="handle"
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

		this.setState({
			dragging: true,
			offset: left - ev.pageX,
		});

		document.body.classList.add('user-select-none', 'cursor-move');
	};

	private handleMouseMove = (ev) => {
		if (this.state.dragging) {
			const left = ev.pageX + this.state.offset;
			const from = this.props.dateAtLeftPosition(left);

			// TODO fix
			const to = this.props.dateAtLeftPosition(left + 200);

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
			left: null,
			offset: null,
		});

		document.body.classList.remove('user-select-none', 'cursor-move');
	};
}

export default Handle;
