import * as React from 'react';
import { countDays, extractFromAndTo } from '../utils/dates';

const Ruler = ({ pixelsPerDay, root, year }) => {
	const left = countDays(root.dateRange.from, new Date(year.toString())) * pixelsPerDay;
	return (
		<li style={{ left: `${left}px` }}>
			<span>{year}</span>
		</li>
	);
};

class Rulers extends React.Component<any, any> {
	public render() {
		const { daysCount, root, pixelsPerDay } = this.props;
		const [from, to] = extractFromAndTo(root.dateRange)
		const fromYear = from.getFullYear();
		const toYear = to.getFullYear();
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
					rulers.map((r, index) =>
						<Ruler
							key={index}
							pixelsPerDay={pixelsPerDay}
							root={root}
							year={r}
						/>)
				}

			</ul>
		);
	}
}

export default Rulers;
