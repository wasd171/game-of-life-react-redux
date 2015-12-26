import Immutable, {Map, OrderedMap} from 'immutable'
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

					function getNeighbours( currentCell, cellsList, includeCurrent ) {
						const currX = currentCell.get('x');
						const currY = currentCell.get('y');

						function normalizeCoord (coord) {
							if ( coord === size ) { return 0 }
							else if ( coord === -1 ) { return size - 1 }
							else { return coord }
						}

						return Map().withMutations( (res) => {
							for (let dx = -1; dx <= 1; dx++) {
								for (let dy = -1; dy <= 1; dy++) {
									if ( !( !includeCurrent && (dx === 0) && (dy === 0) ) ) {
										const newX = normalizeCoord(currX + dx);
										const newY = normalizeCoord(currY + dy);
										const key  = Map({x: newX, y: newY});
										const value = cellsList.get(key, Map());
										if ( value.size !== 0 ) {
											res.set(key, value);
										}
									}
								}
							}
						});
					}

					const aliveCells = cells.filter( (cell) => cell.get('alive') );

					const updatedCells = Map()
						.withMutations( (res) => {
							aliveCells.forEach( (aliveCell) => {
								res.merge( getNeighbours(aliveCell, cells, true) )
							});
						})
						.toKeyedSeq()
						.map( (currentCell) => {
							const nearSize = getNeighbours(currentCell, aliveCells, false).size;

							return currentCell.set(
								'alive',
								currentCell.get('alive') ? (nearSize === 3 || nearSize === 2 ) : (nearSize === 3)
							);

						});

					return state.set('cells', cells.merge(updatedCells) );

					//return state.withMutations( (res) => {
					//	updatedCells.forEach( (cell) => {
					//		const x = cell.get('x');
					//		const y = cell.get('y');
					//		res.setIn(['cells', Map({x, y})], cell);
					//	})
					//});

					//const cellsMightChange = Map().withMutations( (res) => {
					//	aliveCells.forEach( (aliveCell) => {
					//		res.merge( getNeighbours(aliveCell, cells, true) )
					//	});
					//});
					//
					//const updatedCells = cellsMightChange.map( (currentCell) => {
					//	const nearSize = getNeighbours(currentCell, aliveCells, false).size;
					//
					//	return currentCell.set(
					//		'alive',
					//		currentCell.get('alive') ? (nearSize === 3 || nearSize === 2 ) : (nearSize === 3)
					//	);
					//
					//});
					//
					//return state.withMutations( (res) => {
					//	updatedCells.forEach( (cell) => {
					//		const x = cell.get('x');
					//		const y = cell.get('y');
					//		res.setIn(['cells', Map({x, y})], cell);
					//	})
					//});
					//return state.set('cells', cells.merge(updatedCells) );
				}
				else {
					return state;
				}

			default:
				return state;
		}
	}
);