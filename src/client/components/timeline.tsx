import * as React from 'react';
import { Link } from 'react-router';
import * as cx from 'classnames';
import * as debounce from 'lodash.debounce';
import Events from './events/index';
import Rulers from './rulers/index';
import * as Constants from '../constants';

interface ITimelineProps {
	children?: any;
	events: IEvent[];
	resize: () => void;
	root: IRootEvent;
}

class Timeline extends React.Component<ITimelineProps, null> {
	private debouncedHandleResize = debounce(this.props.resize, 200);

	public componentDidMount() {
		window.addEventListener('resize', this.debouncedHandleResize);
	}

	public componentWillUnmount(): void {
		window.removeEventListener('resize', this.debouncedHandleResize);
	}

	public render() {
		const { children, root } = this.props;
		if (root == null) return null;

		return (
			<div className="timeline">
				<header>
					<div className="pre-title">TIMELINE OF</div>
					<h2 className={cx(root.types)}>{root.title}</h2>
					<Link to={`/timelines/${root.slug}/add-event`}>+</Link>
					<div className="from">{root.formatFromDate()}</div>
					<div className="to">{root.formatToDate()}</div>
				</header>
				<Rulers
					{...this.props}
					{...this.state}
				/>
				<Events
					{...this.props}
					{...this.state}
				/>
				<div className="dev">
					<span style={{textDecoration: 'underline'}}>Timeline</span>
					<br />
					<span>{` width: ${Constants.timelineWidth().toFixed(2)}px`}</span>
					<br />
					<span>{` days: ${root.countDays().toFixed(0)} days`}</span>
					<br />
					<span>{` years: ${(root.countDays() / 365).toFixed(2)} years`}</span>
					<br /><br />
					<span>{`One pixel is: ${(root.countDays() / Constants.timelineWidth()).toFixed(2)} days`}</span>
					<br />
					<span>{`One day is: ${(Constants.timelineWidth() / root.countDays()).toFixed(4)}px`}</span>
				</div>
				{children}
			</div>
		);
	}
}

export default Timeline;
