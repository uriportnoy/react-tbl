import React,{useState,useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';
import Resizer from './resizer';

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
            columns?.length <= 0 ? <EmptyColumnsTR> Cannot Read Columns </EmptyColumnsTR> : <tr>{
                columns.map((key, index) => (
                    <><TH
                        key = {`th_${key.colKey}_${index}`}
                        id = {`th_${index}`}
                        size = {key.size || 1}
                        fontSize = {tableHeader?.fontSize}
                        columnMinWidth = {table?.columnMinWidth}
                        sortDirection = {sortDirections?.[key.colKey]}
                        sortSign = {tableHeader.sortSign}
                        borderColor = {tableHeader?.borderColor}
                        onClick = {(!tableHeader.sortable || key.sortable === false) ? null : () => {
                            sortArray(key.colKey,!sortDirections[key.colKey]);
                            setSortDirections({...sortDirections,[key.colKey]: !sortDirections[key.colKey]});
                        }}
                    >
                        {key.header || key.colKey}
                    {columnsResize && (index + 1 !== columns.length) && <Resizer id={index} color={tableHeader?.borderColor}/>}
                    </TH>
                    </>
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
    background: ${props => props.backgroundColor};
    position: sticky;
    top: 0;
    z-index: 99;
    box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
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
    border: 1pt ${props => props.borderColor} solid;
    user-select: none;
    text-align: center;
    white-space: nowrap;
    font-size: ${props => props.fontSize};
    flex: ${props => props.size} 1 ${props => props.columnMinWidth}; 
    padding: 0.3em ${props => (props.sortDirection  === false) || (props.sortDirection) ? '0.4em' : '0.3em'} 0.3em 0.3em;
    box-sizing: border-box;
    min-width: ${props => props.columnMinWidth};
    position: relative;
    cursor: ${props => (props.sortDirection  === false) || (props.sortDirection) ? 'pointer' : 'auto'};

    &::after{
        content: '${props => props.sortDirection ? props.sortSign : props.sortDirection  === false ?  props.sortSign: ''}';
        transform: rotate(${props => props.sortDirection ? 0 : '180deg'});
        position: absolute;
        right: 4%;
        color: #fff;
        //transition: .4s all;
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