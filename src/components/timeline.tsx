import * as React from 'react';
import { Link } from 'react-router-dom';
import * as cx from 'classnames';
import * as debounce from 'lodash.debounce';
import Events from './events/index';
import Rulers from './rulers/index';
import * as Constants from '../constants';
import styled from "styled-components";
import {IEvent} from "../models/event";
import {IRootEvent} from "../models/root-event";
import setIcons from "./events/set-icons";

const Wrapper = styled.div`
	height: 100%;
`;

const Header = styled.header`
	margin: 0 auto;
	text-align: center;
	width: 50%;
	position: relative;
	z-index: 1;
`;

const H2 = styled.h2`
	font-size: 3em;
	margin: 0;
	padding: 0;
	${(props: {types: string[]}) => setIcons(props.types)}
`;

const Dev = styled.div`
	position: fixed;
	padding: 1%;
	right: 0;
	bottom: 32px;
	background-color: rgba(0, 0, 0, 0.5);
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
	color: white;
	font-size: 0.6em;
`;

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
			<Wrapper>
				<Header>
					<div className="pre-title">TIMELINE OF</div>
					<H2 types={root.types}>{root.title}</H2>
					<Link to={`/timelines/${root.slug}/add-event`}>+</Link>
					<div className="from">{root.formatFromDate()}</div>
					<div className="to">{root.formatToDate()}</div>
				</Header>
				<Rulers
					{...this.props}
					{...this.state}
				/>
				<Events
					{...this.props}
					{...this.state}
				/>
				<Dev>
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
				</Dev>
				{children}
			</Wrapper>
		);
	}
}

export default Timeline;
