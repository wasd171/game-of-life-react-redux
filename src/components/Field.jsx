import React from 'react'
import Immutable from 'immutable'
import { shallowEqualImmutable } from 'react-immutable-render-mixin'

import classnames from 'classnames/bind'
import styles from '../styles/Field.styl'
const cx = classnames.bind(styles);

import Cell from './Cell.jsx'



class Field extends React.Component {

	render () {
		const {actions, cells, size} = this.props;

		const reactCells = cells.map( (cell) => {
			return (
				<Cell
					key={cell.get('x') + "_" + cell.get('y')} cell={cell} size={size}
					onCellClick = { (cell) => { actions.toggleCell(cell) } }
				/>
			)
		});

		return (
			<div className={cx('cells-container')}>
				{ reactCells }
			</div>
		)
	}
}

export default Field;