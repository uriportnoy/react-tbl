# React-TBL

A lightweight & easy to use react table implementation.

## Getting Started [Installation]

To install react-tbl use the following command

```
npm i react-tbl
```
## Package Demo 

[![Sample project for using the package](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-tbl-586yc)

## Usage

To use react-tbl in your app:

```js
import ReactTBL from 'react-tbl';

const App = () => {
  const tblData = [{
            id:1,
            name: 'moses',
            state: true
        },{
            id:2,
            name: 'hoyas',
            state: true
  }];
  const tblColumns = [
    {
        header: 'User Id',
        colKey: 'id',
        size: 1,
    },{
        header: 'User Name',
        colKey: 'name',
        size: 4,
        showToolTip: true
    },{
        header: 'User State',
        colKey: 'state',
        size: 2,
        CustomCell: ({ dataRow, currentKey,currentValue }) => <input
            className="customInputCell"
            value = {currentValue.toString()}
            readOnly
        />
  }];
  return <ReactTBL data = {tblData} columns = {tblColumns}/>
}
```
## With Props Example
```js
    <ReactTBL
        data = {currentData}
        columns = {columnsData}
        className = "custom_class_name"              // [optional]
        defaultPageSize = {10}                       // [optional] - default = 12
        copyCellDataOnClick = {true}                 // [optional] 
        showPagination = {true}                      // default = true
        showToolTip = {true}                         // default = false
        style = {{                                   // [optional] 
            minHeight: '120px',
            maxHeight: '120px',
            maxWidth: '450px',
            minWidth: 'auto',
            fixedHeight: '200px',
            rowColor: '#000',
            textColor: '#000',
            cloumnMinWidth: '100px',
            header: {
                headerColor: '#fff',
                headerBGColor: '#333',
                fontSize: '11pt'
            },
            body:{
                maxHeight: '100px',
                overflowX: 'scroll'
            },
            pagination: {
                backgroundColor: '#333',
                btnColor: '#000',
                nextButtonText: 'Next >'
            },
        }}
    />
}
```

## Columns [Array of columns objects]
```js
[
    {
        header: 'User Id',      // header label [String]
        colKey: 'id',           // key accessor [String]
        size: 1,                // column width [Number]
        showToolTip: true       // show tool tip for specific cell
        CustomCell: function({ dataRow, currentKey,currentValue })
    }
]
```
## Data [Array of data]
```js
[{
    id:1,
    name: 'moses',
    state: true
},{
    id:2,
    name: 'hoyas',
    state: false
}]
```

## Table props

|        General          |    Default     |
| :-------------------:   | :------------: |
|    data                 |                |
|    columns              |                |
|    className            |                |
|    defaultPageSize      |       12       |
|    showPagination       |      true      |
|    showToolTip          |      false     |   show tool tip for each cell
|    style                |        🠋      |


## Table style

|      General      |    Default    | 
| :---------------: |:-------------:| 
|     minHeight     |     80pt      | 
|     maxWidth      |     80vw      | 
|     maxHeight     |     auto      |  
|     minWidth      |     auto      |  
|    fixedHeight    |     auto      |  
|     rowColor      |   #ccc/#eee   |  
|    textColor      |     #000      |  
|  cloumnMinWidth   |     100px     |   
|     overflowX     |     auto      |

     
|    Header      |    Default    ||         Body         |  Default  ||    Pagination     |   Default     |
| :-----------:  | :-----------: ||      :--------:      | :-------: || :--------------:  | :-----------: |
|  headerColor   |      #fff     ||       maxHeight      |  650px    ||                   |               | 
|  headerBGColor |      #333     ||       overflowY      |  scroll   ||  backgroundColor  |    #333       |
|  fontSize      |      12pt     ||   tooltipTextColor   |   #fff    ||  btnColor         |    #000       |  
|                |               ||   tooltipBorderColor |   #000    ||  prevButtonText   |   Previous    |  
|                |               ||    tooltipBgColor    |   #000    ||  nextButtonText   |    Next       |  
|                |               ||                      |           ||                   |               |   
|                |               ||                      |           ||                   |               |   
|                |               ||                      |           ||                   |               |     
 

## User table custom STYLE 
```js
{
    minHeight:      '120px',           // (String) 
    maxWidth:       '450px',           // (String) 
    maxHeight:      '120px',           // (String) 
    minWidth:       '800px',           // (String)
    fixedHeight:    '200px',           // (String) 
    rowColor:       '#000' ,           // (String) 
    textColor:      '#000' ,           // (String) 
    cloumnMinWidth: '100px',           // (string)
    overflowX: 'auto'
    header: {
            headerColor: '#fff',       // (String) 
            headerBGColor: '#333',     // (String) 
            fontSize: '11pt'           // (String) 
    },
    body:{
        maxHeight: 'auto',
        overflowY: 'scroll',
        tooltipTextColor: '#555',
        tooltipBorderColor: 'yellow',
        tooltipBgColor: 'green'
    },
    pagination: {
        backgroundColor: '#333',       // (String) 
        btnColor: '#000',              // (String) 
        prevButtonText: null,          // (String) 
        nextButtonText: 'Next >'       // (String) 
    },
}
```