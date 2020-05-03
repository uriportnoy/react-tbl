import React,{useContext} from 'react';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';

const TableHead = ({columns}) => {
const {tableHeader} = useContext(ReactTblContext);

  return (
    <Thead
        backgroundColor = {tableHeader?.backgroundColor}
        color = {tableHeader?.color}
    >
        {
            <tr>{
                columns.map((key, index) => (
                    <TH
                        key = {index}
                        size = {key.size || 1}
                        fontSize = {tableHeader?.fontSize}
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
    background: ${props => props.backgroundColor || 'rgba(255,255,255,0.2)'};
    tr{
        color: ${props => props.color || '#fff'};
        width: 100%;
        display: flex; 
    }
`;

const TH = styled.th`
    border: 1pt #000 solid;
    font-family: monospace;
    text-shadow: 0px 2px 0px #000000;
    user-select: none;
    text-align: center;
    font-size: ${props => props.fontSize || '12pt'};
    flex: ${props => props.size} 0 100px; 
    box-sizing: border-box;
`;
export default TableHead;