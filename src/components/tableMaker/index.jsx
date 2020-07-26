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
    isLoading: props.isLoading || false,
    CustomLoader: props.CustomLoader || null,
    table:{
        maxWidth: styleProp?.maxWidth,
        minHeight: styleProp?.minHeight || 'auto',
        maxHeight: styleProp?.maxHeight || 'auto',
        rowColor:  styleProp?.rowColor || null,
        textColor: styleProp?.textColor || '#000',
        cloumnMinWidth: styleProp?.cloumnMinWidth || '120px',
        overflowX: styleProp?.overflowX || 'auto',
        showToolTip: props.showToolTip || false,
        fontFamily: styleProp?.fontFamily || 'monospace',
    },
    tableHeader:{
        backgroundColor: headerStyle?.headerBGColor  || '#333',
        color: headerStyle?.headerColor || '#fff',
        fontSize: headerStyle?.fontSize || '12pt',
        sortable: props?.sortable ?? true
    },
    body:{
      bodyMaxHeight: bodyStyle?.fixedHeight || bodyStyle?.maxHeight || 'auto',
      minHeight: bodyStyle?.minHeight || 'auto',
      fixedHeight: bodyStyle?.fixedHeight || 'auto',
      maxWidth: bodyStyle?.maxWidth || 'auto',
      overflowY: bodyStyle?.overflowY || 'overlay',
      overflowX: bodyStyle?.overflowX || 'visible',
      tooltipTextColor: bodyStyle?.tooltipTextColor || '#fff',
      tooltipBgColor: bodyStyle?.tooltipBgColor  || '#000',
      tooltipBorderColor: bodyStyle?.tooltipBorderColor || bodyStyle?.tooltipBgColor || '#000',
      backgroundColor: bodyStyle?.backgroundColor || '#eee',
      borderColor: bodyStyle?.borderColor || '#333'
    },
    pagination:{
        isVisible: props?.showPagination ?? true,
        backgroundColor: paginationStyle?.backgroundColor || headerStyle?.headerColor || '#333',
        btnColor: paginationStyle?.btnColor  || '#333',
        nextButtonText: paginationStyle?.nextButtonText || 'Next',
        prevButtonText: paginationStyle?.prevButtonText  || 'Previous'
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
 