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