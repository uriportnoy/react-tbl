import React from 'react';
import { getColumnsData } from './components/fakeData/getColumns';
import { getData } from './components/fakeData/getData';
import ReactTBL from './components/tableMaker/index';
import './App.css';
import {Loader} from './components/tableMaker/Loader';

const App = () => {
  const [currentData,setCurrentData] = React.useState([]);         // current data based currentShow string
  const [columns,setColumns] = React.useState(getColumnsData());
  const [isLoading,setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setCurrentData(getData());
      setIsLoading(false);
    }, 2200);
  },[]);

  return (
      <ReactTBL
        data = {currentData}
        columns = {columns || []}
        defaultPageSize = {3}
        sortable = {true}
        copyCellDataOnClick = {true}
        isLoading = {isLoading}
        //CustomLoader = {() => <Loader color='green'/>}
        style = {{
          //maxWidth: '250px',
         // maxHeight: '120px',
          //minHeight: '40pt',
          //minWidth: 'auto',
          fixedHeight: '100px',
          //rowColor: '#000',
          //textColor: '#000',
          //cloumnMinWidth: '100px',
          //fontFamily: 'arial',
          header: {
            //headerColor: '#fff',
            //headerBGColor: '#333',
            //fontSize: '11pt'
          },
          body:{
            // maxHeight: '150px',
            // overflowY: 'scroll',
            // tooltipTextColor: '#555',
            // tooltipBorderColor: 'yellow',
            // tooltipBgColor: 'green'
            // backgroundColor: 'yellow',
            // borderColor: 'yellow'
          },
          pagination: {
            //backgroundColor: '#333',
            //btnColor: '#000',
            //prevButtonText: null,
            //nextButtonText: 'Next >'
          },
        }}
      />
  );
}

export default App;
