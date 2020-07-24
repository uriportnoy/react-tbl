import styled from 'styled-components';
import {number,string} from 'prop-types';

export const TR = styled.tr`
    animation: fadeIn ${props => (props.idx < 10) ? ('0.' + props.idx) : '1'}s;
    background-color: ${props => props?.rowColor || props.idx % 2 === 0 ? '#ccc' : '#eee'};
    transition: .7s all;
    width: 100%;
    display: flex;  
     @keyframes fadeIn {
      from {opacity: 0;}
      to {opacity: 1;
    }
`;

TR.propTypes = {
  rowColor: string
}

export const TD = styled.td`
    flex: ${props => props.size} 1 ${props => props.width}px; 
    border: 1pt solid ${props => props.borderColor};
    font-size: 12pt;
    position: relative;
    padding:0;
    box-sizing: border-box;
    transition: .7s all;
    text-align: center;
    padding: 2pt;
    color: ${props => props.textColor};
    min-width: ${props => props.cloumnMinWidth};
    cursor: ${props=> props.copyCellDataOnClick ? 'copy' : 'auto'};

    .defaultCell{
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &:hover{
        .tooltiptext {
          visibility: visible;
          opacity: 1;
        }
      }
`;
TD.propTypes = {
  width: number.isRequired,
  className: string,
  textColor: string,
  dataTip: string,
  defaultPageSize: number
}

export const ToolTip = styled.span`
    visibility: hidden;
    opacity: 0;

    background: ${props => props.bgColor};
    border: 1px solid ${props => props.borderColor};
    color: ${props => props.textColor};
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 999;
    top: -110%;
    transition: opacity 0.3s;
    transform: translateX(-50%);

    &:after{
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: ${props => props.borderColor} transparent transparent transparent;
    }
`;