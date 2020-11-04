import React from 'react';
import TableMaker from './tableMaker';
import { ReactTblContext, ReactTblStyled } from './common';

const ReactTBL = (props) => {
	const styleProp = props?.style;
	const headerStyle = styleProp?.header;
	const paginationStyle = styleProp?.pagination;
	const bodyStyle = styleProp?.body;

	return (
		<ReactTblContext.Provider
			value={{
				copyCellDataOnClick: props.copyCellDataOnClick || null,
				isLoading: props.isLoading || false,
				CustomLoader: props.CustomLoader || null,
				columnsResize: props.columnsResize || false,
				defaultPageSize: props?.defaultPageSize || 12,
				table: {
					maxWidth: styleProp?.maxWidth,
					maxHeight: styleProp?.maxHeight || '450px',
					rowBGColor: styleProp?.rowBGColor || null,
					textColor: styleProp?.textColor || '#000',
					columnMinWidth: styleProp?.columnMinWidth || '100px',
					overflowX: styleProp?.overflowX || 'auto',
					overflowY: styleProp?.overflowX || 'auto',
					showToolTip: props.showToolTip || false,
					fontFamily: styleProp?.fontFamily || 'monospace',
				},
				tableHeader: {
					backgroundColor: headerStyle?.headerBGColor || '#333',
					color: headerStyle?.headerColor || '#fff',
					fontSize: headerStyle?.fontSize || '12pt',
					borderColor: headerStyle?.borderColor || '#000',
					sortable: props?.sortable ?? true,
					sortSign: headerStyle?.sortSign || '↑',
				},
				body: {
					minHeight: bodyStyle?.minHeight || 'auto',
					overflowY: bodyStyle?.overflowY || 'auto',
					overflowX: bodyStyle?.overflowX || 'visible',
					tooltipTextColor: bodyStyle?.tooltipTextColor || '#000',
					tooltipBgColor: bodyStyle?.tooltipBgColor || '#f7f7f7',
					tooltipBorderColor:
						bodyStyle?.tooltipBorderColor ||
						bodyStyle?.tooltipBgColor ||
						'#000',
					backgroundColor: bodyStyle?.backgroundColor || '#f7f7f7',
					borderColor: bodyStyle?.borderColor || '#ccc',
					cellPadding: bodyStyle?.cellPadding || '4pt',
					fontSize: bodyStyle?.fontSize || '10pt',
				},
				pagination: {
					isVisible: props?.showPagination ?? true,
					backgroundColor:
						paginationStyle?.backgroundColor ||
						headerStyle?.headerColor ||
						'#333',
					border: paginationStyle?.border || 'none',
					color: paginationStyle?.color || '#fff',
					btnsBGColor: paginationStyle?.btnsBGColor || '#333',
					btnsColor: paginationStyle?.btnsColor || '#fff',
					nextButtonText: paginationStyle?.nextButtonText || 'Next',
					prevButtonText: paginationStyle?.prevButtonText || 'Previous',
				},
			}}
		>
			<ReactTblStyled
				className={props?.className || 'react_tbl_wrapper'}
				maxWidth={styleProp?.maxWidth || '40vw'}
				minHeight={styleProp?.minHeight}
				minWidth={styleProp?.minWidth || 'auto'}
				tableMinHeight={styleProp?.minHeight || '100px'}
				pagination={paginationStyle?.isVisible}
				maxHeight={bodyStyle?.maxHeight || '300px'}
				rowHeight={bodyStyle?.rowHeight || '30px'}
				border={styleProp?.border || '1px solid'}
				margin={styleProp?.margin || '0px auto'}
				resize={props?.resize ?? false}
			>
				<TableMaker data={props?.data} columns={props?.columns || []} />
			</ReactTblStyled>
		</ReactTblContext.Provider>
	);
};

export default ReactTBL;
