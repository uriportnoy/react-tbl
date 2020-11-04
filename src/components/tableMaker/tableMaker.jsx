import React, { useEffect, useState, useContext } from 'react';
import { array } from 'prop-types';
import TableHead from './tableHead';
import TableBody from './tableBody';
import { ReactTblContext, TblWrapper, Loading, EmptyData } from './common';
import { Pagination } from './pagination';

const TableMaker = ({ columns, data }) => {
	const [currentDataPage, setCurrentDataPage] = useState([]);
	const [page, setPage] = useState(0);

	const {
		pagination: { isVisible },
		tableHeader: { backgroundColor },
		table,
		isLoading,
		defaultPageSize,
		body: { overflowY, minHeight, overflowX: bodyOverFlowX },
	} = useContext(ReactTblContext);

	useEffect(() => {
		handlePages();
	}, [page, data.length, defaultPageSize]);

	const handlePages = () => {
		if (data && Array.isArray(data) && data.length > 0) {
			if (page === 0) {
				const pageData = data?.slice(0, defaultPageSize);
				setCurrentDataPage(pageData);
			} else {
				const startChunk = page * defaultPageSize;
				const endChunk = startChunk + defaultPageSize;
				const pageData = data?.slice(startChunk, endChunk);

				for (let i = pageData.length; i < defaultPageSize; i++) {
					pageData.push({ empty: true });
				}
				setCurrentDataPage(pageData);
			}
		} else {
			setCurrentDataPage([]);
		}
	};

	const sortDataArray = (columnType, high = true) => {
		const sortedData = [...currentDataPage].sort((a, b) => {
			if (a[columnType] < b[columnType]) {
				return high ? -1 : 1;
			}
			if (a[columnType] > b[columnType]) {
				return high ? 1 : -1;
			}
			return 0;
		});
		setCurrentDataPage(sortedData);
	};

	return (
		<>
			<TblWrapper
				className='scroller'
				tableMaxHeight={table?.maxHeight}
				backgroundColor={backgroundColor}
				minHeight={minHeight}
				overflowY={overflowY}
				fontFamily={table?.fontFamily}
				maxWidth={table?.maxWidth}
				overflowX={table?.overflowX}
				bodyOverFlowX={bodyOverFlowX}
			>
				<table>
					<TableHead columns={columns} sortArray={sortDataArray} />
					{isLoading ? (
						<Loading minHeight={minHeight} />
					) : (currentDataPage?.length !== 0 && columns?.length) !== 0 ? (
						<TableBody
							currentDataPage={currentDataPage}
							columns={columns}
							setCurrentDataPage={setCurrentDataPage}
						/>
					) : (
						<EmptyData minHeight={minHeight} />
					)}
				</table>
			</TblWrapper>
			{isVisible && (
				<Pagination
					setPage={setPage}
					page={page}
					totalDataLength={data.length}
				/>
			)}
		</>
	);
};
TableMaker.propTypes = {
	columns: array.isRequired,
	data: array.isRequired,
};

export default TableMaker;
