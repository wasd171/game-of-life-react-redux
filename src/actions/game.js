import types from '../constants/GameConstants'

export function toggleCell(cell) {
	return { type: types.CELL_TOGGLE, cell }
}

export function setSize(size) {
	return { type: types.GAME_SET_SIZE, size }
}

export function setTiming(interval) {
	return {type: types.GAME_SET_INTERVAL, interval}
}

export function startGame() {
	return { type: types.GAME_START }
}

export function stopGame() {
	return { type: types.GAME_STOP }
}

export function resetGame() {
	return { type: types.GAME_RESET }
}

export function recalculateCells() {
	return { type: types.CELLS_RECALCULATE }
}

export function startTimer(interval) {
	return (dispatch, getState) => {
		const timer = getState().get('timer');
		if (timer === null) {
			const newTimer = setInterval(
				() => { dispatch( recalculateCells() ) },
				interval
			);
			dispatch( {type: types.TIMER_START, timer: newTimer} );
		}
	}
}

export function stopTimer() {
	return (dispatch, getState) => {
		const timer = getState().get('timer');
		if (timer !== null) {
			clearInterval(timer);
			dispatch({type: types.TIMER_STOP});
		}
	}
}