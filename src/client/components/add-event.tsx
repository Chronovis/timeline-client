import * as React from 'react';
import history from '../routes/history';
import { hasDescendant } from '../utils/dom';
const Input = require('hire-forms-input').default;

interface IAddEventProps {
	params: {
		slug: string;
	};
}

class AddEvent extends React.Component<IAddEventProps, {}> {
	public state = {
		editTitle: true,
		title: '',
	};

	private rootElement;

	public componentDidMount() {
		document.addEventListener('click', this.handleDocumentClick);
	}

	public componentWillUnmount() {
		document.removeEventListener('click', this.handleDocumentClick);
	}

	public render() {
		return (
			<div
				className="add-event"
				ref={(el) => { if (el != null) this.rootElement = el; }}
			>
				{
					this.state.editTitle ?
						<Input
							onChange={(v) => this.setState({ title: v })}
							onKeyUp={this.handleKeyUp}
							placeholder="Title of new event..."
							value={this.state.title}
						/> :
						<div className="new-event-slide-area">
							<div className="new-event">
								{this.state.title}
							</div>
						</div>
				}
			</div>
		);
	}

	private handleDocumentClick = (ev) => {
		if (
			!(hasDescendant(this.rootElement, ev.target) ||
			this.rootElement === ev.target)) {
			history.push(`/timelines/${this.props.params.slug}`);
		}
	}

	private handleKeyUp = (ev) => {
		if (ev.keyCode === 13) {
			this.setState({ editTitle: false });
		}
	};
}

export default AddEvent;
