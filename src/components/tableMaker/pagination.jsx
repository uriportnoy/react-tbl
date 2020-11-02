import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ReactTblContext, PaginationStyle } from './common';

export const Pagination = ({ page, setPage, totalDataLength }) => {
	const [totalPages, setTotalPages] = useState(0);
	const [nextDisabled, setNextDisabled] = useState(false);
	const [prevDisabled, setPrevDisabled] = useState(true);
	const {
		pagination,
		defaultPageSize,
		table: { fontFamily },
	} = useContext(ReactTblContext);

	useEffect(() => {
		// handle pages
		const maxPage = Math.ceil(totalDataLength / defaultPageSize);
		if (Number.isInteger(maxPage)) {
			setTotalPages(maxPage);
			setNextDisabled(page + 1 >= maxPage);
			setPrevDisabled(page === 0);
		}
	}, [page, totalDataLength]);

	return (
		<PaginationStyle
			page={page}
			totalPages={totalPages}
			nextDisabled={nextDisabled}
			prevDisabled={prevDisabled}
			fontFamily={fontFamily}
			color={pagination?.color}
			btnsColor={pagination?.btnsColor}
			btnsBGColor={pagination?.btnsBGColor}
			border={pagination?.border}
			backgroundColor={pagination?.backgroundColor}
		>
			<span
				className='btn prev'
				onClick={() => (prevDisabled ? null : setPage(page - 1))}
			>
				{pagination?.prevButtonText}
			</span>
			<span className='label'>{`${
				page + (totalPages !== 0 ? 1 : 0)
			}/${totalPages}`}</span>
			<span
				className='btn next'
				onClick={() => (nextDisabled ? null : setPage(page + 1))}
			>
				{pagination?.nextButtonText}
			</span>
		</PaginationStyle>
	);
};

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
	totalDataLength: PropTypes.number.isRequired,
};
