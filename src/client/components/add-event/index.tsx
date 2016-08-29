import * as React from 'react';
import { connect } from 'react-redux';
import history from '../../routes/history';
import NewEvent from './new-event';
const Input = require('hire-forms-input').default;

interface IAddEventProps {
	params: {
		slug: string;
	};
	root: IEvent;
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
						<NewEvent {...this.props} {...this.state} />
				}
			</div>
		);
	}

	private handleDocumentClick = (ev) => {
		if (
			!(
				this.rootElement.contains(ev.target) ||
				this.rootElement === ev.target ||
				ev.target.matches('li.hire-forms-option')
			)
		) {
			history.push(`/timelines/${this.props.params.slug}`);
		}
	}

	private handleKeyUp = (ev) => {
		if (ev.keyCode === 13) {
			this.setState({ editTitle: false });
		}
	};
}

export default connect(
	state => ({
		root: state.events.root,
	}),
)(AddEvent);
