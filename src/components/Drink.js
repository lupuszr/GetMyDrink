import React, {
	Component,
	PropTypes,
	StyleSheet,
	Text,
	View,
	TouchableNativeFeedback,
} from 'react-native';

import Buffe from './Buffe';
import Orders from './Orders';

class Drink extends Component {
	
	componentDidMount(){
	}



	render() {
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

//validators
Drink.propTypes = {
	incrementDrink: PropTypes.func.isRequired,
	decrementDrink: PropTypes.func.isRequired,
	addDrink: PropTypes.func.isRequired,
	removeDrink: PropTypes.func.isRequired
}

const styles = StyleSheet.create({	
	buffeContainer: { 
		flexDirection: 'row', 
		alignItems: 'center',
		justifyContent: 'flex-start', 
		marginBottom: 300,
		flexWrap: "wrap"
	},
	ordersContainer: { 
		flexDirection: 'row', 
		alignItems: 'center',
		justifyContent: 'flex-start',
		flexWrap: "wrap" 
	}
});

export default Drink;