import * as React from 'react';
import {extractFromAndTo} from "../../../utils/dates";
const Input = require('hire-forms-input').default;
const Checkbox = require('hire-forms-checkbox').default;

class Uncertain extends React.Component<any, any> {
	public render() {
		const { event } = this.props;
		const isUncertain = event.dateUncertain != null || event.dateRangeUncertain != null;

		return (
			<div className="uncertain">
				<Checkbox
					label="Uncertain"
					onChange={this.handleCheckboxChange}
					value={isUncertain}
				/>
				{
					isUncertain ?
						<Input
							value={
								event.isInterval ?
									event.dateRangeUncertain.from.toISOString() :
									event.dateUncertain.from.toISOString()
							}
						/> :
						null
				}
				{
					isUncertain ?
						<Input
							value={
								event.isInterval ?
									event.dateRangeUncertain.to.toISOString() :
									event.dateUncertain.to.toISOString()
							}
						/> :
						null
				}
			</div>
		);
	}

	private handleCheckboxChange = (): void => {
		const { event, setEventKeyValues } = this.props;
		if (event.isInterval) {
			const [from, to] = extractFromAndTo(event);
			setEventKeyValues({
				dateRangeUncertain: {from, to},
			});
		} else {
			setEventKeyValues({
				date: null,
				dateUncertain: {
					from: event.date,
					to: event.date,
				}
			});
		}
	}
}

export default Uncertain;
