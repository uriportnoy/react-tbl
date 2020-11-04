import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ReactTblContext, ResizerComponent } from './common';

const Resizer = ({ id, color }) => {
	const { table } = useContext(ReactTblContext);
	const columnMinWidth = parseInt(table?.columnMinWidth, 10) || 100;
	let currTh;
	let nextTh;
	let currTds = [];
	let nextTds = [];

	let currWidth;
	let nextWidth;
	let pageX;

	const thRef = React.useRef();

	useEffect(() => {
		thRef.current.addEventListener('mousedown', onMouseDown);
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);

		return () => {
			thRef.current.removeEventListener('mousedown', onMouseDown);
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};
	}, []);

	const onMouseDown = (e) => {
		currTds = document.querySelectorAll(`[id^=td_${id}]`);
		nextTds = document.querySelectorAll(`[id^=td_${id + 1}]`);
		currTh = e.target.parentElement;
		nextTh = currTh.nextElementSibling;
		pageX = e.pageX;

		if (currTh) currWidth = currTh.offsetWidth;
		if (nextTh) nextWidth = nextTh.offsetWidth;
	};
	const onMouseUp = () => {
		currTh = undefined;
		currTds = [];
		nextTh = undefined;
		nextTds = [];
		pageX = undefined;
		currWidth = undefined;
		nextWidth = undefined;
	};

	const onMouseMove = (e) => {
		if (currTh) {
			const diffX = e.pageX - pageX;
			const getCurrRunningWidth = currTh.offsetWidth;
			const getNextRunningWidth = nextTh.offsetWidth;

			if (
				getNextRunningWidth >= columnMinWidth &&
				getCurrRunningWidth >= columnMinWidth &&
				nextTh &&
				nextTds?.length > 0 &&
				currTh &&
				currTds?.length > 0
			) {
				[...currTds, currTh].forEach((elem) => {
					const width = currWidth + diffX + 'px';
					elem.style.flexBasis = width;
				});
				[...nextTds, nextTh].forEach((elem) => {
					const width = nextWidth - diffX + 'px';
					elem.style.flexBasis = width;
				});
			}
		}
	};

	return (
		<ResizerComponent
			ref={thRef}
			onClick={(e) => e.stopPropagation()}
			color={color}
		/>
	);
};

Resizer.propTypes = {
	backgroundColor: PropTypes.string,
	sortArray: PropTypes.func,
	color: PropTypes.string,
};

export default Resizer;
