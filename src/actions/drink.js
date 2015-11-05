export const ADD_DRINK = 'ADD_DRINK';
export const REMOVE_DRINK = 'REMOVE_DRINK';
export const INCREMENT_DRINK = 'INCREMENT_DRINK';
export const DECREMENT_DRINK = 'DECREMENT_DRINK';
export const ADD_DRINK_TO_ORDERS = 'ADD_DRINK_TO_ORDERS';
export const REMOVE_DRINK_FROM_ORDERS = 'REMOVE_DRINK_FROM_ORDERS';


export function addDrink(drinkType) {
	return {
		type: ADD_DRINK,
		drinkType
	};
};


export function removeDrink(id) {
	return {
		type: REMOVE_DRINK,
		id
	};
};

export function addDrinkToOrders(buffeId, drinkType, price){
	return {
		type: ADD_DRINK_TO_ORDERS,
		buffeId,
		drinkType,
		price
	}
}

export function removeDrinkFromOrders(id,price){
	return {
		type: REMOVE_DRINK_FROM_ORDERS,
		id,
		price
	};
}

export function incrementDrink(id, price){
	return {
		type: INCREMENT_DRINK,
		id,
		price
	};
}

export function decrementDrink(id, price){
	return {
		type: DECREMENT_DRINK,
		id,
		price
	}
}

export function fetchBuffe () {
	return {
		type: FETCH_BUFFE
	}
}