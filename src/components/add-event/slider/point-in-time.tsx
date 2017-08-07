import * as React from 'react';
import {IPointInTime, PointInTimeContainer} from "../../events/point-in-time";
import {UncertainEastHandle, UncertainWestHandle} from "./resize-handles";
import Point from "../../events/point-in-time/point";
import Title from "../../events/point-in-time/title";

const PointInTime: React.StatelessComponent<IPointInTime> = (props) =>
	<PointInTimeContainer
		event={props.event}
		onMouseDown={(ev) => props.onHandleMouseDown('move', ev.pageX)}
	>
		{
			props.event.isUncertain() &&
			<UncertainWestHandle
				onMouseDown={(ev) => {
					ev.stopPropagation();
					props.onHandleMouseDown('west-resize', ev.pageX);
				}}
			/>
		}
		{props.event.flip ? null : <Point event={props.event} />}
		<Title event={props.event}>
			{props.event.title}
		</Title>
		{props.event.flip ? <Point event={props.event} /> : null}
		{
			props.event.isUncertain() &&
			<UncertainEastHandle
				onMouseDown={(ev) => {
					ev.stopPropagation();
					props.onHandleMouseDown('east-resize', ev.pageX);
				}}
			/>
		}
	</PointInTimeContainer>;

export default PointInTime;
