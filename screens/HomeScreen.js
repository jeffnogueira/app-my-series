import React, {Component} from 'react';
import { Container, Content } from 'native-base'
import { Alert, StyleSheet, ActivityIndicator, View, AsyncStorage } from 'react-native'
import axios from 'axios'
import { nextEpisodes } from '../configs/api'
import ListNextEpisodes from '../components/ListNextEpisodes'
import ControlRefresh from '../components/ControlRefresh'

class HomeScreen extends Component{

	constructor(props){
		super(props)

		this.state = {
			isLoading: false,
			episodes: []
		}
		this.loadNextEpisodes = this.loadNextEpisodes.bind()
	}

	loadNextEpisodes = async () => {
		this.setState({isLoading: true})
		nextEpisodes.loadNextEpisodes(this.state.userData.id).then((result) => {
			this.setState({isLoading: false, episodes: result.data})
		}).catch((err) => Alert.alert('Erro ao ler os dados'))
	}

	componentDidMount() {
		AsyncStorage.getItem('userData').then((res) => {
			var json = JSON.parse(res)
			axios.defaults.headers.common['Authorization']
					= `JWT ${json.tokenUser}`
			this.setState({ userData: json })
			return this.loadNextEpisodes()
		})
	}

	render(){
		return(
			<Container style={styles.containerTop} refreshControl={<ControlRefresh />}>
				{this.state.isLoading && <View style={styles.container}><ActivityIndicator size='large' /></View> }
		        <Content>
					<ListNextEpisodes data={this.state.episodes} propsFather={this.props} />
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


export default HomeScreen