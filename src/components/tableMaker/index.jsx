import React from 'react';
import TableMaker from './tableMaker';
//import SearchBox from '../searchBox/searchBox';
//import useDebounce from '../common/useDebounce';
import { ReactTblContextProvider } from './ReactTblContext';
import styled from 'styled-components';

const ReactTBL = props => {
  //const debounceInput = useDebounce(props?.currentInput,500);
  const styleProp = props?.style;
  const headerStyle = styleProp?.header;
  const paginationStyle = styleProp?.pagination;
  const bodyStyle = styleProp?.body;

  return <ReactTblContextProvider value = {{
    copyCellDataOnClick: props.copyCellDataOnClick || null,
    table:{
        maxWidth: styleProp?.maxWidth,
        maxHeight: styleProp?.maxHeight,
        minHeight: styleProp?.minHeight,
        fixedHeight: styleProp?.fixedHeight,
        rowColor:  styleProp?.rowColor,
        textColor: styleProp?.textColor,
        cloumnMinWidth: styleProp?.cloumnMinWidth,
        overflowX: styleProp?.overflowX || 'auto',
        showToolTip: props.showToolTip || false,
        fontFamily: styleProp?.fontFamily || 'monospace'
    },
    tableHeader:{
        backgroundColor: headerStyle?.headerBGColor,
        color: headerStyle?.headerColor,
        fontSize: headerStyle?.fontSize,
        sortable: props?.sortable ?? true
    },
    body:{
      maxHeight: bodyStyle?.maxHeight,
      overflowY: bodyStyle?.overflowY,
      tooltipTextColor: bodyStyle?.tooltipTextColor,
      tooltipBgColor: bodyStyle?.tooltipBgColor,
      tooltipBorderColor: bodyStyle?.tooltipBorderColor
    },
    pagination:{
        isVisible: props?.showPagination ?? true,
        backgroundColor: paginationStyle?.backgroundColor || headerStyle?.headerColor,
        btnColor: paginationStyle?.btnColor,
        nextButtonText: paginationStyle?.nextButtonText,
        prevButtonText: paginationStyle?.prevButtonText
    }
  }}>
      <ReactTblStyled
        className = {props?.className || 'react_tbl_wrapper'}
        maxWidth = {styleProp?.maxWidth}
        minHeight = {styleProp?.minHeight}
        minWidth = {styleProp?.minWidth}
      >
        {/* {props.useSearchBox && <SearchBox
            currentInput = {props?.currentInput}
            setCurrentInput = {props?.setCurrentInput}
        />} */}
        <TableMaker
            data = {props?.data}
            columns = {props?.columns || []}
            defaultPageSize = {props?.defaultPageSize || 12}
            //debounceInput = {debounceInput}
            pagination = {paginationStyle?.isVisible}
        />
  </ReactTblStyled>
  </ReactTblContextProvider>
}

const ReactTblStyled = styled.div`
    margin: 0 auto;
    min-width: ${props => props.minWidth || 'auto'};
    max-width: ${props => props.maxWidth || '80vw'};
    min-height: ${props => props.minHeight};
    display: flex;
    flex-direction: column;
    border: 2px solid;
    box-sizing: border-box;

`;
export default ReactTBL;
 