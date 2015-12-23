import React from 'react'
import Immutable from 'immutable'

import classnames from 'classnames/bind'
import styles from '../styles/Field.styl'
const cx = classnames.bind(styles);


import Cell from './Cell.jsx'

class Field extends React.Component {
	render () {
		const {actions, cells, size} = this.props;
		let reactCells = [];

		cells.forEach(
			(cell) => {
				reactCells.push(
						<Cell
							key={cell.get('x') + "_" + cell.get('y')} cell={cell} size={size}
							onCellClick = { (cell) => actions.toggleCell(cell) }
						/>
				);
			}
		);

		return (
			<div>
				<div className={cx('cells-container')}>
					{ Immutable.List(reactCells) }
				</div>
			</div>
		)
	}
}

export default Field;