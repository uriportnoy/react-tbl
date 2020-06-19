import React,{useContext} from 'react';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';
import PropTypes from 'prop-types';

const TableBody = ({
  data,
  columns
}) => {
  const {
    table:{rowColor,textColor,cloumnMinWidth,showToolTip,fontFamily},
    body: {tooltipTextColor,tooltipBgColor,tooltipBorderColor},
    copyCellDataOnClick
  } = useContext(ReactTblContext);
  // const copyToClipboard = (info) =>{
  //   var copyText = document.getElementById("defaultCell");
  //   copyText.select();
  //   copyText.setSelectionRange(0, 99999)
  //   document.execCommand("copy");
  //   alert("Text copied to clipboard");
  // }
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
              dataTip = {currentValue?.toString()}
              size = {col.size || 1}
              className = {key}
              width = {col.width || 100}
              textColor = {textColor}
              cloumnMinWidth = {cloumnMinWidth}
            >
              
                <>{CustomCell ?  <CustomCell dataRow={dataRow} currentKey={key} currentValue={currentValue}/> :
                <div className='defaultCell' id="defaultCell">
                  {currentValue}
                </div>}
                {(showToolTip || col.showToolTip) && <ToolTip
                  bgColor = {tooltipBgColor || '#000'}
                  textColor = {tooltipTextColor || '#fff'}
                  borderColor = {tooltipBorderColor || tooltipBgColor || '#000'}
                  className="tooltiptext"> {currentValue}</ToolTip>}              
                </>
            </TD>
          })
        }
      </TR>
      )
    }
  </tbody>
}

const ToolTip = styled.span`
    visibility: hidden;
    opacity: 0;

    background: ${props => props.bgColor};
    border: 1px solid ${props => props.borderColor};
    color: ${props => props.textColor};
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 999;
    top: -110%;
    transition: opacity 0.3s;
    transform: translateX(-50%);

    &:after{
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: ${props => props.borderColor} transparent transparent transparent;
    }
`;
const TD = styled.td`
    flex: ${props => props.size} 1 ${props => props.width}px; 
    border: 1pt solid;
    font-size: 12pt;
    position: relative;
    padding:0;
    box-sizing: border-box;
    transition: .7s all;
    text-align: center;
    padding: 2pt;
    min-width: ${props => props.cloumnMinWidth || '120px'};

    .defaultCell{
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &:hover{
        .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
      }
`;
TD.propTypes = {
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
  textColor: PropTypes.string,
  dataTip: PropTypes.string,
}
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
TR.propTypes = {
  rowColor: PropTypes.string
}

export default TableBody;