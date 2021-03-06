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
	const tblData = [
		{
			id: 1,
			name: 'moses',
			state: true,
		},
		{
			id: 2,
			name: 'hoyas',
			state: true,
		},
	];
	const tblColumns = [
		{
			header: 'User Id',
			colKey: 'id',
			size: 1,
		},
		{
			header: 'User Name',
			colKey: 'name',
			size: 4,
			copyCellDataOnClick: true,
			showToolTip: true,
		},
		{
			header: 'User State',
			colKey: 'state',
			size: 2,
			sortable: false,
			CustomCell: ({ dataRow, currentKey, currentValue }) => (
				<input
					className='customInputCell'
					value={currentValue.toString()}
					readOnly
				/>
			),
		},
	];
	return <ReactTBL data={tblData} columns={tblColumns} />;
};
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
        columnsResize = {true}                       // default = false
        isLoading = {true}                           // shows loader
        CustomLoader = {Loader}                      // custom loader component [optional]
        resize = {true}                              // default = false
        style = {{                                   // custom style [optional]
           maxWidth: '250px',
           minHeight: '400pt',
           maxHeight: '50px',
           minWidth: 'auto',
           rowBGColor: 'yellow',
           textColor: 'red',
           columnMinWidth: '100px',                     // = 100 px
           fontFamily: 'arial',

          header: {
            headerColor: '#fff',
            headerBGColor: '#333',
            fontSize: '11pt',
            borderColor: '#000',
            sortSign: '^',
          },

          body:{
            maxHeight: '150px',
            minHeight: '200pt',
            tooltipTextColor: '#555',
            tooltipBorderColor: 'yellow',
            tooltipBgColor: 'green'
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            fontSize: '12pt',
          },

          pagination: {
            color: '#fff',
            borderColor: '#000',
            backgroundColor: '#333',
            btnsBGColor: '#000',
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
        CustomCell: function({ dataRow, currentKey,currentValue,pageData,setPageData })
    }
]
```

## Data [Array of data]

```js
[
	{
		id: 1,
		name: 'Moses',
		state: true,
	},
	{
		id: 2,
		name: 'Hoyas',
		state: false,
	},
];
```

## Table props

|       General       | Default |
| :-----------------: | :-----: |
|        data         |         |
|       columns       |         |
|      className      |         |
|   defaultPageSize   |   12    |
|      sortable       |  true   |
| copyCellDataOnClick |  false  |
|   showPagination    |  true   |
|     showToolTip     |  false  | shows tool tip for each cell |
|        style        |         |
|      isLoading      |         | shows loader when is loading = true |
|    CustomLoader     |         | custom loader component |
|    columnsResize    |  false  |
|       resize        |  true   |

## Table style

|    General     |   Default    |
| :------------: | :----------: |
|   maxHeight    |    300px     |
|   minHeight    |    100px     |
|    maxWidth    |     40vw     |
|    minWidth    |     auto     |
|     border     |  1px solid   |
|   rowBGColor   | #f7f7f7/#eee |
|   textColor    |     #000     |
| columnMinWidth |    100px     |
|   overflowX    |     auto     |
|   overflowY    |     auto     |
|   fontFamily   |  monospace   |

## Header, Body, Pagination

|    Header     | Default |        Body        | Default |   Pagination    | Default  |
| :-----------: | :-----: | :----------------: | :-----: | :-------------: | :------: |
|  headerColor  |  #fff   |     maxHeight      |  200px  |      color      |   #fff   |
| headerBGColor |  #333   |     minHeight      |  auto   | backgroundColor |   #333   |
|  borderColor  |  #000   |    cellPadding     |   4pt   |   btnsBGColor   |   #333   |
|   fontSize    |  12pt   |  tooltipTextColor  |  #000   |    btnsColor    |   #fff   |
|   sortSign    |    ↑    | tooltipBorderColor |  #000   | prevButtonText  | Previous |
|               |         |   tooltipBgColor   | #f7f7f7 | nextButtonText  |   Next   |
|               |         |  backgroundColor   |  #333   |     border      |   none   |
|               |         |    borderColor     | #eaeaeb |                 |          |
|               |         |      fontSize      |  10pt   |                 |          |
|               |         |     rowHeight      |  30px   |                 |          |

## User table custom STYLE

```js
{
    minHeight:      '120px',
    maxWidth:       '450px',
    maxHeight:      '120px',
    minWidth:       '800px',
    rowBGColor:     '#000' ,
    textColor:      '#000' ,
    columnMinWidth: '100px',
    overflowX: 'auto',
    fontFamily: 'monospace',
    header: {
        headerColor: '#fff',
        headerBGColor: '#333',
        fontSize: '11pt',
        borderColor: '#333',
        sortSign: '^'
    },
    body:{
        maxHeight: 'auto',
        tooltipTextColor: '#555',
        tooltipBorderColor: 'yellow',
        tooltipBgColor: 'green'
    },
    pagination: {
        color: '#fff',
        backgroundColor: '#333',
        borderColor: '#000',
        btnsBGColor: '#000',
        btnsColor: '#fff',
        prevButtonText: null,
        nextButtonText: 'Next >'
    },
}
```
