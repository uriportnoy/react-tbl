import React,{useState,useContext,useEffect} from 'react';
import styled from 'styled-components';

const SearchBox = ({
    currentInput,
    setCurrentInput
}) => {

   useEffect(() => {
        document.getElementById("searchInput").focus();
   },[]);

   return <StyledSearch>
        <div className='search'>
          <span>Search</span>
          <input
            placeholder='Search...'
            value={currentInput}
            id = "searchInput"
            onChange = {({target:{value}}) => setCurrentInput(value)}
          />
        </div>
      </StyledSearch>
}
const StyledSearch = styled.div`
    display: flex;
    justify-content: space-between;
  .search{
    display: flex;
    align-items: center;
    justify-content: center;
    padding:1%;
    min-width: 285px;
    >input{
        padding: 3pt;
        background: #eaeaea;
        border: 0;
        border-radius: 4pt;
    }
    >span{
        margin-right: 4%;
        color:#eaeaea;
    }
  }

`;
export default SearchBox;