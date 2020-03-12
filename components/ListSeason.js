import React, {Component} from 'react';
import { ListItem, Separator } from 'native-base'
import { Alert, StyleSheet, Text, View, AsyncStorage } from 'react-native'
import { Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";
import axios from 'axios';
import CheckBox from './CheckBox.js'
import { myEpisodes, addEpisode, removeEpisode } from '../configs/api'

class ListSeason extends Component {

	constructor(props){
		super(props)
		this.state = {
			listEpisodes: []
		}
		this.changeListEpisodes = this.changeListEpisodes.bind()
		this.loadMyEpisodes = this.loadMyEpisodes.bind()
	}

	changeListEpisodes = async (value, idSerie, idSeason, idEpisodes) => {
		if(value){
			addEpisode.addMyEpisodes(this.state.userData.id, idSerie, idSeason, idEpisodes).then((result) => {
				return this.loadMyEpisodes()
			}).catch((err) => Alert.alert('Erro ao adicionar a série, tente novamente.'))
		}else{
			removeEpisode.removeMyEpisodes(this.state.userData.id, idSerie, idSeason, idEpisodes).then((result) => {
				return this.loadMyEpisodes()
			}).catch((err) => Alert.alert('Erro ao retirar a série, tente novamente.'))
		}
	}

	loadMyEpisodes = async () => {
		myEpisodes.loadMyEpisodes(this.state.userData.id).then((result) => {
			this.setState({isLoading: false, listEpisodes: Object.keys(result.data).map(key => result.data[key].idEpisodes) })
		}).catch((err) => Alert.alert('Erro ao ler os dados'))
	}

	componentDidMount() {
		AsyncStorage.getItem('userData').then((res) => {
			var json = JSON.parse(res)
			axios.defaults.headers.common['Authorization']
					= `JWT ${json.tokenUser}`
			this.setState({ userData: json })
			return this.loadMyEpisodes()
		})
	}

    render() {
		const {data, ...props} = this.props
      	return (
			data.map(season => {
				return  <Collapse key={season.id}>
							<CollapseHeader>
								<Separator bordered style={styles.boxTemp}>
									<View style={styles.viewTemp}>
										<Text style={styles.textTemp}>Temporada {season.number}</Text>
									</View>
								</Separator>
							</CollapseHeader>
							<CollapseBody>
								{season.episodes.map(episode => {
									return  <ListItem key={episode.id}>
												<Text>Episódio {episode.number}</Text>
												<CheckBox
													value={this.state.listEpisodes.includes(episode.id)}
													onValueChange={value => this.changeListEpisodes(value, season.id, season.idSerie, episode.id)}
													style={styles.checkBoxEpi} />
											</ListItem>
								})}
							</CollapseBody>
						</Collapse>
			})
      	)
    }
}

const styles = StyleSheet.create({
	boxTemp: {
		backgroundColor: 'white',
		height: 50,
	},
	viewTemp: {
		flexDirection: 'row',
	},
	textTemp: {
		fontSize: 20,
	},
	checkBoxTemp: {
        marginLeft: '51.5%',
    },
	checkBoxEpi: {
        marginLeft: '70%',
    }
});

export default ListSeason