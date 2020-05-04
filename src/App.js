import React from 'react';
import { getColumnsData } from './components/fakeData/getColumns';
import { getData } from './components/fakeData/getData';
import ReactTBL from './components/tableMaker/index';
import './App.css';

const App = () => {
  const currentData = getData();         // current data based currentShow string
  const columns = getColumnsData();

  return (
    <div className="App">
      <ReactTBL
        data = {currentData}
        columns = {columns || []}
        defaultPageSize = {6}
        style = {{
          maxWidth: '450px',
          maxHeight: '120px',
          minHeight: '40pt',
          fixedHeight: '200px',
          rowColor: '#000',
          textColor: '#000',
          pagination: {
            isVisible: true,
            backgroundColor: '#333',
            btnColor: '#000',
            prevButtonText: null,
            nextButtonText: 'Next >'
          },
          header: {
            headerColor: '#fff',
            headerBGColor: '#333',
            fontSize: '11pt'
          }
        }}
      />
    </div>
  );
}

export default App;
