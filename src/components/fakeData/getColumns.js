import React from 'react';
import styled from 'styled-components';

export const getColumnsData = () => ([
    {
        header: 'User Id',
        colKey: 'id',
        size: 1,
    },{
        header: 'User Name',
        colKey: 'name',
        size: 4,
        copyCellDataOnClick: true,
        showToolTip: true
    },{
        header: 'User State',
        colKey: 'state',
        size: 2,
        sortable: false,
        CustomCell: ({ dataRow, currentKey,currentValue }) => <CustomCell value = {currentValue}>{currentValue.toString()}</CustomCell>
    }
]);

const CustomCell = styled.span`
    color: ${props => props.value ? 'green' : 'red'};
`;