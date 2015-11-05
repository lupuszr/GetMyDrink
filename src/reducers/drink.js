import { Map } from 'immutable';
import { INCREMENT_DRINK, DECREMENT_DRINK, ADD_DRINK, REMOVE_DRINK, ADD_DRINK_TO_ORDERS, REMOVE_DRINK_FROM_ORDERS, FETCH_BUFFE  } from '../actions/drink';

const initialState = { 
	buffe: [
		{
			id: 0,
			drinkType: "Beer",
			price: 10
		},
		{
			id:1, 
			drinkType: "Wine",
			price: 9
		},
		{
			id:2, 
			drinkType: "Tequilla",
			price: 9
		},
		{
			id:3, 
			drinkType: "Sprite",
			price: 9
		},
		{
			id:4, 
			drinkType: "Cola",
			price: 9
		},
		{
			id:5, 
			drinkType: "Fanta",
			price: 9
		},
		{
			id:6, 
			drinkType: "Vodka",
			price: 9
		}
	],
	order: [
		// {
		// 	id: 0,
		// 	drinkType: "Not Set" ,
		// 	counter: 0,
		// 	tableId: -1
		//  price
		//  totalPrice: 100
		// }
	],
	total: [0]
}

function incrementDrink (state,id, price) {
	return {
		buffe: 
		state.buffe, 
		order: state.order.map(
				drink => drink.id === id ? 
				Object.assign({}, drink, {counter: drink.counter +1} )  :
				drink 
		),
		total: [state.total[0] + price, ...state.total]
	};
}

function decrementDrink (state,id, price) {
	return {
		buffe: state.buffe,
		order: state.order.map(drink => drink.id === id ? 
			Object.assign({}, drink, {counter: drink.counter -1} ) :
			drink ),
		total: [state.total[0] - price, ...state.total] 
		};
}

function addDrink (state, drinkType) {
	return { buffe: [{
      id: state.buffe.reduce((maxId, elem) => Math.max(elem.id, maxId), -1) + 1,
      drinkType: drinkType 
    }, ...state.buffe], order: state.order};
}

function removeDrink (state, id) {
	return { buffe: state.buffe.filter( drink => drink.id !== id ), order: state.order }
}

function addDrinkToOrders (state, buffeId, drinkType,price) {
	buffeElem = state.buffe.find(id => id === buffeId)
	return !!(elem = state.order.find( bId => bId.buffeId === buffeId )) ? 
	incrementDrink(state,elem.id, price):
	{order: [{
      id: state.order.reduce((maxId, elem) => Math.max(elem.id, maxId), -1) + 1,
      drinkType: drinkType,
      buffeId: buffeId,
      counter: 1,
      price: price,
    }, ...state.order], buffe: state.buffe,
    total: [state.total[0] + price, ...state.total] 
     };
}

function removeDrinkFromOrders (state, id, price) {
	var elem = state.order.find( bId => bId.id === id )
	return (elem.counter > 1) ? 
	decrementDrink(state,elem.id, price):
	{ 
		order: state.order.filter( drink => drink.id !== id ), 
		buffe: state.buffe,
		total: [state.total[0] - price, ...state.total]   		
	}
}

function fetchBuffe(state){
	REQUEST_URL = "test"
	fetch(REQUEST_URL)
		.then((response) => response.json()) 
		.then((responseData) => { return 
			{
			// buffe: responseData,
			// order: state.order,
			// total: state.total
			} 
		}) 
		.done();
}

export default function drinks (state = initialState, action) {
	switch (action.type) {
		case INCREMENT_DRINK:
			return incrementDrink(state,action.id, action.price);
		case DECREMENT_DRINK:
			return decrementDrink(state, action.id, action.price);
		case ADD_DRINK:
			return addDrink(state,action.drinkType);
		case REMOVE_DRINK:
			return removeDrink(state, action.drinkType);
		case ADD_DRINK_TO_ORDERS:
			return addDrinkToOrders(state, action.buffeId, action.drinkType, action.price);
		case REMOVE_DRINK_FROM_ORDERS:
			return removeDrinkFromOrders(state, action.id, action.price);
		case FETCH_BUFFE:
			return fetchBuffe(state);
		default:
			return state;			
	}
};