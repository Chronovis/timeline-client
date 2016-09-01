import * as React from 'react';
import { Link } from 'react-router';
import * as cx from 'classnames';
import * as debounce from 'lodash.debounce';
import Events from './events';
import Rulers from './rulers';
import {countDaysInRange, formatDate, countDays, extractFrom} from '../utils/dates';

const timelineWidth = (): number => document.documentElement.clientWidth * 0.98;
const eventWidth = 240;

interface ITimelineProps {
	children?: any;
	events: IEvent[];
	root: IEvent;
}

interface ITimelineState {
	pixelsPerDay: number;
}

class Timeline extends React.Component<ITimelineProps, ITimelineState> {
	// TODO only have pixelsPerDay as state
	public state = {
		pixelsPerDay: this.pixelsPerDay(this.props.root),
	};

	public componentDidMount() {
		window.addEventListener('resize', this.debouncedHandleResize);
	}

	public componentWillReceiveProps(nextProps) {
		this.setState({
			pixelsPerDay: this.pixelsPerDay(nextProps.root),
		});
	}

	public componentWillUnmount(): void {
		window.removeEventListener('resize', this.debouncedHandleResize);
	}

	public eventLeftPosition = (fromDate: Date): number =>
		countDays(extractFrom(this.props.root), fromDate) * this.state.pixelsPerDay;

	public eventWidth = (event: IEvent): number =>
		countDaysInRange(event) * this.state.pixelsPerDay;

	public flipPointInTime = (left: number): [boolean, number] => {
		const width = timelineWidth();
		const flip = left > (width - eventWidth);
		const distance = flip ? width - left : left;
		return [flip, distance];
	};

	public render() {
		const { children, root } = this.props;

		if (root.title === '') return null;

		return (
			<div className="timeline">
				<header>
					<div className="pre-title">TIMELINE OF</div>
					<h2 className={cx(root.types)}>{root.title}</h2>
					<Link to={`/timelines/${root.slug}/add-event`}>+</Link>
					<div className="from">{formatDate(root, 'from')}</div>
					<div className="to">{formatDate(root, 'to')}</div>
				</header>
				<Rulers
					{...this.props}
					{...this.state}
					eventLeftPosition={this.eventLeftPosition}
				/>
				<Events
					{...this.props}
					{...this.state}
					eventLeftPosition={this.eventLeftPosition}
					eventWidth={this.eventWidth}
					flipPointInTime={this.flipPointInTime}
				/>
				{
					this.props.children && React.cloneElement(children, {
						eventLeftPosition: this.eventLeftPosition,
						eventWidth: this.eventWidth,
						flipPointInTime: this.flipPointInTime,
					})
				}
			</div>
		);
	}

	private pixelsPerDay(root: IEvent): number {
		return timelineWidth() / countDaysInRange(root);
	};

	private handleResize = () => {
		this.setState({ pixelsPerDay: this.pixelsPerDay(this.props.root) });
	};

	private debouncedHandleResize = debounce(this.handleResize, 200);
}

export default Timeline;
