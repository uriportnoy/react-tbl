import React,{useState,useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactTblContext from './ReactTblContext';


const Resizer = ({id}) => {
    const {table} = useContext(ReactTblContext);
    const columnMinWidth = parseInt(table?.columnMinWidth, 10) || 100;
    let currTh;
    let nextTh;
    let currTds = [];
    let nextTds = [];

    let currWidth;
    let nextWidth;
    let pageX;

    const thRef = React.useRef();

        useEffect(() => {
            document.addEventListener('mouseup', onMouseUp);
            document.addEventListener('mousemove', onMouseMove);
            thRef.current.addEventListener('mousedown',onMouseDown);

            return () => {
                thRef.current.addEventListener('mousedown',onMouseDown);
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            };
        }, []);

        const onMouseDown = (e) => {
            currTds = document.querySelectorAll(`[id^=td_${id}]`);   
            nextTds = document.querySelectorAll(`[id^=td_${id + 1}]`);   
            currTh = e.target.parentElement;
            nextTh = currTh.nextElementSibling;
            pageX = e.pageX;

            if(currTh)currWidth = currTh.offsetWidth;
            if(nextTh)nextWidth = nextTh.offsetWidth;     
        }
        const onMouseUp = () => {
            currTh = undefined;
            currTds = [];
            nextTh = undefined;
            nextTds = [];
            pageX = undefined;
            currWidth = undefined;
            nextWidth = undefined;
        }

        const onMouseMove = (e) => {
            if(currTh){
                var diffX = e.pageX - pageX;
                const getCurrRunningWidth = currTh.offsetWidth;
                const getNextRunningWidth = nextTh.offsetWidth;

                if(getNextRunningWidth > columnMinWidth && currTh && currTds?.length > 0){
                    [...currTds,currTh].forEach(elem => {
                        elem.style.flexBasis = (currWidth + diffX) + 'px';
                    })
                }
                if(getCurrRunningWidth > columnMinWidth && nextTh && nextTds?.length > 0){
                    [...nextTds,nextTh].forEach(elem => {
                        elem.style.flexBasis = (nextWidth - (diffX)) + 'px';
                    });
                }

            }
          }

        return <ResizerComponent ref = {thRef}  onClick={(e) => e.stopPropagation()}/>
    }

const ResizerComponent = styled.div`
    top: 0;
    right: -3px;
    bottom: 0;
    width: 6px;
    position: absolute;
    cursor: col-resize;
    background: #000;
    
    z-index: 999;
`;

Resizer.propTypes = {
    backgroundColor: PropTypes.string,
    sortArray: PropTypes.func,
    color: PropTypes.string
}

export default Resizer;
