import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as gameActions from '../actions/game'
import {pick, omit} from 'lodash'
import { shallowEqualImmutable } from 'react-immutable-render-mixin'

import classnames from 'classnames/bind'
import styles from '../styles/App.styl'
const cx = classnames.bind(styles);

import {AppBar, Card, CardText, CardActions, FlatButton} from 'material-ui'
import Field from './Field.jsx'
import Controls from './Controls.jsx'



class App extends React.Component {

	shouldComponentUpdate (nextProps) {
		return true;
		//return !shallowEqualImmutable(this.props, nextProps);
	}

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
		intervals: state.get('intervals').toJS(),
		interval: state.get('interval'),
		cells: state.get('cells').toArray(),
		size: state.get('size'),
		sizes: state.get('sizes').toJS(),
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