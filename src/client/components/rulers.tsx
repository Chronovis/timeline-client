import * as React from 'react';
import { extractFromAndTo, countDaysInRange } from '../utils/dates';

const Ruler = ({ left, year }) => {
	return (
		<li style={{ left: `${left}px` }}>
			<span>{year}</span>
		</li>
	);
};

class Rulers extends React.Component<any, any> {
	public render() {
		const { root, eventLeftPosition } = this.props;
		const daysCount = countDaysInRange(root.dateRange);
		const [from, to] = extractFromAndTo(root.dateRange);
		const [fromYear, toYear] = [from.getFullYear(), to.getFullYear()];
		const rulers = [];

		let i = fromYear + 1;
		if (daysCount > (300 * 365)) {
			for (i; i <= toYear; i++) {
				if (i % 100 === 0) rulers.push(i);
			}
		} else if (daysCount > (30 * 365)) {
			for (i; i <= toYear; i++) {
				if (i % 10 === 0) rulers.push(i);
			}
		}

		return (
			<ul className="rulers">
				{
					rulers.map((year: number, index: number) =>
						<Ruler
							key={index}
							left={eventLeftPosition(new Date(year.toString()))}
							year={year}
						/>)
				}
			</ul>
		);
	}
}

export default Rulers;
