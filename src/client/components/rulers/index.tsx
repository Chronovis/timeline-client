import * as React from 'react';
import { extractFromAndTo, countDaysInRange } from '../../utils/dates';
import {yearLeftPosition} from '../../utils/event';

const Ruler = ({ left, year }) => {
	return (
		<li style={{ left: `${left}px` }}>
			<span className="date">{year}</span>
		</li>
	);
};

class Rulers extends React.Component<any, any> {
	state = {
		absolute: true,
	};

	public render() {
		const { root } = this.props;
		const daysCount = countDaysInRange(root);
		const [from, to] = extractFromAndTo(root);
		const [fromYear, toYear] = [from.getFullYear(), to.getFullYear()];
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
			<div className="tmp">
				<ul className="rulers"
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
										yearLeftPosition(year, root) :
										yearLeftPosition(fromYear + year, root)
								}
								year={year}
							/>)
					}
				</ul>
			</div>
		);
	}
}

export default Rulers;
