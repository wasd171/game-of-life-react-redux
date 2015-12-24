import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as gameActions from '../actions/game'
import {pick, omit} from 'lodash'

import classnames from 'classnames/bind'
import styles from '../styles/App.styl'
const cx = classnames.bind(styles);

import {AppBar, Card, CardText, CardActions, FlatButton} from 'material-ui'
import Field from './Field.jsx'
import Controls from './Controls.jsx'



class App extends React.Component {

	render () {
		return (
			<div>
				<AppBar title="Game of Life" showMenuIconButton={false} style={{ marginBottom: '1em' }}/>

				<div className={cx('game-container')}>

					<Card>
						<Field { ...pick(this.props, ['actions', 'cells', 'size']) } />
						<Controls {...omit(this.props, 'cells')} />
					</Card>

				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		intervals: state.get('intervals'),
		interval: state.get('interval'),
		cells: state.get('cells'),
		size: state.get('size'),
		sizes: state.get('sizes'),
		gameRunning: state.get('gameRunning'),
		timer: state.get('timer')
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(gameActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)