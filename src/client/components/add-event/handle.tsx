import * as React from 'react';
import * as cx from 'classnames';
import { extractFrom } from '../../utils/dates';

class Handle extends React.Component<any, any> {
	public state = {
		dragging: false,
		left: null,
	};

	private handleMouseMove = (ev) => {
		if (this.state.dragging) {
			this.setState({left: ev.pageX});
		}
	};

	private handleMouseUp = () => {
		this.setState({
			dragging: false,
			left: null,
		});
	}

	public componentDidMount() {
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('mouseup', this.handleMouseUp);
	}

	public componentWillUnmount() {
		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('mouseup', this.handleMouseUp);
	}

	public render() {
		const { event, eventLeftPosition, eventWidth } = this.props;

		let handleStyle = (this.state.left != null) ?
			{ left: this.state.left } :
			{ left: eventLeftPosition(extractFrom(event)) };

		if (event.isInterval) {
			handleStyle = Object.assign(handleStyle, {
				width: eventWidth(event),
			});
		}

		return (
			<div
				className={cx('handle', {
					'interval-of-time': event.isInterval,
					'point-in-time': !event.isInterval,
				})}
				style={handleStyle}
				onMouseDown={() => this.setState({dragging: true})}
			>
				<span className="title">{event.title}</span>
			</div>
		);
	}
}

export default Handle;
