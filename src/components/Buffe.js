import React, {
	Component,
	PropTypes,
	StyleSheet,
	Text,
	View,
	TouchableNativeFeedback,
	TouchableHighlight,
} from 'react-native';

class Buffe extends Component {
	constructor(props) {
    	super(props);
  	}

	render() {
		var {drink, addDrinkToOrders} = this.props;
		return (	
					<TouchableNativeFeedback  onPress={ () => addDrinkToOrders(drink.id, drink.drinkType, drink.price)}  background={TouchableNativeFeedback.SelectableBackground("red")}> 
						<View style={styles.container}>
							<Text style={styles.drinkType}>
								{drink.drinkType}
							</Text>
							<Text style={styles.textContainer}>
								Price: 
								<Text style={styles.price}>
									{drink.price}
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
		backgroundColor: 'green',
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
export default Buffe;