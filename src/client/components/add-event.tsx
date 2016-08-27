import * as React from 'react';
// import * as Input from 'hire-forms-input';
const Input = require('hire-forms-input').default;

class AddEvent extends React.Component<{}, {}> {
	public state = {
		editTitle: true,
		title: '',
	};

	public render() {
		return (
			<div className="add-event">
				{
					this.state.editTitle ?
						<Input
							onChange={(v) => this.setState({ title: v })}
							onKeyUp={this.handleKeyUp}
							placeholder="Title of new event..."
							value={this.state.title}
						/> :
						<div className="new-event">{this.state.title}</div>
				}
			</div>
		);
	}

	private handleKeyUp = (ev) => {
		if (ev.keyCode === 13) {
			this.setState({ editTitle: false });
		}
	};
}

export default AddEvent;
