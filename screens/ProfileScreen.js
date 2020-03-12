import React, {Component} from 'react'
import { Container, Content, List, ListItem } from 'native-base'
import { Alert, StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, AsyncStorage, Image } from 'react-native'
import axios from 'axios'
import BackgroundImage from '../components/BackgroundImage'
import ListSerie from '../components/ListSerie'
import { mySeries } from '../configs/api'

class ProfileScreen extends Component{

	constructor(props){
		super(props)
		this.state = {
			isLoading: false,
			mySeries: [],
		}
		this.logout = this.logout.bind()
		this.loadMySeries = this.loadMySeries.bind()
	}

	logout = () =>{
		try{
			delete axios.defaults.headers.common['Authorization'] 
			AsyncStorage.removeItem('userData')
			this.setState({ userData: null })
			this.props.navigation.navigate('Login')
		}catch(err){

		}
	}

	loadMySeries = async () => {
		mySeries.loadMySeries(this.state.userData.id).then((result) => {
			this.setState({isLoading: false, mySeries: result.data})
		}).catch((err) => Alert.alert('Erro ao ler os dados'))
	}

	componentDidMount() {
		AsyncStorage.getItem('userData').then((res) => {
			var json = JSON.parse(res)
			if(json == null){
				return this.logout()
			}else{
				axios.defaults.headers.common['Authorization']
						= `JWT ${json.tokenUser}`
				this.setState({ userData: json })
				return this.loadMySeries()
			}
		})
	}

	render(){
		return(
			<Container style={styles.containerTop}>
				{this.state.isLoading && <View style={styles.container}><ActivityIndicator size='large' /></View> }
					{
					this.state.userData ?
						<Content>
							<View>
								<List>
									<ListItem style={{flexDirection: "column"}}>
										<BackgroundImage source={require(`../images/banner.jpg`)} style={{width: '100%', height: '100%'}}>
											<View style={styles.viewImage}>
												<Image
													source={require(`./../images/avatar.png`)}
													style={styles.image}
												/>
											</View>
										</BackgroundImage>
										<View style={{flexDirection: "column", marginTop: 15}}>
											<Text>{this.state.userData.name}</Text>
										</View>
									</ListItem>
								</List>
								<ListSerie data={this.state.mySeries} propsFather={this.props} />
								<List>
									<ListItem style={{flexDirection: "column"}}>
										<View>
											<TouchableOpacity onPress={this.logout}>
												<View style={{alignItems: 'center', padding: 5}}>
													<Text style={styles.buttonText}>
														Sair da Conta
													</Text>
												</View>
											</TouchableOpacity>
										</View>
									</ListItem>
								</List>
							</View>
						</Content>
					: false}
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
    buttonText: {
		color: 'red',
        fontSize: 20,
    },
    text: {
        fontSize: 13,
        textAlign: 'center',
	},
	viewImage:{
		flexDirection: "row",
		marginLeft: '40%',
		marginTop: 80,
	},
	image: {
		width: 60,
		height: 60,
		borderRadius: 60,
		paddingLeft: 10
	},
	imageSerie: {
		width: 75,
		height: 110,
		paddingLeft: 10
	}
});


export default ProfileScreen