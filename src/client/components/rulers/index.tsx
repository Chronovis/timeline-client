import * as React from 'react';

const Ruler = ({ left, year }) => {
	return (
		<li style={{ left: `${left}px` }}>
			<span className="date">{year}</span>
		</li>
	);
};

class Rulers extends React.Component<any, any> {
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
										root.leftPositionAtDate(new Date(year.toString())) :
										root.leftPositionAtDate(new Date((fromYear + year).toString()))
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
