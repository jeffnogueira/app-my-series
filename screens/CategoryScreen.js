import React, {Component} from 'react';
import { Container, Content } from 'native-base'
import { Alert, StyleSheet, ActivityIndicator, View } from 'react-native'
import { categories } from '../configs/api'
import ListCategory from '../components/ListCategory'

class CategoryScreen extends Component{

	constructor(props){
		super(props)

		this.state = {
			isLoading: false,
			categories: []
		}
	}

	componentDidMount() {
		this.setState({isLoading: true})
        categories.loadCategories().then((result) => {
			this.setState({isLoading: false, categories: result.data})
		}).catch((err) => Alert.alert('Erro ao ler os dados'))
	}

	render(){
		return(
			<Container style={styles.containerTop}>
				{this.state.isLoading && <View style={styles.container}><ActivityIndicator size='large' /></View> }
		        <Content>
					<ListCategory data={this.state.categories} propsFather={this.props} />
		        </Content>
		    </Container>
		)
	}
}

const styles = StyleSheet.create({
	containerTop: {
		marginTop: 23,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});


export default CategoryScreen