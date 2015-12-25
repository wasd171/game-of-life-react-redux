import React from 'react'
import classnames from 'classnames/bind'
import styles from '../styles/Controls.styl'
const cx = classnames.bind(styles);

import {RaisedButton, IconButton, Styles, CardActions, SelectField} from 'material-ui'
import {MdPauseCircleOutline, MdPlayCircleOutline, MdReplay} from 'react-icons/lib/md'



class Controls extends React.Component {
	shouldComponentUpdate (nextProps) {
		return true;
		//return !shallowEqualImmutable(this.props, nextProps);
	}

	render () {

		const {actions, gameRunning, size, sizes, intervals, interval} = this.props;
		const intervalsJS = intervals;
		const sizesJS = sizes;

		return (
			<CardActions>
				<div className="flex-row">
					<SelectField
							floatingLabelText="Refresh rate, ms"
							valueMember="interval"
							value = {interval}
							menuItems={ intervalsJS }
							style={{marginRight: '1em'}}
							onChange={ (event) => actions.setTiming(event.target.value) }
							disabled={gameRunning}
					/>
					<SelectField
							floatingLabelText="Field size"
							valueMember="size"
							value = { size }
							menuItems={ sizesJS }
							onChange={ (event) => actions.setSize(event.target.value) }
							disabled={gameRunning}
					/>
				</div>

				<div className={cx('flex-row')}>
					<RaisedButton
						label="Play" labelPosition="after" onTouchTap={ () => { this.play(interval) } }
						disabled={gameRunning} primary={true} style={{marginRight: '.5em'}}
					>
						<MdPlayCircleOutline className={cx('icon-margin-left')}/>
					</RaisedButton>

					<RaisedButton
						label="Pause" labelPosition="after" onTouchTap={ () => this.pause() }
						disabled={!gameRunning} secondary={true} style={{marginRight: '.5em'}}
					>
						<MdPauseCircleOutline className={cx('icon-margin-left')}/>
					</RaisedButton>

					<RaisedButton
						label="Reset" labelPosition="after" onTouchTap={ () => actions.resetGame() }
						disabled={gameRunning}
					>
						<MdReplay className={cx('icon-margin-left')}/>
					</RaisedButton>
				</div>
			</CardActions>
		)
	}

	play (interval) {
		const {actions} = this.props;
		actions.startTimer(interval);
		actions.startGame();
	}

	pause () {
		const {actions} = this.props;
		actions.stopTimer();
		actions.stopGame();
	}
}

export default Controls;