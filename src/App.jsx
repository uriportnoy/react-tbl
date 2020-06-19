import React from 'react';
import { getColumnsData } from './components/fakeData/getColumns';
import { getData } from './components/fakeData/getData';
import ReactTBL from './components/tableMaker/index';
import './App.css';

const App = () => {
  const currentData = getData();         // current data based currentShow string
  const columns = getColumnsData();

  return (
      <ReactTBL
        data = {currentData}
        columns = {columns || []}
        defaultPageSize = {3}
        style = {{
          maxWidth: '450px',
          maxHeight: '120px',
          minHeight: '40pt',
          minWidth: 'auto',
          fixedHeight: '130px',
          rowColor: '#000',
          textColor: '#000',
          cloumnMinWidth: '100px',
          //fontFamily: 'arial',
          header: {
            headerColor: '#fff',
            headerBGColor: '#333',
            fontSize: '11pt'
          },
          body:{
            maxHeight: '150px',
            //overflowY: 'scroll',
            // tooltipTextColor: '#555',
            // tooltipBorderColor: 'yellow',
            // tooltipBgColor: 'green'
          },
          pagination: {
            backgroundColor: '#333',
            btnColor: '#000',
            prevButtonText: null,
            nextButtonText: 'Next >'
          },
        }}
      />
  );
}

export default App;
