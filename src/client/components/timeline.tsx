import * as React from 'react';
import { Link } from 'react-router';
import * as cx from 'classnames';
import * as debounce from 'lodash.debounce';
import Events from './events/index';
import Rulers from './rulers';
import { formatDate } from '../utils/dates';

interface ITimelineProps {
	children?: any;
	events: IEvent[];
	resize: () => void;
	root: IEvent;
}

class Timeline extends React.Component<ITimelineProps, null> {
	public componentDidMount() {
		window.addEventListener('resize', this.debouncedHandleResize);
	}

	public componentWillUnmount(): void {
		window.removeEventListener('resize', this.debouncedHandleResize);
	}

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
				/>
				<Events
					{...this.props}
					{...this.state}
				/>
				{children}
			</div>
		);
	}

	private handleResize = () => {
		this.props.resize();
		// TODO implement resize
	};

	private debouncedHandleResize = debounce(this.handleResize, 200);
}

export default Timeline;
