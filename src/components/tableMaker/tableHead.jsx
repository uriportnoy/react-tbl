import React,{useState,useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';

const TableHead = ({columns,sortArray}) => {
const {tableHeader,table,columnsResize} = useContext(ReactTblContext);
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
            columns?.length >= 0 ? <tr>{
                columns.map((key, index) => (
                    <THComponent key = {index}
                        width = {key.size || 1}
                        fontSize = {tableHeader?.fontSize}
                        cloumnMinWidth = {table?.cloumnMinWidth}
                        sortDirection = {sortDirections?.[key.colKey]}
                        onClick = {(!tableHeader.sortable || key.sortable === false) ? null : () => {  
                            sortArray(key.colKey,!sortDirections[key.colKey]);
                            setSortDirections({...sortDirections,[key.colKey]: !sortDirections[key.colKey]});
                        }}
                        header = {key.header || key.colKey}
                    />
                ))}
            </tr> : <EmptyColumnsTR> Cannot Read Columns </EmptyColumnsTR> 
        }
    </Thead>
  )
}

const THComponent = ({header,width,fontSize,cloumnMinWidth,sortDirection,onClick}) => {
    const [size,setSize] = useState(width);

    return <TH
        size = {size}
        fontSize = {fontSize}
        cloumnMinWidth = {cloumnMinWidth}
        sortDirection = {sortDirection}
        onClick = {onClick}
    >
        {header}
    </TH>
}
const Thead = styled.thead`
    display: table;
    width: 100%;
    table-layout: fixed; 
    background: ${props => props.backgroundColor};
    position: sticky;
    top: 0;
    z-index: 99;
    tr{
        color: ${props => props.color};
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
    user-select: none;
    text-align: center;
    font-size: ${props => props.fontSize};
    flex: ${props => props.size} 0 100px; 
    box-sizing: border-box;
    min-width: ${props => props.cloumnMinWidth};
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