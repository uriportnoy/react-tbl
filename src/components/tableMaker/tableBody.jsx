import React,{useContext} from 'react';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';

const TableBody = ({
  data,
  columns
}) => {
  const {table:{rowColor,textColor}} = useContext(ReactTblContext);
  
  return <tbody>
    {
      data.map(
      (dataRow, idx) => <TR
        key={`tr_${idx}`}
        idx={idx}
        rowColor = {rowColor}
      >
        {
          columns.map((col, idx) => {
            const key = col.colKey;
            const currentValue = dataRow[key];
            const CustomCell = col.CustomCell || null;
            return <TD
              key = {`td_${key}_${idx}`}
              data-tip = {currentValue || ''}
              size = {col.size || 1}
              className = {key}
              width = {col.width || 100}
              textColor = {textColor}
            >
              {CustomCell ? <CustomCell dataRow={dataRow} currentKey={key} currentValue={currentValue}/> : <span className='defaultCell'>{currentValue}</span>}
            </TD>
          })
        }
      </TR>
      )
    }
  </tbody>
}

const TD = styled.td`
    flex: ${props => props.size} 1 ${props => props.width}px; 
    border: 1pt solid;
    font-size: 12pt;
    position: relative;
    padding:0;
    box-sizing: border-box;
    transition: .7s all;
    text-align: center;
    overflow: hidden;
    padding: 2pt;
    text-overflow: ellipsis;
    .defaultCell{
      color: ${props => props?.textColor || '#fff'};

    }
    &.merchantName,&.featureFlagName,&.name{
        text-align: left;
    }

`;

export const TR = styled.tr`
    animation: fadeIn ${props => (props.idx < 10) ? ('0.' + props.idx) : '1'}s;
    background-color: ${props => props?.rowColor || props.idx % 2 === 0 ? '#ccc' : '#eee'};
    transition: .7s all;
    width: 100%;
    display: flex;  
     @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;
    }
`;

export default TableBody;