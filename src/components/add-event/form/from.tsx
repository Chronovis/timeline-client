import * as React from 'react';
import Input from 'hire-forms-input';
import Checkbox from 'hire-forms-checkbox';
import styled from "styled-components";

const Wrapper = styled.div`
	position absolute;
`;

class FromForm extends React.Component<any, any> {
	public render() {
		const { event, toggleCertainty } = this.props;

		return (
			<Wrapper>
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
			</Wrapper>
		)
	}
}

export default FromForm;
