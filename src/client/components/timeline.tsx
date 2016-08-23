import * as React from 'react';
import { formatDateInDaterange } from '../utils/dates';
import Events from './events';

interface ITimelineProps {
	root: IEvent;
	events: IEvent[];
}

interface ITimelineState {
	clientWidth: number;
}

class Timeline extends React.Component<ITimelineProps, ITimelineState> {
	public render() {
		const { root } = this.props;

		if (root.title === '') return null;

		return (
			<div className="timeline">
				<header>
					<div className="pre-title">TIMELINE OF</div>
					<h2>{root.title}</h2>
					<div className="from">{formatDateInDaterange(root.dateRange, 'from')}</div>
					<div className="to">{formatDateInDaterange(root.dateRange, 'to')}</div>
				</header>
				<Events {...this.props} />
			</div>
		);
	}
}

export default Timeline;
