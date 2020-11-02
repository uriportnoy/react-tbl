import React from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

export const ReactTblContext = React.createContext();

export const Loading = ({ minHeight }) => {
	const {
		CustomLoader,
		tableHeader: { backgroundColor },
	} = React.useContext(ReactTblContext);

	return (
		<EmptyTable minHeight={minHeight}>
			<tr>
				<td>
					{CustomLoader ? <CustomLoader /> : <Loader color={backgroundColor} />}
				</td>
			</tr>
		</EmptyTable>
	);
};

export const EmptyData = ({ minHeight }) => (
	<EmptyTable minHeight={minHeight}>
		<tr>
			<td>No Data...</td>
		</tr>
	</EmptyTable>
);
export const Thead = styled.thead`
	display: table;
	width: 100%;
	table-layout: fixed;
	background: ${(props) => props.backgroundColor};
	position: sticky;
	top: 0;
	z-index: 99;
	box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
	tr {
		color: ${(props) => props.color};
		width: 100%;
		display: flex;
	}
`;
export const TblWrapper = styled.div`
	flex: 1 1 auto;
	overflow-x: ${(props) => props.overflowX};
	* {
		font-family: ${(props) => props.fontFamily};
	}
	&.scroller {
		&::-webkit-scrollbar-track {
		}
		&::-webkit-scrollbar {
			width: 10px;
			background-color: ${(props) => props?.backgroundColor};
		}
		&::-webkit-scrollbar-thumb {
			background-color: #000;
			height: ${(props) => props?.backgroundColor};
		}
	}
`;
export const ReactTblStyled = styled.div`
	margin: ${(props) => props.margin};
	min-width: ${(props) => props.minWidth};
	max-width: ${(props) => props.maxWidth};
	min-height: ${(props) => props.tableMinHeight};
	max-height: ${(props) => props.maxHeight};
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	border: ${(props) => props.border};
	table {
		background-color: transparent;
		border-collapse: collapse;
		display: inline-block;
		tr {
			height: ${(props) => props.rowHeight};
		}
		tbody {
			background: ${(props) => props.bodyBGColor};
			min-height: ${(props) => props.minHeight};
			width: 100%;
			display: block;
		}
		@keyframes markCell {
			0% {
				background: unset;
			}
			50% {
				background: #7ecc24a3;
			}
			100% {
				background: unset;
			}
		}
		.copyCell {
			animation-name: markCell;
			animation-duration: 0.4s;
		}
	}
`;
export const ResizerComponent = styled.div`
	top: 0;
	right: -3px;
	bottom: 0;
	width: 6px;
	position: absolute;
	cursor: col-resize;
	background: ${(props) => props.color || '#000'};

	z-index: 999;
`;
const EmptyTable = styled.tbody`
	color: #000;
	font-weight: bold;
	display: grid !important;
	align-items: center;
	min-height: ${(props) => props.minHeight};
	tr {
		display: grid;
		align-items: center;
		height: 100%;
		font-size: 15pt;
		text-align: center;
	}
`;
export const TH = styled.th`
	border: 1pt ${(props) => props.borderColor} solid;
	user-select: none;
	text-align: center;
	white-space: nowrap;
	font-size: ${(props) => props.fontSize};
	flex: ${(props) => props.size} 1 ${(props) => props.columnMinWidth};
	min-width: ${(props) => props.columnMinWidth};
	padding: 0.3em
		${(props) =>
			props.sortDirection === false || props.sortDirection ? '0.4em' : '0.3em'}
		0.3em 0.3em;
	box-sizing: border-box;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 2;
	cursor: ${(props) =>
		props.sortDirection === false || props.sortDirection ? 'pointer' : 'auto'};

	&::after {
		content: '${(props) =>
			props.sortDirection || props.sortDirection === false
				? props.sortSign
				: ''}';
		transform: rotate(${(props) => (props.sortDirection ? 0 : '180deg')});
		position: absolute;
		right: 4%;
		color: #fff;
		opacity: 0.6;
		z-index: 1;
	}
`;
export const EmptyColumnsTR = styled.tr`
	display: grid;
	justify-content: center;
	align-items: center;
	min-height: 25pt;
`;
export const PaginationStyle = styled.div`
	background: ${(props) => props.backgroundColor};
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2pt;
	padding: 4pt;
	z-index: 10;
	box-sizing: border-box;
	border: ${(props) => props.border};
	* {
		user-select: none;
		font-family: ${(props) => props.fontFamily};
		color: ${(props) => props.color};
	}
	.label {
		flex: 3;
		text-align: center;
	}
	.btn {
		width: 120px;
		height: 100%;
		transition: 0.3s all;
		display: flex;
		position: relative;
		color: ${(props) => props.btnsColor};
		align-items: center;
		justify-content: center;
		padding: 3pt;
		font-weight: bold;
		cursor: pointer;
		font-family: ${(props) => props.fontFamily};
		border-radius: 3pt;
		flex-grow: 1;
		overflow: hidden;
		text-align: center;

		&.next {
			background: ${(props) =>
				props.nextDisabled ? '#ccc' : props.btnsBGColor};
			opacity: ${(props) => (props.nextDisabled ? '0.4' : '1')};
			cursor: ${(props) => (props.nextDisabled ? 'not-allowed' : 'pointer')};
		}
		&.prev {
			background: ${(props) =>
				props.prevDisabled ? '#ccc' : props.btnsBGColor};
			opacity: ${(props) => (props.prevDisabled ? '0.4' : '1')};
			cursor: ${(props) => (props.prevDisabled ? 'not-allowed' : 'pointer')};
		}
		&:hover {
			filter: brightness(85%);
		}
	}
`;
