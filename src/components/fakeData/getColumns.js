import React, { useState } from 'react';
import styled from 'styled-components';

export const Input = ({
	dataRow,
	currentValue,
	setPageData,
	pageData,
	currentKey,
}) => {
	const [val, setVal] = useState(currentValue);

	React.useEffect(() => {
		if (val != currentValue) {
			// const findIndex = pageData.findIndex((t) => t.id === dataRow.id);
			// const _pageData = [...pageData];
			// _pageData[findIndex] = { ...pageData[findIndex], [currentKey]: val };
			// setPageData(_pageData);
			setVal(currentValue);
		}
	}, [currentValue]);

	const onChange = (e) => {
		setVal(e.target.value);
	};

	return <input value={val} onChange={onChange} style={{ width: '95%' }} />;
};
export const getColumnsData = () => {
	const cols = [
		{
			header: 'User Id',
			colKey: 'id',
			size: 1,
			copyCellDataOnClick: false,
		},
		{
			header: 'User Name',
			colKey: 'name',
			size: 4,
			copyCellDataOnClick: true,
			showToolTip: true,
			CustomCell: Input,
		},
		{
			header: 'User Family',
			colKey: 'family',
			size: 4,
			copyCellDataOnClick: true,
			showToolTip: true,
		},
		{
			header: 'User State',
			colKey: 'state',
			size: 2,
			sortable: false,
			copyCellDataOnClick: false,
			CustomCell: ({ dataRow, currentKey, currentValue }) => (
				<CustomCell value={currentValue}>{currentValue.toString()}</CustomCell>
			),
		},
	];
	return cols;
};

const CustomCell = styled.span`
	color: ${(props) => (props.value ? 'green' : 'red')};
`;
