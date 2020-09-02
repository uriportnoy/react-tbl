import React,{useContext,useRef} from 'react';
import ReactDOM from 'react-dom';

import ReactTblContext from './ReactTblContext';
import {array,number} from 'prop-types';
import {TR,TD,ToolTip} from './tr_td';
import { getColumnsData } from '../fakeData/getColumns';

const TableBody = ({
  data,
  columns
}) => {
  const {
    table:{rowBGColor,textColor,columnMinWidth,showToolTip,fontFamily},
    body: {tooltipTextColor,tooltipBgColor,tooltipBorderColor,backgroundColor,borderColor,cellPadding,fontSize},
    copyCellDataOnClick
  } = useContext(ReactTblContext);
  let refs = [];

  const copyToClipboard = (info,tdId) =>{
    tdId.classList.add(`copyCell`);
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
        className='TR'
        key={`tr_${rowIdx}`}
        idx={rowIdx}
        rowBGColor = {rowBGColor}
      >
        {
          columns.map((col, idx) => {
            const key = col.colKey;
            const currentValue = dataRow[key];
            const CustomCell = col.CustomCell || null;
            const copyDataActive = col.copyCellDataOnClick ?? copyCellDataOnClick;
            refs[`td_${idx}_${rowIdx}_ref`] = React.createRef()

            return <TD
              key = {`td_${key}_${rowIdx}`}
              id = {`td_${idx}_${rowIdx}`}
              ref={refs[`td_${idx}_${rowIdx}_ref`]}
              dataTip = {currentValue?.toString()}
              size = {col.size || 1}
              className = {key}
              width = {columnMinWidth}
              textColor = {textColor}
              columnMinWidth = {columnMinWidth}
              onClick = {copyDataActive ? () => copyToClipboard(currentValue?.toString(),refs[`td_${idx}_${rowIdx}_ref`].current) : null}
              copyCellDataOnClick={copyDataActive}
              backgroundColor = {backgroundColor}
              borderColor = {borderColor}
              cellPadding = {cellPadding}
              fontSize={fontSize}
            > 
                <>
                <div className='cellWrapper' id="cellWrapper">
                  {CustomCell ? <CustomCell dataRow={dataRow} currentKey={key} currentValue={currentValue}/> : currentValue}
                </div>
                {(showToolTip || col.showToolTip) && (currentValue?.length > 0) && <ToolTip
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