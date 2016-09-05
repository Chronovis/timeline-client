import * as React from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/events';
import Timeline from './timeline';

interface IEventsProps {
	events: IEvent[];
	getEvents: (slug: string) => void;
	root: IEvent;
	routeParams: { slug: string };
}

class App extends React.Component<IEventsProps, {}> {
	public componentDidMount() {
		this.props.getEvents(this.props.routeParams.slug);
	}

	public componentWillReceiveProps({ routeParams }) {
		if (routeParams.slug !== this.props.routeParams.slug) {
			this.props.getEvents(routeParams.slug);
		}
	}

	public render() {
		const { children, events, root } = this.props;

		return <Timeline root={root} events={events} children={children}/>;
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
)(App);
