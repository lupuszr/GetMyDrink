import {Map} from 'immutable';

function setState(state, newState) {
	return state.merge(newState);
}