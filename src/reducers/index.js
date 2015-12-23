import Immutable from 'immutable'
import { combineReducers } from 'redux-immutablejs'
import reduceReducers from 'reduce-reducers'
import * as reducers from './game'
import types from '../constants/GameConstants'

export default reduceReducers(
	combineReducers( reducers ),
	(state, action) => {
		switch (action.type) {
			case types.CELLS_RECALCULATE:
				const cells = state.get('cells');
				const gameRunning = state.get('gameRunning');
				const size = state.get('size');

				if (gameRunning) {
					let newCells = cells;

					function isNeighbour(currentCell, cell) {
						const x = currentCell.get('x');
						const y = currentCell.get('y');
						const nowX = cell.get('x');
						const nowY = cell.get('y');
						const dX = Math.abs(nowX - x);
						const dY = Math.abs(nowY - y);
						const bordX = ( x == 0 && nowX == size - 1 ) || ( x == size - 1 && nowX == 0 );
						const bordY = ( y == 0 && nowY == size - 1 ) || ( y == size - 1 && nowY == 0 );
						return (
							( (dX <= 1) || bordX ) &&
							( (dY <= 1) || bordY ) &&
							( ( dX !== 0 ) || ( dY !== 0 ) )
						)
					}

					let cellsMightChange = Immutable.OrderedMap();

					cells
						.filter( (cell) => cell.get('alive') )
						.forEach(
							(aliveCell) => {
								cells
									.filter( (cell) => ( isNeighbour(aliveCell, cell) || (cell === aliveCell) ) )
									.forEach( (cell) => {
										cellsMightChange = cellsMightChange.set( cell.get('index'), cell )
									} );
							}
						);

					cellsMightChange.forEach(
						(currentCell) => {
							const nearSize = cells
								.filter( (cell) => isNeighbour(currentCell, cell) )
								.filter( (cell) => cell.get('alive') )
								.size;

							const newCell = currentCell.set(
								'alive',
								currentCell.get('alive')
									?
									(nearSize === 3 || nearSize === 2 )
									:
									(nearSize === 3)
							);

							newCells = newCells.set( currentCell.get('index'), newCell );
						}
					);

					return state.set('cells', newCells);
				}
				else {
					return state;
				}

			default:
				return state;
		}
	}
);