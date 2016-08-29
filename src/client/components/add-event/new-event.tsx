import * as React from 'react';
import * as cx from 'classnames';

interface INewEventProps {
	title: string;
}

class NewEvent extends React.Component<INewEventProps, any> {
	public state = {
		type: 'point-in-time',
	};

	public render() {
		return (
			<div className="new-event-slide-area">
				<div
					className={cx('new-event', this.state.type)}
				>
					{this.props.title}
				</div>
			</div>
		);
	}
}

export default NewEvent;