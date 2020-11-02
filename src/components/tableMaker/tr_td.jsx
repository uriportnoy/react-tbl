import styled from 'styled-components';
import { number, string } from 'prop-types';

export const TR = styled.tr`
    animation: fadeIn ${(props) => (props.idx < 10 ? '0.' + props.idx : '1')}s;
    background-color: ${(props) =>
			props?.rowBGColor || (props.idx % 2 === 0 ? '#f7f7f7' : '#eee')};
    transition: .7s all;
    width: 100%;
    display: flex;  
     @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;
    }
`;

TR.propTypes = {
	idx: number,
	rowBGColor: string,
};

export const TD = styled.td`
	flex: ${(props) => props.size} 1 ${(props) => props.columnMinWidth};
	min-width: ${(props) => props.columnMinWidth};
	border: 1pt solid ${(props) => props.borderColor};
	font-size: 12pt;
	position: relative;
	padding: 0;
	box-sizing: border-box;
	text-align: center;
	padding: ${(props) => props.cellPadding};
	color: ${(props) => props.textColor};
	font-size: ${(props) => props.fontSize};
	cursor: ${(props) => (props.copyCellDataOnClick ? 'copy' : 'auto')};

	display: flex;
	align-items: center;
	justify-content: center;
	.cellWrapper {
		text-overflow: ellipsis;
		overflow: hidden;
		width: 100%;
	}
	&:hover {
		.tooltiptext {
			visibility: visible;
			opacity: 1;
		}
	}
`;
TD.propTypes = {
	className: string,
	textColor: string,
	dataTip: string,
	defaultPageSize: number,
};

export const ToolTip = styled.span`
	visibility: hidden;
	opacity: 0;
	background: ${(props) => props.bgColor};
	border: 1px solid ${(props) => props.borderColor};
	color: ${(props) => props.textColor};
	text-align: center;
	border-radius: 6px;
	padding: 5px;
	position: absolute;
	z-index: 999;
	top: -28px;
	transition: opacity 0.3s;
	box-sizing: border-box;
	height: 28px;

	&:after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-bottom: 1%;
		border-width: 5px;
		border-style: solid;
		border-color: ${(props) => props.borderColor} transparent transparent
			transparent;
	}
`;
