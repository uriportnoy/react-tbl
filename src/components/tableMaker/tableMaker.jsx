import React, { useEffect, useState,useContext } from 'react';
import {array,number} from 'prop-types';
import TableHead from './tableHead';
import TableBody from './tableBody';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';
import { Pagination } from './pagination';
import {Loader} from './Loader';

const TableMaker = ({
    columns,
    data,
    defaultPageSize
    //debounceInput = null
}) => {
    const [currentDataPage, setCurrentDataPage] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const {
        pagination:{isVisible},
        tableHeader:{backgroundColor},
        table,
        CustomLoader,
        isLoading,
        body:{bodyMaxHeight,overflowY,backgroundColor: bodyBGColor,minHeight,fixedHeight,overflowX: bodyOverFlowX}
    } = useContext(ReactTblContext);

    useEffect(() => {handlePages()}, [page, data, defaultPageSize]);

    const handlePages = () => {
        if(data && Array.isArray(data) && data.length > 0){
            if (page === 0) {
                const pageData = data?.slice(0, defaultPageSize);  //_.slice(data, [0], [defaultPageSize]);
                setCurrentDataPage(pageData);
            } else {
                const startChunk = page * defaultPageSize ;
                const endChunk = startChunk + defaultPageSize;
                const pageData = data?.slice(startChunk,endChunk);  //_.slice(data, [startChunk], [endChunk]);
                setCurrentDataPage(pageData);
            }
            // handle pages 
            const maxPage = Math.ceil(data?.length / defaultPageSize);
            if(Number.isInteger(maxPage)){
                setTotalPages(maxPage);
                setNextDisabled(page + 1 >= maxPage);
                setPrevDisabled(page === 0);
            }
        }else{
            setCurrentDataPage([]);
        }
    }

    const sortArray = (columnType,high = true) => {
        const sortedData = [...currentDataPage].sort((a, b) => {
         if(a[columnType] < b[columnType]) { return high ? -1 : 1; }
            if(a[columnType] > b[columnType]) { return high ? 1 : -1; }
            return 0;
        });
        setCurrentDataPage(sortedData);
    }

const Loading = () => <EmptyTable minHeight={minHeight}><tr><td>{
    CustomLoader ? <CustomLoader /> : <Loader color={backgroundColor}/>
}</td></tr></EmptyTable >;

const EmptyData = () => <EmptyTable minHeight={minHeight}><tr><td>No Data...</td></tr></EmptyTable>;

    return <>
        <TblWrapper
            tableMaxHeight = {table?.maxHeight}
            fixedHeight = {fixedHeight}
            backgroundColor = {backgroundColor}
            minHeight = {minHeight}
            bodyMaxHeight = {bodyMaxHeight}
            overflowY = {overflowY}
            fontFamily = {table?.fontFamily}
            maxWidth = {table?.maxWidth}
            overflowX = {table?.overflowX}
            bodyBGColor = {bodyBGColor}
            bodyOverFlowX = {bodyOverFlowX}
            tableMinHeight = {table.minHeight}
        >
        <table>
            <TableHead columns={columns} sortArray={sortArray}/>
            {   
                 isLoading ? <Loading /> : (currentDataPage?.length !== 0 && columns?.length !== 0) ?
                <TableBody data={currentDataPage} columns={columns} defaultPageSize={defaultPageSize}/>:
                <EmptyData /> 
            }
        </table></TblWrapper>
        {isVisible && <Pagination
            setPage={setPage}
            page={page}
            totalPages={totalPages}
            nextDisabled={nextDisabled}
            prevDisabled={prevDisabled}
        />}
    </>
}
TableMaker.propTypes = {
    columns: array.isRequired,
    data: array.isRequired,
    defaultPageSize: number.isRequired
}
export const TblWrapper = styled.div`
    flex: 1 1 auto;
    overflow-x: ${props => props.overflowX};
    max-width: auto;

    *{
        font-family: ${props => props.fontFamily}; 
    }
    &::-webkit-scrollbar-track{}
            &::-webkit-scrollbar
            {
                width: 10px;
                background-color: ${props => props ?.backgroundColor};
            }
            &::-webkit-scrollbar-thumb
            {
                background-color: #000;
            }
    table{
        background-color: transparent;
        border-collapse: collapse;
        width: 100%;
        max-height: ${props => props.tableMaxHeight};
        min-height: ${props => props.tableMinHeight};
        overflow-y: ${props => props.overflowY};

        input{
            border: 0;
            background: transparent;
            text-align: center;
            padding-left: 2%;
        }
        tbody {
            background: ${props => props.bodyBGColor};
            max-height: ${props => props.bodyMaxHeight}; 
            height: ${props => props.fixedHeight}; 
            min-height: ${props => props.minHeight};
            width: 100%;
            display: block;
        }
        &::-webkit-scrollbar-track{}
            &::-webkit-scrollbar
            {
                width: 10px;
                background-color: ${props => props?.backgroundColor || '#173c5a'};
            }
            &::-webkit-scrollbar-thumb
            {
                background-color: #000;
            }
    }
`;

const EmptyTable = styled.tbody`
    color: #000;
    font-weight: bold;
    display: grid !important;
    align-items: center;
    min-height: ${props => props.minHeight};
    tr{
        display: grid;
        align-items: center;
        height: 100%;
        font-size: 15pt;
        text-align: center;
    }
`;

export default TableMaker;