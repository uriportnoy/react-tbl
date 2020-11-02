import React, { useContext } from 'react';
import { ReactTblContext } from './common';
import { array, number } from 'prop-types';
import { TR, TD, ToolTip } from './tr_td';

const TableBody = ({ currentDataPage, columns, setCurrentDataPage }) => {
	const {
		table: { rowBGColor, textColor, columnMinWidth, showToolTip, fontFamily },
		body: {
			tooltipTextColor,
			tooltipBgColor,
			tooltipBorderColor,
			backgroundColor,
			borderColor,
			cellPadding,
			fontSize,
		},
		copyCellDataOnClick,
	} = useContext(ReactTblContext);
	const refs = {};

	const copyToClipboard = (info, tdId) => {
		tdId.classList.add(`copyCell`);
		const el = document.createElement('textarea');
		el.value = info;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	};
	const ejectParams = function (dataRow, col, idx, rowIdx) {
		const columnKey = col.colKey;
		const copyDataActive = col.copyCellDataOnClick ?? copyCellDataOnClick;
		const refKey = `td_${idx}_${rowIdx}_ref`;
		refs[refKey] = React.createRef();
		const res = {
			columnKey,
			_key: `td_${columnKey}_${rowIdx}`,
			currentValue: dataRow[columnKey],
			copyDataActive,
			refKey,
			relevantWidth: document.getElementById(`th_${idx}`)?.offsetWidth,
			onClick: () => {
				if (col.CustomCell || !copyDataActive) return;
				copyToClipboard(dataRow[columnKey]?.toString(), refs[refKey].current);
			},
		};
		return res;
	};
	return (
		<tbody>
			{currentDataPage.map((dataRow, rowIdx) => (
				<TR
					key={`tr_${rowIdx}`}
					id={`tr_${rowIdx}`}
					idx={rowIdx}
					rowBGColor={rowBGColor}
				>
					{columns.map((col, idx) => {
						const props = ejectParams(dataRow, col, idx, rowIdx);
						return (
							<TD
								key={props._key}
								id={`td_${idx}_${rowIdx}`}
								ref={refs[props.refKey]}
								dataTip={props.currentValue?.toString()}
								size={col.size || 1}
								className={props.columnKey}
								textColor={textColor}
								columnMinWidth={columnMinWidth}
								onClick={props.onClick}
								copyCellDataOnClick={props.copyDataActive}
								backgroundColor={backgroundColor}
								borderColor={borderColor}
								cellPadding={cellPadding}
								fontSize={fontSize}
							>
								<div className='cellWrapper' id='cellWrapper'>
									{col.CustomCell ? (
										<col.CustomCell
											dataRow={dataRow}
											currentKey={col.colKey}
											currentValue={props.currentValue}
											pageData={currentDataPage}
											setPageData={setCurrentDataPage}
										/>
									) : (
										props.currentValue
									)}
								</div>
								{(showToolTip || col.showToolTip) &&
									props.currentValue?.length > 0 && (
										<ToolTip
											bgColor={tooltipBgColor}
											textColor={tooltipTextColor || textColor}
											borderColor={tooltipBorderColor || tooltipBgColor}
											className='tooltiptext'
										>
											{props.currentValue}
										</ToolTip>
									)}
							</TD>
						);
					})}
				</TR>
			))}
		</tbody>
	);
};
TableBody.propTypes = {
	currentDataPage: array,
	columns: array,
};

export default TableBody;
