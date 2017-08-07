import * as React from 'react';
import IntervalOfTime from './interval-of-time';
import PointInTime from './point-in-time/index';
import styled from "styled-components";
import {IEvent} from "../../models/event";
import {IRootEvent} from "../../models/root-event";

const Events = styled.ul`
	height: 300px;
	list-style: none;
	margin: 0 auto;
	padding: 0;
	position: relative;
`;

interface IProps {
	events: IEvent[];
	root: IRootEvent;
}

const EventsComp: React.StatelessComponent<IProps> = (props) =>
	<Events>
		{
			props.events.map((event, index) =>
				event.isInterval() ?
					<IntervalOfTime
						event={event}
						key={index}
					/> :
					<PointInTime
						event={event}
						key={index}
					/>
			)
		}
	</Events>;

export default EventsComp;
