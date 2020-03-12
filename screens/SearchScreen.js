import React, {Component} from 'react';
import { Container } from 'native-base'
import { Alert, StyleSheet, View } from 'react-native'
import { series } from '../configs/api'
import { seriesSearch } from '../configs/api'
import ListCategorySerie from '../components/ListCategorySerie'
import Input from '../components/Input';

class SearchScreen extends Component{

	constructor(props){
        super(props)
		this.state = {
            search: '',
			series: [],
			isLoading: false
		}
		this.loadSeriesSearch = this.loadSeriesSearch.bind()
    }

    loadSeriesSearch = async search => {
		this.setState({ search })
        seriesSearch.loadSeriesSearch(search).then((result) => {
			this.setState({isLoading: false, series: result.data})
		}).catch((err) => Alert.alert('Erro ao ler os dados'))
    }

	componentDidMount() {
		this.setState({isLoading: true})
        series.loadSeries().then((result) => {
			this.setState({isLoading: false, series: result.data})
		}).catch((err) => Alert.alert('Erro ao ler os dados'))
	}

	render(){
		return(
			<Container style={styles.containerTop}>
                <View>
                    <Input icon='search' placeholder='Pesquise' style={styles.input} 
                        value={this.state.search} onChangeText={search => this.loadSeriesSearch(search)} />
                    <ListCategorySerie data={this.state.series} propsFather={this.props} />
                </View>
		    </Container>

		)
	}
}

const styles = StyleSheet.create({
	containerTop: {
		marginTop: 23,
		marginBottom: 48,
	},
    input: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FFF',
    },
});


export default SearchScreen