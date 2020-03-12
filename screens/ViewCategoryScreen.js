import React, {Component} from 'react';
import { Container } from 'native-base'
import { Alert, View, StyleSheet } from 'react-native'
import { categorieSeries } from '../configs/api'
import ListCategorySerie from '../components/ListCategorySerie'

class ViewCategoryScreen extends Component{

	constructor(props){
		super(props)
        const { navigation } = this.props
        const id = navigation.getParam('id', 'NO-ID')
		this.state = {
            idCategory: id,
			series: [],
			isLoading: false
		}
	}

	componentDidMount() {
		this.setState({isLoading: true})
        categorieSeries.loadCategorieSeries(this.state.idCategory).then((result) => {
			this.setState({isLoading: false, series: result.data})
		}).catch((err) => Alert.alert('Erro ao ler os dados'))
	}

	render(){
		return(
			<Container style={styles.containerTop}>
                <View>
                    <ListCategorySerie data={this.state.series} propsFather={this.props} />
                </View>
		    </Container>

		)
	}
}

const styles = StyleSheet.create({
	containerTop: {
		marginTop: 23,
	},
});

export default ViewCategoryScreen