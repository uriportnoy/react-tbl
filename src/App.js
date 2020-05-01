import React,{useState} from 'react';
import { getColumnsData } from './components/fakeData/getColumns';
import { getData } from './components/fakeData/getData';
import ReactTBL from './components/ReactTBL';
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
        defaultPageSize = {4}
        style = {{
          maxWidth: '450px',
          pagination: {
            visible: true,
            backgroundColor: '#333',
            btnColor: '#000'
          },
          header: {
            headerColor: '#333',
            fontSize: '11pt'
          }
        }}
        useSearchBox = {false}
      />
    </div>
  );
}

export default App;
