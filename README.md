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
        copyCellDataOnClick: true,
        showToolTip: true
    },{
        header: 'User State',
        colKey: 'state',
        size: 2,
        sortable: false,
        CustomCell: ({ dataRow, currentKey,currentValue }) => <input
            className="customInputCell"
            value = {currentValue.toString()}
            readOnly
        />
  }];
  return <ReactTBL data = {tblData} columns = {tblColumns}/>
}
```
## Props Example
```js
    <ReactTBL
        data = {currentData}
        columns = {columnsData}
        className = "custom_class_name"              // [optional]
        defaultPageSize = {10}                       // [optional] - default = 12
        copyCellDataOnClick = {true}                 // [optional] 
        showPagination = {true}                      // default = true
        showToolTip = {true}                         // default = false
        sortable = {true}                            // default = true
        isLoading = {true}                           // shows loader           
        CustomLoader = {Loader}                      // custom loader component [optional]
        style = {{                                   // custom style [optional]
           maxWidth: '250px',
           minHeight: '400pt',
           maxHeight: '50px',
           minWidth: 'auto',
           rowColor: 'yellow',
           textColor: 'red',
           cloumnMinWidth: '100px',
           fontFamily: 'arial',

          header: {
            headerColor: '#fff',
            headerBGColor: '#333',
            fontSize: '11pt'
          },

          body:{
            maxHeight: '150px',
            minHeight: '200pt',
            fixedHeight: '90px',
            overflowY: 'scroll',
            overflowX: 'visible',
            tooltipTextColor: '#555',
            tooltipBorderColor: 'yellow',
            tooltipBgColor: 'green'
            backgroundColor: 'yellow',
            borderColor: 'yellow',
          },

          pagination: {
            backgroundColor: '#333',
            btnColor: '#000',
            prevButtonText: null,
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
        header: 'User Id',          // header label [String]
        colKey: 'id',               // key accessor [String]
        size: 1,                    // column width [Number]
        showToolTip: true           // show tool tip for specific cell
        sortable: false,            // in order to cancel sort option for specific column  
        copyCellDataOnClick: true,  // enable/disable 'copy cell's data' on specific column 
        CustomCell: function({ dataRow, currentKey,currentValue })
    }
]
```
## Data [Array of data]
```js
[{
    id:1,
    name: 'Moses',
    state: true
},{
    id:2,
    name: 'Hoyas',
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
|    sortable             |      true      |
|    copyCellDataOnClick  |      false     |
|    showPagination       |      true      |
|    showToolTip          |      false     |   shows tool tip for each cell
|    style                |        V       |
|    isLoading            |                |   shows loader when is loading = true
|    CustomLoader         |                |


## Table style

|      General      |    Default    | 
| :---------------: |:-------------:| 
|     minHeight     |     auto      | 
|     maxWidth      |     80vw      | 
|     maxHeight     |     auto      |  
|     minWidth      |     auto      |  
|     rowColor      |   #ccc/#eee   |  
|    textColor      |     #000      |  
|  cloumnMinWidth   |     100px     |  
|     overflowX     |     auto      |
|    fontFamily     |   monospace   |

## Header, Body, Pagination

|    Header      |    Default    |         Body          |  Default  |    Pagination     |   Default     |
| :-----------:  | :-----------: |  :----------------:   | :-------: | :--------------:  | :-----------: |
|  headerColor   |      #fff     |    maxHeight          |   650px   |                   |               | 
|  headerBGColor |      #333     |    overflowY          |  overlay  |  backgroundColor  |    #333       |
|                |               |    overflowX          |  visible  |                   |               |
|    fontSize    |      12pt     |    tooltipTextColor   |   #fff    |  btnColor         |    #000       |  
|                |               |    tooltipBorderColor |   #000    |  prevButtonText   |   Previous    |  
|                |               |    tooltipBgColor     |   #000    |  nextButtonText   |    Next       |             
|                |               |    backgroundColor    |  '#333'   |                   |               |
|                |               |    borderColor        |  '#333'   |                   |               |
|                |               |    fixedHeight        |   auto    |                   |               |  
|                |               |    minHeight          |   auto    |                   |               |


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
    overflowX: 'auto',
    fontFamily: 'monospace',
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