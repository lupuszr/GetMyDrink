In this tutorial I'll show you how to create a small demo app , for ordering drinks.Lets get started. For using react-native first we should install it with npm: 

```
npm i -g react-native
```

Then we can initalize a Hello World app,

```
react-native init myAppName
npm i
```

React generates the following: 
* __android/__
* __ios/__
* index.android.js
* index.ios.js
* package.json

In the __android__ folder are the neccesary files to build our mobile app , and a builder: gradle, when we are building behind the scenes gradlew is executed. We will talk about that latter , when we try to publish our app.

React native is not fully cross platform framework , which is understandable because for every platform it renders its native view. But the code base is very simmiliar and the logic behind is mostly the same.

Before we can start building our app, we need to set up a simulator for android. I'll asume that you already had installed the android sdk if not please do it ( don't forget to export its path to ANDROID_HOME ). For the simulator we will use genymotion , which has a free personal use mode.

Start genymotion ,create a new virtual device and run it.

Open a terminal , cd to your projects folder and
you can start the application with:

```
react-native run-android
```

A react packager will start and it will transform your code ( behind the scenes the gradle script is running and it is creating an apk file and an bundled js file , this is were our logic lives),
if everything goes well your app is started inside the emulator. (Do NOT turn off your react packager) You can reload your app by pressing the menu button and clicking reload, additionaly a like to check in the dev settings the Auto reload on JS change checkbox. With this your app will be rebuilded at every save. 

For managing the app state I choosed Redux. Redux is a predictable state container for JavaScript apps. It can be seen at https://github.com/rackt/redux.  You can install it by adding the following to your package.json

```
"dependencies": {
    "react-native": "^0.13.0-rc",
    "react-redux": "^3.1.0",
    "redux": "^3.0.2",
    "redux-thunk": "^1.0.0"
  }
```
Currently this react-native version is supported, but will be updated in the following weeks.

The whole idea behind Redux is the following:
* __The whole state of your app is stored in an object tree inside a single store.__
* __The only way to change the state tree is to emit an action, an object describing what happened.__
* __To specify how the actions transform the state tree, you write pure reducers.__

Now we can building our app.
First you should create a __src__ folder and inside it __actions__ , __components__, __containers__, __reducers__ and __store__ folders. Offcourse this is not the only way to organize your files , but I found it the most likeable.  

Now you should create inside a components folder a
__Drink.js__ file. Thanks to Redux we can make difference between smart and dumb components. Smart components are dirrectly connected with the store, and handling components logic, while the dumb ones recives props from the smart components and renders their view. We can make a component smart by maping the states and dispatches into its props. Only root components should be smart.

So this is how our smart component should look like:
```
import React, {
	Component,
	PropTypes,
	StyleSheet,
	Text,
	View,
	TouchableNativeFeedback,
} from 'react-native';

//these are dumb components
import Buffe from './Buffe'; 
import Orders from './Orders';

class Drink extends Component {
	
	componentDidMount(){
	}



	render() {
		// extract our props with the destructor from this.props
		var { incrementDrink, decrementDrink, addDrink, removeDrink, addDrinkToOrders, removeDrinkFromOrders, drinks} = this.props;

		return (
			<View>
				<View style={styles.buffeContainer}>		
					{drinks.buffe.map( drink =>	
						<Buffe drink={drink} addDrinkToOrders={addDrinkToOrders}></Buffe>
					)}	
				</View>
				<View style={styles.ordersContainer}>		
					{drinks.order.map( drink => 
						<Orders drink={drink} removeDrinkFromOrders={removeDrinkFromOrders}></Orders>
					)}
				</View>
				<Text>{drinks.total[0]}</Text>
			</View>
		)
		
	}
}
```      

__drinks__ is our state object, every prop lives inside it. The two main containers are __buffe__ and __order__ , both of them are arrays of maps,
for example __buffe__ looks something like this: 

```
[
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
		....
	]
```

the other props are in fact connected methods, which interface is stored inside the __actions__ folder. Create a drink.js file, for example adding drinks to order state should look like this : 

```
export const ADD_DRINK_TO_ORDERS = 'ADD_DRINK_TO_ORDERS';

export function addDrinkToOrders(buffeId, drinkType, price){
	return {
		type: ADD_DRINK_TO_ORDERS,
		buffeId,
		drinkType,
		price
	}
}
```

This action should fire up the reducer. For this lets create two files inside the __reducers__ folder,  __drink.js__ and __index.js__. The index.js is in fact our root reducer , its only job is to combine all reducers and put their state inside the global state.

```
import { combineReducers } from 'redux';
import drinks from './drink';

const rootReducer = combineReducers({
	drinks
})

export default rootReducer;
```

The __drink.js__ is where our drink actions are handled:

```
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
```

The root reduces will pack the drinks function inside the state, so it is accessible by state.drinks

The next step is to create a store. First create  a configureStore.js inside the __store__ folder, with the following content.

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore (initialState) {
	return createStoreWithMiddleware(reducer, initialState);
}
```

As you can see we are using the react-thunk middleware, basicaly a thunk is a function that wraps an expression to delay its evaluation.
So with it we are abble to create actions which are delayed or dispatched only when some condition is met.

The next step is to modify our index.android.js:

```
'use strict';

import React, { Component, AppRegistry }  from 'react-native';
import { Provider } from 'react-redux/native';
import Drink from './src/containers/Drink';
import configureStore from './src/store/configureStore';

const store = configureStore([{drinkType: 'test'}]);

class GetMyDrink extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <Drink />}
      </Provider>
    )
  }
}


AppRegistry.registerComponent('GetMyDrink', () => GetMyDrink);

```

This file is where everything gets connected, here we pass our store to the react components by using the __Provider__ which makes the Redux store available to the connect() calls in the component hierarchy below.

As you can see we are not using Drink from src/components but from src/container as I said before Drink is a smart component which can directly access to the state and the actions, to make this possible we need to pass them to the props. 

Lets create a Drink.js inside containers folder with the following content

``` 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import Drink from '../components/Drink';
import * as DrinkActions from '../actions/drink'

function mapStateToProps (state) {
	return {
		drinks: state.drinks,
	};
}

function mapDispatchToProps (dispatch) {
	return bindActionCreators(DrinkActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Drink);
```

The bindActionCreator turns an object whose values are action creators, into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly.

Lastly the __connect__ method connects the redux store to the react component

Now we have a working redux app.