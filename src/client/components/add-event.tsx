import * as React from 'react';
// import * as Input from 'hire-forms-input';
const Input = require('hire-forms-input').default;

class AddEvent extends React.Component<{}, {}> {
	public state = {
		title: '',
	};

	public render() {
		return (
			<div className="add-event">
				<ul>
					<li>
						<Input
							onChange={(v) => this.setState({ title: v })}
							placeholder="Title"
							value={this.state.title}
						/>
					</li>
				</ul>
			</div>
		);
	}
}

export default AddEvent;
