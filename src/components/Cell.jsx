import React from 'react'
import Immutable from 'immutable'

import classnames from 'classnames/bind'
import styles from '../styles/Cell.styl'
const cx = classnames.bind(styles);



class Cell extends React.Component {
	shouldComponentUpdate (nextProps) {
		const {alive, size} = this.props;
		return ( alive !== nextProps.alive ) || ( size !== nextProps.size )
	//	const {cell, size} = this.props;
	//	return ( (cell !== nextProps.cell) || (size !== nextProps.size) )
	//	//return ( ( cell.get('alive') !== nextProps.cell.get('alive') ) || (size !== nextProps.size) )
	}

	render () {
		const {alive, size} = this.props;
		const statusClass = alive ? 'cell-alive' : 'cell-dead';
		return (
			<div
					className={cx(statusClass)} onClick={ () => this.props.onCellClick() }
					style={{width: (100/size)+'%'}}
			>
			</div>
		)
	}
}

export default Cell;