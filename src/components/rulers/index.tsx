import * as React from 'react';
import styled from 'styled-components';
import Ruler from "./ruler";
import {IRootEvent} from "../../models/root-event";

const Rulers = styled.ul`
	top: 0;
	bottom: 0;
	font-size: 0.8em;
	list-style: none;
	margin: 0;
	padding: 0;
	position: absolute;
`;

interface IProps {
	root: IRootEvent;
}

interface IState {
	absolute: boolean;
}

class RulersComp extends React.Component<IProps, IState> {
	public state = {
		absolute: true,
	};

	public render() {
		const { root } = this.props;
		const daysCount = root.countDays();
		const [fromYear, toYear] = [root.from.getFullYear(), root.to.getFullYear()];
		const rulers = [];

		let i = this.state.absolute ? fromYear : 0;
		let j = this.state.absolute ? toYear : toYear - fromYear;
		if (daysCount > (300 * 365)) {
			for (i; i <= j; i++) {
				if (i % 100 === 0) rulers.push(i);
			}
		} else if (daysCount > (30 * 365)) {
			for (i; i <= j; i++) {
				if (i % 10 === 0) rulers.push(i);
			}
		}

		return (
			<Rulers
				onClick={(ev: any) => {
					if (ev.target.matches('span.date')) {
						this.setState({ absolute: !this.state.absolute });
					}
				}}
			>
				{
					rulers.map((year: number, index: number) =>
						<Ruler
							key={index}
							left={
								this.state.absolute ?
									root.leftPositionAtDate(new Date(year.toString())) :
									root.leftPositionAtDate(new Date((fromYear + year).toString()))
							}
							year={year}
						/>)
				}
			</Rulers>
		);
	}
}

export default RulersComp;
