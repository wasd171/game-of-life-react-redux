import React from 'react'

import classnames from 'classnames/bind'
import styles from '../styles/Cell.styl'
const cx = classnames.bind(styles);

class Cell extends React.Component {
	render () {
		const {cell} = this.props;
		const statusClass = cell.get('alive') ? 'cell-alive' : 'cell-dead';
		return (
			<div
					className={cx(statusClass)} onClick={ () => this.props.onCellClick(cell) }
					style={{width: (100/this.props.size)+'%'}}
			>
			</div>
		)
	}
}

export default Cell;