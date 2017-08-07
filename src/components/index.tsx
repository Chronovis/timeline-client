import * as React from 'react';
import { connect } from 'react-redux';
import { getEvents } from '../actions/events';
import Timeline from './timeline';
import {resize} from "../actions/dom";
import {IEvent} from "../models/event";
import {IRootEvent} from "../models/root-event";

interface IEventsProps {
	events: IEvent[];
	getEvents: (slug: string) => void;
	match: any;
	resize: () => void;
	root: IRootEvent;
	routeParams: { slug: string };
}

class App extends React.Component<IEventsProps> {
	public componentDidMount() {
		this.props.getEvents(this.props.match.params.slug);
	}

	public componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.slug !== this.props.match.params.slug) {
			this.props.getEvents(nextProps.match.params.slug);
		}
	}

	public render() {
		const { children, events, resize, root } = this.props;

		return (
			<Timeline
				children={children}
				events={events}
			  resize={resize}
				root={root}
			/>
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
		resize,
	},
)(App);
