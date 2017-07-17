import * as React from 'react';
import AutoCompleteList from 'hire-forms-autocomplete-list';
import {getEventTypes} from '../../../actions/api';
import ToForm from './to';
import FromForm from './from';

class Form extends React.Component<any, any> {
	public render() {
		const { event, root, setEventKeyValues } = this.props;

		return (
			<div className="form">
				<AutoCompleteList
					async={getEventTypes}
					onChange={(values) => {
							setEventKeyValues({
								types: values.map((v) => v.value),
							});
						}}
					values={event.types.map((t) => ({key: t, value: t}))}
				/>
				<FromForm
					event={event}
					setEventKeyValues={setEventKeyValues}
					toggleCertainty={this.toggleCertainty}
				/>
				<ToForm
					event={event}
					root={root}
					setEventKeyValues={setEventKeyValues}
					toggleCertainty={this.toggleCertainty}
				/>
			</div>
		);
	}

	private toggleCertainty = () => {
		const {event, root, setEventKeyValues} = this.props;

		if (event.isUncertain()) {
			if (event.isInterval()) {
				// Convert interval to certain
				setEventKeyValues({
					dateRangeUncertain: null,
				});
			} else {
				// Convert point to certain
				setEventKeyValues({
					date: root.dateAtProportion(0.5),
					dateUncertain: null,
				});
			}
		} else {
			if (event.isInterval()) {
				// Convert interval to uncertain
				setEventKeyValues({
					dateRangeUncertain: {
						from: root.dateAtProportion(0.4),
						to: root.dateAtProportion(0.6),
					}
				});
			} else {
				// Convert point to uncertain
				setEventKeyValues({
					date: null,
					dateUncertain: {
						from: root.dateAtProportion(0.4),
						to: root.dateAtProportion(0.6),
					},
				});
			}
		}
	}
}

export default Form;
