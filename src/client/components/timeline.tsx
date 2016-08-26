import * as React from 'react';
import { Link } from 'react-router';
import { formatDateInDaterange } from '../utils/dates';
import Events from './events';

interface ITimelineProps {
	children?: any;
	events: IEvent[];
	root: IEvent;
}

interface ITimelineState {
	clientWidth: number;
}

class Timeline extends React.Component<ITimelineProps, ITimelineState> {
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
				{/*<Rulers {...this.props} />*/}
				<Events {...this.props} />
				{children}
			</div>
		);
	}
}

export default Timeline;
