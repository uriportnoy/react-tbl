import React from 'react';
import TableMaker from './tableMaker';
import SearchBox from '../searchBox/searchBox';
import useDebounce from '../common/useDebounce';
import { ReactTblContextProvider } from './ReactTblContext';
import styled from 'styled-components';

const ReactTBL = props => {
  const debounceInput = useDebounce(props?.currentInput,500);
  const {style:{header,pagination}} = props;

  return <ReactTblContextProvider value = {{
    table:{
        maxWidth: props?.style?.maxWidth,
        maxHeight: props.style?.maxHeight,
        fixedHeight: props.style?.fixedHeight,
        rowColor:  props.style?.rowColor,
        textColor: props.style?.textColor
    },
    tableHeader:{
        backgroundColor: header?.headerBGColor,
        color: header?.headerColor,
        fontSize: header?.fontSize
    },
    pagination:{
        isVisible: pagination?.visible || true,
        backgroundColor: pagination?.backgroundColor || header?.headerColor,
        btnColor: pagination?.btnColor 
    }
  }}>
      <ReactTblStyled maxWidth = {props?.style?.maxWidth}>
        {/* {props.useSearchBox && <SearchBox
            currentInput = {props?.currentInput}
            setCurrentInput = {props?.setCurrentInput}
        />} */}
        <TableMaker
            data = {props?.data}
            columns = {props?.columns || []}
            defaultPageSize = {props?.defaultPageSize || 12}
            debounceInput = {debounceInput}
            pagination = {props?.pagination?.isVisible}
        />
  </ReactTblStyled>
  </ReactTblContextProvider>
}

const ReactTblStyled = styled.div`
    margin: 0 auto;
    max-width: ${props => props.maxWidth || '80vw'};
    display: flex;
    flex-direction: column;
    border: 1pt solid;

`;
export default ReactTBL;
 