import React, {Component} from 'react';
import { Container, Content, List, ListItem } from 'native-base'
import { Alert, StyleSheet, Text, ActivityIndicator, View } from 'react-native'
import { viewSerie } from '../configs/api'
import BackgroundImage from '../components/BackgroundImage'
import ListSeason from '../components/ListSeason'

class ViewSerieScreen extends Component{

	constructor(props){
		super(props)
        const { navigation } = this.props;
        const id = navigation.getParam('id', 'NO-ID');
		this.state = {
            idSerie: id,
			serie: {},
			isLoading: false
		}
	}

	componentDidMount() {
		this.setState({isLoading: true})
        viewSerie.loadViewSerie(this.state.idSerie).then((result) => {
			this.setState({isLoading: false, serie: result.data[0]})
		}).catch((err) => Alert.alert('Erro ao ler os dados'))
	}

	render(){
		return(
			<Container style={styles.containerTop}>
					<Content>
						<View>
							<List style={styles.listMain}>
								<ListItem style={{flexDirection: "column"}}>
									<View style={styles.viewBackgroundImage}>
										<BackgroundImage source={{uri: this.state.serie.banner}} style={{width: '100%', minHeight: 180}}>
										</BackgroundImage>
									</View>
									<View style={styles.viewTitle}>
										<Text style={styles.textTitle}>{this.state.serie.name}</Text>
									</View>
									<View style={{flexDirection: "row", padding: 20}}>
										<View style={{flexDirection: "column"}}>
											<Text>{this.state.serie.description}</Text>
										</View>
									</View>
								</ListItem>
							</List>

							<List>
								{
									this.state.isLoading && <View style={styles.container}><ActivityIndicator size='large' /></View>
								}{
									this.state.serie.season && <ListSeason data={this.state.serie.season} />
								}
							</List>

						</View>
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
	listMain: {
		marginTop: -20,
		marginRight: -20,
		marginLeft: -20
	},
	viewTitle:{
		marginTop: -35,
		alignSelf: 'flex-start',
	},
	textTitle: {
		fontWeight: 'bold',
		fontSize: 20,
		marginLeft: 20,
		color: 'white'
	},
	viewBackgroundImage: {
		flexDirection: "column", 
		backgroundColor: 'black',
		opacity: 0.6, 
		width: '100%', 
		minHeight: 180
	}
});


export default ViewSerieScreen