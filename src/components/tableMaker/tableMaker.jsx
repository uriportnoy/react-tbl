import React, { useEffect, useState,useContext } from 'react';
import TableHead from './tableHead';
import TableBody from './tableBody';
import styled from 'styled-components';
import _ from 'lodash';
import ReactTblContext from '../ReactTblContext';
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
    const {pagination:{isVisible}} = useContext(ReactTblContext);

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

    const EmptyData = () => <EmptyTable><span>No Data Rows...</span></EmptyTable>;

    return <>
        {
        _.isEmpty(currentDataPage) ? <EmptyData /> : <TblWrapper>
            <table>
                <TableHead columns={columns} />
                <TableBody data={currentDataPage} columns={columns} />
            </table></TblWrapper>
        }
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
            display:block;
            height: auto;
            /* max-height: 70vh; */
            overflow: overlay;
            overflow-x: hidden;
            &::-webkit-scrollbar-track{}
            &::-webkit-scrollbar
            {
                width: 10px;
                background-color: #173c5a;
            }
            &::-webkit-scrollbar-thumb
            {
                background-color: #000;
            }
        }
        thead{
            display:table;
            width:100%;
            table-layout:fixed; 
        }
        th{
            padding: 0.3em;
        }
    }
`;

const EmptyTable = styled.div`
    width: 100%;
    height: 45px;
    background-color: rgba(111,111,111,0.5);
    font-weight: bold;
    display: grid;
    user-select:none;
    border: 12pt #fff;
    flex: 1 1 auto;
    align-items: center;
    color:#fff;
    display:flex;
    justify-content:center;
    
    svg{
        cursor:pointer;
    }
`;

export default TableMaker;