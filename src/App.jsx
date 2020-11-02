import React from 'react';
import { getColumnsData } from './components/fakeData/getColumns';
import { getData } from './components/fakeData/getData';
import ReactTBL from './components/tableMaker/index';
import './App.css';
// import {Loader} from './components/tableMaker/Loader';

const App = () => {
	const [currentData, setCurrentData] = React.useState([]); // current data based currentShow string
	const [columns, setColumns] = React.useState(getColumnsData());
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		setTimeout(() => {
			setCurrentData(getData());
			setIsLoading(false);
		}, 2200);
	}, []);

	return (
		<>
			<ReactTBL
				data={currentData}
				columns={columns || []}
				defaultPageSize={7}
				sortable={true}
				copyCellDataOnClick={true}
				isLoading={isLoading}
				columnsResize={true}
				//CustomLoader = {() => <Loader color='green'/>}
				style={{
					//maxWidth: '750px',
					// minHeight: '400pt',
					// maxHeight: '150px',
					// minWidth: '600px',
					// rowBGColor: 'yellow',
					// textColor: 'red',
					// columnMinWidth: '120px',
					// fontFamily: 'arial',
					// overflowX: 'hidden',
					header: {
						//headerColor: '#fff',
						headerBGColor: '#620e62',
						//fontSize: '11pt',
						//borderColor: '#ccc',
						// sortSign: '^',
					},
					body: {
						//fontSize: '20pt',
						// maxHeight: '100px',
						// minHeight: '200pt',
						// tooltipTextColor: '#555',
						// tooltipBorderColor: 'yellow',
						// tooltipBgColor: 'green',
						// backgroundColor: 'yellow',
						// borderColor: 'yellow',
						// cellPadding: '2pt'
					},
					pagination: {
						backgroundColor: '#620e62',
						//btnsBGColor: '#ccc',
						//color: 'yellow',
						//btnsColor: '#000',
						//border: '4px solid yellow',
						//prevButtonText: null,
						//nextButtonText: 'Next >'
					},
				}}
			/>
		</>
	);
};

export default App;
