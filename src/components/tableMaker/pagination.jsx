import React,{useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';

export const Pagination = ({page,setPage,totalPages,nextDisabled,prevDisabled}) => {
const {pagination,table:{fontFamily}} = useContext(ReactTblContext);

return <PaginationStyle
        page = {page}
        totalPages = {totalPages}
        nextDisabled = {nextDisabled}
        prevDisabled = {prevDisabled}
        fontFamily = {fontFamily}
        color = {pagination?.color}
        btnsColor = {pagination?.btnsColor}
        btnsBGColor = {pagination?.btnsBGColor}
        backgroundColor = {pagination?.backgroundColor}
    >
        <span className='btn prev' onClick = {() => prevDisabled ? null : setPage(page - 1)}>{pagination?.prevButtonText}</span>
        <span className='label'>{`${page + (totalPages !== 0 ? 1 : 0)}/${totalPages}`}</span>
        <span className='btn next' onClick = {() => nextDisabled ? null : setPage(page + 1)}>{pagination?.nextButtonText}</span>
</PaginationStyle>
}

const PaginationStyle = styled.div`
    background: ${props => props.backgroundColor};
    display: flex;
    justify-content: center;
    align-items:center;
    padding: 2pt;
    padding: 4pt;
    z-index: 10;
    box-sizing: border-box;
    *{
        user-select:none;
        font-family: ${props => props.fontFamily};
        color: ${props => props.color};
    }
    .label{
        width: 30%;
        text-align: center;
    }
    .btn{
        width: 120px;
        height: 100%;
        transition: .3s all;
        display: flex;
        position : relative;
        color: ${props => props.btnsColor};;  
        align-items: center;
        justify-content: center;
        padding: 3pt;
        font-weight: bold;
        cursor: pointer;
        font-family: ${props => props.fontFamily};
        border-radius: 3pt;
        flex-grow: 1;
        &.next{
            background: ${props => props.nextDisabled ? '#ccc' : props.btnsBGColor};
            opacity: ${props => props.nextDisabled ? '0.4' :'1'};
            cursor: ${props => props.nextDisabled ? 'not-allowed' :'pointer'};
        }
        &.prev{
            background: ${props => props.prevDisabled ? '#ccc' : props.btnsBGColor};
            opacity: ${props => props.prevDisabled ? '0.4' :'1'};
            cursor: ${props => props.prevDisabled ? 'not-allowed' :'pointer'};
        }
        &:hover{
            background: rgba(000,000,000,0.7);
        }
    }
`;
Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
    nextDisabled: PropTypes.bool.isRequired,
    prevDisabled: PropTypes.bool.isRequired
}