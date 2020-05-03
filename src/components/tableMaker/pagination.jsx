import React,{useContext} from 'react';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';

export const Pagination = ({page,setPage,totalPages,nextDisabled,prevDisabled}) => {
const {pagination} = useContext(ReactTblContext);
return <PaginationStyle
        page = {page}
        totalPages = {totalPages}
        nextDisabled = {nextDisabled}
        prevDisabled = {prevDisabled}
        btnColor = {pagination?.btnColor || '#333'}
        backgroundColor = {pagination?.backgroundColor}
    >
        <span className='btn prev' onClick = {() => prevDisabled ? null : setPage(page - 1)}>{'<'}</span>
        <span className='label'>{`${page + 1}/${totalPages}`}</span>
        <span className='btn next' onClick = {() => nextDisabled ? null : setPage(page + 1)}>{'>'}</span>
</PaginationStyle>
}

const PaginationStyle = styled.div`
    background: ${props => props.backgroundColor || '#3c464e'};
    display: flex;
    justify-content: center;
    align-items:center;
    padding: 2pt;
    grid-area: pagination;
    padding: 4pt;
    z-index: 10;
    box-sizing: border-box;
    *{
        user-select:none;
    }
    .label{
        width: 30%;
        text-align: center;
        color: #fff;
    }
    .btn{
        width: 120px;
        height: 100%;
        transition: .3s all;
        display: flex;
        position : relative;
        color: #fff;  
        align-items: center;
        justify-content: center;
        font-size: 18pt;
        padding: 0;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0;
        flex-grow: 1;
        &.next{
            background: ${props => props.nextDisabled ? '#ccc' : props.btnColor};
            opacity: ${props => props.nextDisabled ? '0.4' :'1'};
            cursor: ${props => props.nextDisabled ? 'not-allowed' :'pointer'};
        }
        &.prev{
            background: ${props => props.prevDisabled ? '#ccc' : props.btnColor};
            opacity: ${props => props.prevDisabled ? '0.4' :'1'};
            cursor: ${props => props.prevDisabled ? 'not-allowed' :'pointer'};
        }
        &:hover{
            background: rgba(000,000,000,0.7);
        }
    }
`;