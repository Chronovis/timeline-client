import styled, {css} from "styled-components";

const commonCss = css`
	border-bottom: 5px solid black;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	bottom: -5px;
	height: 0;
	position: absolute;
	width: 0;
`;

export const UncertainWestHandle = styled.div`
	${commonCss}
	cursor: w-resize;
	left: 0;
	transform: translateX(-5px);
`;

export const UncertainEastHandle = styled.div`
	${commonCss}
	cursor: e-resize;
	right: 0;
	transform: translateX(5px);
`;
