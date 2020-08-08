import React from 'react';
import styled from 'styled-components';

export const getColumnsData = () => ([
    {
        header: 'User Id',
        colKey: 'id',
        size: 1,
        copyCellDataOnClick: false,
    },{
        header: 'User Name',
        colKey: 'name',
        size: 4,
        copyCellDataOnClick: true,
        showToolTip: true
    },{
        header: 'User Family',
        colKey: 'family',
        size: 4,
        copyCellDataOnClick: true,
        showToolTip: true
    },{
        header: 'User State',
        colKey: 'state',
        size: 2,
        sortable: false,
        copyCellDataOnClick: false,
        CustomCell: ({ dataRow, currentKey,currentValue }) => <CustomCell value = {currentValue}>{currentValue.toString()}</CustomCell>
    }
]);

const CustomCell = styled.span`
    color: ${props => props.value ? 'green' : 'red'};
`;