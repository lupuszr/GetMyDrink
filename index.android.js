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
