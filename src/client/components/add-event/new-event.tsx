import * as React from 'react';
import history from '../../routes/history';
import Slider from './slider';
import Form from "./form/index";

interface INewEventProps {
	newEvent: IEvent;
	resetEvent: () => void;
	root: IEvent;
	saveEvent: () => void;
	setEventKeyValues: (keyValues: IKeyValues) => void;
}

class NewEvent extends React.Component<INewEventProps, {}> {
	public render() {
		const {
			newEvent,
			resetEvent,
			root,
			saveEvent,
			setEventKeyValues,
		} = this.props;

		return (
			<div className="new-event">
				<div className="new-event-slide-area">
					<Slider
						event={newEvent}
						root={root}
						setEventKeyValues={setEventKeyValues}
					/>
				</div>
				<Form
					event={newEvent}
					root={root}
					setEventKeyValues={setEventKeyValues}
				/>
				<footer>
					<button
						onClick={() => {
							resetEvent();
							history.push(`/timelines/${root.slug}`);
						}}
					>
						Cancel
					</button>
					<button
						onClick={() => {
							saveEvent();
							history.push(`/timelines/${root.slug}`);
						}}
					>Save</button>
				</footer>
			</div>
		);
	}
}

export default NewEvent;
