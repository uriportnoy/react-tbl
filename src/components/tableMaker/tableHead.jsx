import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ReactTblContext, TH, EmptyColumnsTR, Thead } from './common';
import Resizer from './resizer';

const TableHead = ({ columns, sortArray }) => {
	const { tableHeader, table, columnsResize } = useContext(ReactTblContext);
	const [sortDirections, setSortDirections] = useState(null);

	useEffect(() => {
		if (tableHeader.sortable) {
			const directions = {};
			columns.forEach((element) => {
				if (element.sortable !== false) directions[element.colKey] = true;
			});
			setSortDirections(directions);
		}
	}, []);

	const onThClick = (column) => {
		if (!tableHeader.sortable || column.sortable === false) return;
		sortArray(column.colKey, !sortDirections[column.colKey]);
		setSortDirections({
			...sortDirections,
			[column.colKey]: !sortDirections[column.colKey],
		});
	};

	return (
		<Thead
			backgroundColor={tableHeader?.backgroundColor}
			color={tableHeader?.color}
		>
			{columns?.length == 0 ? (
				<EmptyColumnsTR> Cannot Read Columns </EmptyColumnsTR>
			) : (
				<tr>
					{columns.map((column, index) => {
						const _key = `th_${column.colKey}_${index}`;
						return (
							<TH
								key={_key}
								id={`th_${index}`}
								size={column.size || 1}
								fontSize={tableHeader?.fontSize}
								columnMinWidth={table?.columnMinWidth}
								sortDirection={sortDirections?.[column.colKey]}
								sortSign={tableHeader.sortSign}
								borderColor={tableHeader?.borderColor}
								onClick={() => onThClick(column)}
							>
								{column.header || column.colKey}
								{columnsResize && index + 1 !== columns.length && (
									<Resizer id={index} color={tableHeader?.borderColor} />
								)}
							</TH>
						);
					})}
				</tr>
			)}
		</Thead>
	);
};
Thead.propTypes = {
	backgroundColor: PropTypes.string,
	sortArray: PropTypes.func,
	color: PropTypes.string,
};

export default React.memo(TableHead);
