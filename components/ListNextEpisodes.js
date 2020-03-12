import React, {Component} from 'react';
import { List, ListItem } from 'native-base'
import moment from 'moment'
import { StyleSheet, Text, View, Image } from 'react-native'

class ListNextEpisodes extends Component {

    render() {
        const {data, propsFather, ...props} = this.props

        return (data.map(serie => {
            return  <List key={serie.idEpisode} >
                        <ListItem style={{flexDirection: "row"}} onPress={() => propsFather.navigation.navigate('ViewSerie', {id: serie.idSerie})}>
                            <Image
                                source={{uri: serie.avatar}}
                                style={styles.imageSerie}
                            />
                            <View style={{flexDirection: "column", marginLeft: 25}}>
                                <Text style={styles.title}>{serie.title}</Text>
                                <Text>{serie.name}</Text>
                                <Text style={styles.date}>{moment(serie.releaseDate).format('L')}</Text>
                            </View>
                        </ListItem>
                    </List>
        })
        )
    }
}

const styles = StyleSheet.create({
	imageSerie: {
		width: 100,
		height: 150,
		paddingLeft: 10
    },
    title: {
        fontWeight: 'bold',
        width: 200
    },
    date: {
        fontStyle: 'italic',
        marginTop: 35,
    }
});

export default ListNextEpisodes