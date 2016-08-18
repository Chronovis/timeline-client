import * as React from 'react';
import { connect } from 'react-redux';
import { getEvents } from './actions/events';
import { Link } from 'react-router';

interface IEventsProps {
	events: IEvent[];
	getEvents: (slug: string) => void;
	root: IEvent;
	routeParams: { slug: string };
}

class Events extends React.Component<IEventsProps, {}> {
	public componentDidMount() {
		this.props.getEvents(this.props.routeParams.slug);
	}

	public componentWillReceiveProps({ routeParams }) {
		if (routeParams.slug !== this.props.routeParams.slug) {
			this.props.getEvents(routeParams.slug);
		}
	}

	public render() {
		return (
			<div className="events">
				<h1>Timeline of {this.props.root.title}</h1>
				{
					this.props.events.map((event, i) =>
						<li key={i}>
							<Link to={`/timelines/${event.slug}`}>{event.title}</Link>
						</li>)
				}
			</div>
		);
	}
}

export default connect(
	state => ({
		events: state.events.events,
		root: state.events.root,
	}),
	{
		getEvents,
	},
)(Events);
