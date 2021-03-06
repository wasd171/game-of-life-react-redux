import types from '../constants/GameConstants'
import Immutable, {OrderedMap, Map} from 'immutable'



const initialIntervals = Immutable.fromJS([
	{interval: 100, text: '100'},
	{interval: 250, text: '250'},
	{interval: 500, text: '500'},
	{interval: 1000, text: '1000'}
]);

export function intervals(state = initialIntervals, action) {
	switch (action.type) {
		default:
			return state
	}
}



const initialInterval = initialIntervals.get(1).get('interval');

export function interval(state = initialInterval, action) {
	switch (action.type) {
		case types.GAME_SET_INTERVAL:
			return action.interval;
		default:
			return state
	}
}


const initialSizes = Immutable.fromJS([
	{size: 15, text: '15x15'},
	{size: 30, text: '30x30'},
	{size: 60, text: '60x60'}
]);

export function sizes(state = initialSizes, action) {
	switch (action.type) {
		default:
			return state
	}
}



const initialSize = initialSizes.get(0).get('size');

export function size(state = initialSize, action) {
	switch (action.type) {
		case types.GAME_SET_SIZE:
			return action.size;
		default:
			return state
	}
}



function generateCells(size) {
	let cells = OrderedMap();

	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			const cell = (
				{
					x:     x,
					y:     y,
					alive: false
				}
			);
			cells = cells.set( Map({x, y}), Map(cell) );
		}
	}

	return cells;
}

const initialCells = generateCells( initialSize );

export function cells(state = initialCells, action) {
	switch (action.type) {
		case types.CELL_TOGGLE:
			const x = action.cell.get('x');
			const y = action.cell.get('y');
			const cell = state.get( Map({x, y}) );
			return state.setIn( [ Map({x, y}), 'alive' ], !cell.get('alive') );

		case types.GAME_SET_SIZE:
			return generateCells(action.size);

		case types.GAME_RESET:
			return state.map( (cell) => cell.set('alive', false) );

		default:
			return state;
	}
}


export function gameRunning(state = false, action) {
	switch (action.type) {
		case types.GAME_START:
			return true;

		case types.GAME_STOP:
			return false;

		default:
			return state
	}
}

export function timer(state = null, action) {
	switch (action.type) {
		case types.TIMER_START:
			return action.timer;

		case types.TIMER_STOP:
			return null;

		default:
			return state
	}
}
