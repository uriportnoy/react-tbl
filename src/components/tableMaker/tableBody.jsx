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

	return (
		<tbody>
			{currentDataPage.map((dataRow, rowIdx) => (
				<TR key={`tr_${rowIdx}`} idx={rowIdx} rowBGColor={rowBGColor}>
					{columns.map((col, idx) => {
						const columnKey = col.colKey;
						const _key = `td_${columnKey}_${rowIdx}`;
						const currentValue = dataRow[columnKey];
						const CustomCell = col.CustomCell || null;
						const copyDataActive =
							col.copyCellDataOnClick ?? copyCellDataOnClick;
						const refKey = `td_${idx}_${rowIdx}_ref`;
						const onClick = () => {
							if (CustomCell || !copyDataActive) return;
							copyToClipboard(currentValue?.toString(), refs[refKey].current);
						};

						refs[refKey] = React.createRef();
						return (
							<TD
								key={_key}
								id={`td_${idx}_${rowIdx}`}
								ref={refs[refKey]}
								dataTip={currentValue?.toString()}
								size={col.size || 1}
								className={columnKey}
								textColor={textColor}
								columnMinWidth={columnMinWidth}
								onClick={onClick}
								copyCellDataOnClick={copyDataActive}
								backgroundColor={backgroundColor}
								borderColor={borderColor}
								cellPadding={cellPadding}
								fontSize={fontSize}
							>
								<>
									<div className='cellWrapper' id='cellWrapper'>
										{CustomCell ? (
											<CustomCell
												dataRow={dataRow}
												currentKey={col.colKey}
												currentValue={currentValue}
												pageData={currentDataPage}
												setPageData={setCurrentDataPage}
											/>
										) : (
											currentValue
										)}
									</div>
									{(showToolTip || col.showToolTip) &&
										currentValue?.length > 0 && (
											<ToolTip
												bgColor={tooltipBgColor}
												textColor={tooltipTextColor || textColor}
												borderColor={tooltipBorderColor || tooltipBgColor}
												className='tooltiptext'
											>
												{currentValue}
											</ToolTip>
										)}
								</>
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
