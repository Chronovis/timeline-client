import * as React from 'react';
const Input = require('hire-forms-input').default;
const Checkbox = require('hire-forms-checkbox').default;

console.log(Input, Checkbox)

class Uncertain extends React.Component<any, any> {
	public render() {
		const { event } = this.props;

		return (
			<div className="uncertain">
				<Checkbox
					label="Uncertain"
					onChange={this.handleCheckboxChange}
					value={event.isUncertain()}
				/>
				{
					event.isUncertain() ?
						<Input
							value={
								event.isInterval() ?
									event.dateRangeUncertain.from.toISOString() :
									event.dateUncertain.from.toISOString()
							}
						/> :
						null
				}
				{
					event.isUncertain() ?
						<Input
							value={
								event.isInterval() ?
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
		if (event.isInterval()) {
			setEventKeyValues({
				dateRangeUncertain: {
					from: event.from,
					to: event.to,
				},
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
