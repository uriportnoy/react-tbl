# React-TBL

A lightweight & easy to use react table implementation.

## Getting Started [Installation]

To install react-tbl use the following command

```
npm i react-tbl
```

## Usage

To use react-tbl in your app:

```js
import ReactTBL from 'react-tbl';

const App = () => {
  return (
    <div className="App">
      <ReactTBL
        data = {[{
            id:1,
            name: 'moses',
            state: true
        },{
            id:2,
            name: 'hoyas',
            state: true
        }]}
        columns = {[
            {
                header: 'User Id',
                colKey: 'id',
                size: 1
            },{
                header: 'User Name',
                colKey: 'name',
                size: 4
            },{
                header: 'User State',
                colKey: 'state',
                size: 2,
                CustomCell: ({ dataRow, currentKey,currentValue }) => <input
                    className="customInputCell"
                    value = {currentValue.toString()}
                    readOnly
                />
            }
        ]}
    />
    </div>
  );
}
```
## With Props Example
```js
    <ReactTBL
        data = {currentData}
        columns = {columnsData}
        className = "custom_class_name"
        defaultPageSize = {10}
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
}
```

## Columns [Array of columns objects]
```js
[
    {
        header: 'User Id',      // header label [String]
        colKey: 'id',           // key accessor [String]
        size: 1,                // column width [Number]
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
    state: true
}]
```
## User table custom style
```js
{
    maxWidth: '450px',           //(String) 
    maxHeight: '120px',          //(String) 
    fixedHeight: '200px',        //(String) 
    rowColor: '#000',            //(String) 
    textColor: '#000',            //(String) 
    pagination: {
        visible: true,              //(Boolean) 
        backgroundColor: '#333',    //(String) 
        btnColor: '#000',           //(String) 
        prevButtonText: null,       //(String) 
        nextButtonText: 'Next >'    //(String) 
    },
    header: {
            headerColor: '#fff',    //(String) 
            headerBGColor: '#333',  //(String) 
            fontSize: '11pt'        //(String) 
        }
}
```