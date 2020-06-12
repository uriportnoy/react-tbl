import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';

const TableHead = ({columns}) => {
const {tableHeader,table} = useContext(ReactTblContext);
  return (
    <Thead
        backgroundColor = {tableHeader?.backgroundColor}
        color = {tableHeader?.color}
    >
        {
            columns?.length <= 0 ? <EmptyColumnsTR>Cannot Read Columns</EmptyColumnsTR> : <tr>{
                columns.map((key, index) => (
                    <TH
                        key = {index}
                        size = {key.size || 1}
                        fontSize = {tableHeader?.fontSize}
                        cloumnMinWidth = {table?.cloumnMinWidth}
                    >
                        {key.header || key.colKey}
                    </TH>
                ))}
            </tr>
        }
    </Thead>
  )
}
const Thead = styled.thead`
    display: table;
    width: 100%;
    table-layout: fixed; 
    background: ${props => props.backgroundColor || '#333'};
    tr{
        color: ${props => props.color || '#fff'};
        width: 100%;
        display: flex; 
    }
`;
Thead.propTypes = {
    backgroundColor: PropTypes.string,
    color: PropTypes.string
}
const TH = styled.th`
    border: 1pt #000 solid;
    font-family: monospace;
    text-shadow: 0px 2px 0px #000000;
    user-select: none;
    text-align: center;
    font-size: ${props => props.fontSize || '12pt'};
    flex: ${props => props.size} 0 100px; 
    box-sizing: border-box;
    min-width: ${props => props.cloumnMinWidth || '120px'};
`;
TH.propTypes = {
    size: PropTypes.number.isRequired,
    fontSize: PropTypes.string
}
const EmptyColumnsTR = styled.tr`
    display:grid;
    justify-content: center;
    align-items:center;
    min-height: 25pt;
`;


export default TableHead;