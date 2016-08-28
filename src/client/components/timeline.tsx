import * as React from 'react';
import { Link } from 'react-router';
import * as debounce from 'lodash.debounce';
import Events from './events';
import Rulers from './rulers';
import { countDaysInRange, formatDateInDaterange } from '../utils/dates';

const timelineWidth = (): number => document.documentElement.clientWidth * 0.98;

interface ITimelineProps {
	children?: any;
	events: IEvent[];
	root: IEvent;
}

interface ITimelineState {
	daysCount?: number;
	timelineWidth?: number;
}

class Timeline extends React.Component<ITimelineProps, ITimelineState> {
	public state = {
		daysCount: countDaysInRange(this.props.root.dateRange),
		timelineWidth: timelineWidth(),
	};

	public componentDidMount() {
		window.addEventListener('resize', this.debouncedHandleResize);
	}

	public componentWillReceiveProps(nextProps) {
		this.setState({
			daysCount: countDaysInRange(nextProps.root.dateRange),
		});
	}

	public componentWillUnmount() {
		window.removeEventListener('resize', this.debouncedHandleResize);
	}

	public render() {
		const { children, root } = this.props;

		if (root.title === '') return null;

		return (
			<div className="timeline">
				<header>
					<div className="pre-title">TIMELINE OF</div>
					<h2>{root.title}</h2>
					<Link to={`/timelines/${root.slug}/add-event`}>+</Link>
					<div className="from">{formatDateInDaterange(root.dateRange, 'from')}</div>
					<div className="to">{formatDateInDaterange(root.dateRange, 'to')}</div>
				</header>
				<Rulers
					{...this.props}
					{...this.state}
					pixelsPerDay={this.state.timelineWidth / this.state.daysCount}
				/>
				<Events
					{...this.props}
					{...this.state}
					pixelsPerDay={this.state.timelineWidth / this.state.daysCount}
				/>
				{children}
			</div>
		);
	}

	private handleResize = () => {
		this.setState({ timelineWidth: timelineWidth() });

	};
	private debouncedHandleResize = debounce(this.handleResize, 200);
}

export default Timeline;
