import React,{useState} from 'react';
import { getColumnsData } from './components/fakeData/getColumns';
import { getData } from './components/fakeData/getData';
import ReactTBL from './components/tableMaker/ReactTBL';
import './App.css';

const App = () => {
  const [currentData,setCurrentData] = useState(getData() || []);          // current data based currentShow string
  const columns = getColumnsData();
  const [currentInput,setCurrentInput] = useState('');

  return (
    <div className="App">
      <ReactTBL
        currentInput = {currentInput}
        setCurrentInput = {setCurrentInput}
        data = {currentData}
        columns = {columns || []}
        defaultPageSize = {6}
        style = {{
          maxWidth: '450px',
          maxHeight: '120px',
          fixedHeight: '200px',
          rowColor: '#000',
          textColor: '#000',
          pagination: {
            visible: true,
            backgroundColor: '#333',
            btnColor: '#000'
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
