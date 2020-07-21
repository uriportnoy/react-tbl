import React,{useState,useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';

const TableHead = ({columns,sortArray}) => {
const {tableHeader,table} = useContext(ReactTblContext);
const [sortDirections,setSortDirections] = useState(null);

useEffect(() => {
    if(tableHeader.sortable){
        const directions = {};
        columns.forEach(element => {
            if(element.sortable !== false) directions[element.colKey] = true;
        });
        setSortDirections(directions);
    }
},[]);
  return (
    <Thead
        backgroundColor = {tableHeader?.backgroundColor}
        color = {tableHeader?.color}
    >
        {
            columns?.length <= 0 ? <EmptyColumnsTR> Cannot Read Columns </EmptyColumnsTR> : <tr>{
                columns.map((key, index) => (
                    <TH
                        key = {index}
                        size = {key.size || 1}
                        fontSize = {tableHeader?.fontSize}
                        cloumnMinWidth = {table?.cloumnMinWidth}
                        sortDirection = {sortDirections?.[key.colKey]}
                        onClick = {(!tableHeader.sortable || key.sortable === false) ? null : () => {  
                            sortArray(key.colKey,!sortDirections[key.colKey]);
                            setSortDirections({...sortDirections,[key.colKey]: !sortDirections[key.colKey]});
                        }}
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
    sortArray: PropTypes.func,
    color: PropTypes.string
}
const TH = styled.th`
    border: 1pt #000 solid;
    text-shadow: 0px 2px 0px #000000;
    user-select: none;
    text-align: center;
    font-size: ${props => props.fontSize || '12pt'};
    flex: ${props => props.size} 0 100px; 
    box-sizing: border-box;
    min-width: ${props => props.cloumnMinWidth || '120px'};
    position: relative;
    cursor: ${props => (props.sortDirection  === false) || (props.sortDirection) ? 'pointer' : 'auto'};

    &::after{
        content: '${props => props.sortDirection ? '⬆' : props.sortDirection  === false ? '⬇' : ''}';
        position: absolute;
        right: 4%;
        color: #fff;
    }
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