import * as React from 'react';
import Uncertain from './uncertain';
import * as DateUtils from '../../../utils/dates';
import {getEventTypes} from '../../../actions/api';
const Input = require('hire-forms-input').default;
const Select = require('hire-forms-select').default;
const AutoCompleteList = require('hire-forms-autocomplete-list').default;

class Form extends React.Component<any, any> {
	public handleChangeEventType = (value) => {
		const { root } = this.props;

		const keyValues = (value === 'Point in time') ?
			{
				date: DateUtils.proportionalDate(root, 0.5),
				dateRange: null,
				dateRangeUncertain: null,
				dateUncertain: null,
				isInterval: false,
			} :
			{
				date: null,
				dateRange: {
					from: DateUtils.proportionalDate(root, 0.45),
					to: DateUtils.proportionalDate(root, 0.55),
				},
				dateRangeUncertain: null,
				dateUncertain: null,
				isInterval: true,
			};

		this.props.setEventKeyValues(keyValues);
	};

	public render() {
		const { event, setEventKeyValues } = this.props;

		return (
			<div className="form">
				<Select
					onChange={this.handleChangeEventType}
					value={event.isInterval ? 'Interval of time' : 'Point in time'}
					options={['Point in time', 'Interval of time']}
				/>
				<AutoCompleteList
					async={getEventTypes}
					onChange={(values) => {
							setEventKeyValues({
								types: values.map((v) => v.value),
							});
						}}
					values={event.types.map((t) => ({key: t, value: t}))}
				/>
				<Input
					onChange={(from: string) => console.log()}
					value={event.from.toISOString()}
				/>
				{
					(event.isInterval) ?
						<Input
							onChange={(to: string) => console.log()}
							value={event.from.toISOString()}
						/> :
						null
				}
				<Uncertain
					event={event}
				  setEventKeyValues={setEventKeyValues}
				/>
			</div>
		)
	}
}

export default Form;
