import * as React from 'react';
import styled from 'styled-components';

const Year = styled.span`
	bottom: 6px;
	color: #AAA;
	font-size: 1.5em;
	position: absolute;
`;

interface IProps {
	className?: string;
	left: number;
	year: number;
}

const RulerComp: React.StatelessComponent<IProps> = (props) => {
	return (
		<li
			className={props.className}
			style={{ left: `${props.left}px` }}
		>
			<Year>{props.year}</Year>
		</li>
	);
};

const Ruler = styled(RulerComp)`
	border-left: 1px solid #EEE;
	box-sizing: border-box;
	height: 100%;
	padding-left: 6px;
	position: absolute;
	transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`;

export default Ruler;
