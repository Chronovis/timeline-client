import * as React from 'react';
const Input = require('hire-forms-input').default;
const Checkbox = require('hire-forms-checkbox').default;

class FromForm extends React.Component<any, any> {
	public render() {
		const { event, toggleCertainty } = this.props;

		return (
			<div className="from">
				{
					!event.isInterval() ?
						<Checkbox
							label="Uncertain"
							onChange={toggleCertainty}
							value={event.isUncertain()}
						/> :
						null
				}
				<fieldset>
					<Input
						onChange={() => console.log('yeah')}
						value={event.from}
					/>
					{
						event.isUncertain() ?
							<Input
								onChange={() => console.log('yeah')}
								value={event.isInterval() ? event.dateRangeUncertain.from : event.dateUncertain.to}
							/> :
							null
					}
				</fieldset>
			</div>
		)
	}
}

export default FromForm;
