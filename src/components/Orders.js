import React, {
	Component,
	PropTypes,
	StyleSheet,
	Text,
	View,
	TouchableNativeFeedback,
	TouchableHighlight,
} from 'react-native';

class Orders extends Component {
	constructor(props) {
    	super(props);
  	}

	render() {
		var {drink, removeDrinkFromOrders} = this.props;
		return (
				<TouchableNativeFeedback onPress={ () => removeDrinkFromOrders(drink.id, drink.price)} > 
					<View style={styles.container}>
						<Text style={styles.drinkType}>
							{drink.drinkType}
						</Text>
						<Text style={styles.textContainer}>
							Num: 
							<Text style={styles.price}>
								{drink.counter}
							</Text>
						</Text>
					</View> 
				</TouchableNativeFeedback>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		marginLeft:10,
		marginTop:5,
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: 'blue',
		height: 90,
		width: 150
	},
	drinkType: {
		color: "white",
		fontSize: 30,
		fontWeight: "900",
		borderBottomWidth: 1,
		borderBottomColor: "red",
		borderStyle: "solid"

	},
	price: {
		color: "white"
	},
	textContainer: {
		fontWeight: "900",
		marginTop: 27,
		marginLeft: 80,
		fontSize: 16
	}
});

export default Orders;