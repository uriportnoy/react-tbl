import React, { useEffect, useState,useContext } from 'react';
import PropTypes from 'prop-types';
import TableHead from './tableHead';
import TableBody from './tableBody';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';
import { Pagination } from './pagination';

const TableMaker = ({
    columns,
    data,
    defaultPageSize,
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
        body:{maxHeight,overflowY}
    } = useContext(ReactTblContext);

    useEffect(() => {handlePages()}, [page, data, defaultPageSize]);
    //useEffect(() => {setPage(0);}, [debounceInput]);

    const handlePages = () => {
        if (page === 0) {
            const pageData = data.slice(0, defaultPageSize);  //_.slice(data, [0], [defaultPageSize]);
            setCurrentDataPage(pageData);
        } else {
            const startChunk = page * defaultPageSize ;
            const endChunk = startChunk + defaultPageSize;
            const pageData = data.slice(startChunk,endChunk);  //_.slice(data, [startChunk], [endChunk]);
            setCurrentDataPage(pageData);
        }
        // handle pages 
        const maxPage = Math.ceil(data?.length / defaultPageSize);
        if(Number.isInteger(maxPage)){
            setTotalPages(maxPage);
            setNextDisabled(page + 1 >= maxPage);
            setPrevDisabled(page === 0);
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

    const EmptyData = () => <EmptyTable><tr><td>No Data Rows...</td></tr></EmptyTable>;
    return <>
        <TblWrapper
            maxHeight = {table?.maxHeight}
            fixedHeight = {table?.fixedHeight}
            backgroundColor = {backgroundColor}
            minHeight = {table?.minHeight}
            bodyMaxHeight = {maxHeight}
            overflowY = {overflowY}
            fontFamily = {table?.fontFamily}
        >
        <table>
            <TableHead columns={columns} sortArray={sortArray}/>
            {
                (currentDataPage?.length !== 0 && columns?.length !== 0) ? 
                <TableBody data={currentDataPage} columns={columns} />:
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
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    defaultPageSize: PropTypes.number.isRequired
}
export const TblWrapper = styled.div`
    flex: 1 1 auto;
    overflow-x: ${props => props.overflowX};
    *{
        font-family: ${props => props.fontFamily}; 
    }
    &::-webkit-scrollbar-track{}
            &::-webkit-scrollbar
            {
                width: 10px;
                background-color: ${props => props ?.backgroundColor || '#333'};
            }
            &::-webkit-scrollbar-thumb
            {
                background-color: #000;
            }
    table{
        background-color: transparent;
        border-radius: 4px;
        border-collapse: collapse;
        width: 100%;
        grid-area: table;

        input{
            border: 0;
            background: transparent;
            text-align: center;
            padding-left: 2%;
        }
        tbody {
            display: block;
            max-height: ${props => props.bodyMaxHeight || 'auto'}; 
            height: ${props => props.fixedHeight || 'auto'}; 
            min-height: ${props => props.minHeight || '80pt'};
            overflow-y: ${props => props.overflowY || 'visible'};
            &::-webkit-scrollbar-track{}
            &::-webkit-scrollbar
            {
                width: 10px;
                background-color: ${props => props ?.backgroundColor || '#173c5a'};
            }
            &::-webkit-scrollbar-thumb
            {
                background-color: #000;
            }
        }
        thead{
            display: table;
            width: 100%;
            table-layout: fixed; 
        }
        th{
            padding: 0.3em;
        }
    }
`;

const EmptyTable = styled.tbody`
    background-color: rgba(111,111,111,0.5);
    color:#fff;
    font-weight: bold;
    tr{
        display: grid;
        align-items: center;
        height: 100%;
    }
    svg{
        cursor:pointer;
    }
`;

export default TableMaker;