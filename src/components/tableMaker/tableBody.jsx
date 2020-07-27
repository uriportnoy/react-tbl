import React,{useContext} from 'react';
import ReactTblContext from './ReactTblContext';
import {array,number} from 'prop-types';
import {TR,TD,ToolTip} from './tr_td';

const TableBody = ({
  data,
  columns
}) => {
  const {
    table:{rowColor,textColor,cloumnMinWidth,showToolTip,fontFamily},
    body: {tooltipTextColor,tooltipBgColor,tooltipBorderColor,backgroundColor,borderColor},
    copyCellDataOnClick
  } = useContext(ReactTblContext);

  const copyToClipboard = (info,tdId) =>{
    document.getElementById(tdId).animate([
      {background: 'unset'},
      {background: '#7ecc24a3'},
      {background: 'unset'}
    ], { 
      duration: 400,
      iterations: 1
    });

    const el = document.createElement('textarea');
    el.value = info;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  return <tbody>
    {
      data.map(
      (dataRow, rowIdx) => <TR
        key={`tr_${rowIdx}`}
        idx={rowIdx}
        rowColor = {rowColor}
      >
        {
          columns.map((col, idx) => {
            const key = col.colKey;
            const currentValue = dataRow[key];
            const CustomCell = col.CustomCell || null;
            const copyDataActive = col.copyCellDataOnClick ?? copyCellDataOnClick;

            return <TD
              key = {`td_${key}_${rowIdx}${idx}`}
              id = {`td_${key}_${rowIdx}${idx}`}
              dataTip = {currentValue?.toString()}
              size = {col.size || 1}
              className = {key}
              width = {col.width || 100}
              textColor = {textColor}
              cloumnMinWidth = {cloumnMinWidth}
              onClick={copyDataActive ? () => copyToClipboard(currentValue?.toString(),`td_${key}_${rowIdx}${idx}`) : null}
              copyCellDataOnClick={copyDataActive}
              backgroundColor = {backgroundColor}
              borderColor = {borderColor}
            >
              
                <>
                <div className='cellWrapper' id="cellWrapper">
                  {CustomCell ? <CustomCell dataRow={dataRow} currentKey={key} currentValue={currentValue}/> : currentValue}
                </div>
                {(showToolTip || col.showToolTip) && <ToolTip
                  bgColor = {tooltipBgColor}
                  textColor = {tooltipTextColor || textColor}
                  borderColor = {tooltipBorderColor || tooltipBgColor}
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
TableBody.propTypes = {
  data: array,
  columns: array,
}

export default TableBody;