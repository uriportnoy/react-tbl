import React, { useEffect, useState,useContext } from 'react';
import TableHead from './tableHead';
import TableBody from './tableBody';
import styled from 'styled-components';
import _ from 'lodash';
import ReactTblContext from './ReactTblContext';
import { Pagination } from './pagination';

const TableMaker = ({
    columns,
    data,
    defaultPageSize,
    type,
    debounceInput = null
}) => {
    const [currentDataPage, setCurrentDataPage] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [prevDisabled, setPrevDisabled] = useState(true);
    const {pagination:{isVisible},tableHeader:{backgroundColor},table} = useContext(ReactTblContext);

    useEffect(() => {
        if (page === 0) {
            const pageData = _.slice(data, [0], [defaultPageSize]);
            setCurrentDataPage(pageData);
        } else {
            const startChunk = page * defaultPageSize ;
            const endChunk = startChunk + defaultPageSize;
            const pageData = _.slice(data, [startChunk], [endChunk]);
            setCurrentDataPage(pageData);
        }
        // handle pages 
        const maxPage = Math.ceil(data?.length / defaultPageSize);
        if(Number.isInteger(maxPage)){
            setTotalPages(maxPage);
            setNextDisabled(page + 1 >= maxPage);
            setPrevDisabled(page === 0);
        }
    }, [page, data, defaultPageSize]);

    useEffect(() => {
        setPage(0);
    }, [type, debounceInput]);

    const EmptyData = () => <EmptyTable><tr><td>No Data Rows...</td></tr></EmptyTable>;

    return <>
        <TblWrapper
            maxHeight = {table?.maxHeight}
            fixedHeight = {table?.fixedHeight}
            backgroundColor = {backgroundColor}
        >
        <table>
            <TableHead columns={columns} />
            {
                (_.isEmpty(currentDataPage) || _.isEmpty(columns)) ? <EmptyData /> :
                <TableBody data={currentDataPage} columns={columns} />
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

export const TblWrapper = styled.div`
    flex: 1 1 auto;
    table{
        font-family: monospace; 
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
            overflow: overlay;
            overflow-x: hidden;
            max-height: ${props => props.maxHeight || 'auto'}; 
            height: ${props => props.fixedHeight || 'auto'}; 
            min-height: ${props => props.minHeight || '80pt'};
            
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