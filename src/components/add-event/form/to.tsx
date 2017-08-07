import * as React from 'react';
import Input from 'hire-forms-input';
import Checkbox from 'hire-forms-checkbox';
import styled from "styled-components";

const Wrapper = styled.div`
	position absolute;
	right: 1%;
`;

class ToForm extends React.Component<any, any> {
	public render() {
		const { event, toggleCertainty } = this.props;

		return (
			<Wrapper>
				<Checkbox
					label="Interval"
					onChange={this.toggleInterval}
					value={event.isInterval()}
				/>
				{
					event.isInterval() ?
						<Checkbox
							label="Uncertain"
							onChange={toggleCertainty}
							value={event.isUncertain()}
						/> :
						null
				}
				{
					event.isInterval() ?
						<fieldset>
							<Input
								onChange={() => console.log('yeah')}
								value={event.to}
							/>
							{
								event.isUncertain() ?
									<Input
										onChange={() => console.log('yeah')}
										value={event.dateRangeUncertain.to}
									/> :
									null
							}
						</fieldset> :
						null
				}
			</Wrapper>
		)
	}

	private toggleInterval = () => {
		const { event, root, setEventKeyValues } = this.props;
		if (event.isInterval()) {
			// Convert to point
			setEventKeyValues({
				date: event.isUncertain() ? null : event.from,
				dateRange: null,
				dateRangeUncertain: null,
				dateUncertain: event.isUncertain() ?
					{
						from: event.dateRangeUncertain.from,
						to: event.dateRangeUncertain.to,
					} :
					null,
			});
		} else {
			// Convert to interval
			setEventKeyValues({
				date: null,
				dateRange: {
					from: event.isUncertain() ? event.dateUncertain.from : root.dateAtProportion(0.4),
					to: event.isUncertain() ? event.dateUncertain.to : root.dateAtProportion(0.6),
				},
				dateRangeUncertain: event.isUncertain() ?
					{
						from: event.dateUncertain.from,
						to: event.dateUncertain.to,
					} :
					null,
				dateUncertain: null,
			});
		}
	}
}

export default ToForm;
