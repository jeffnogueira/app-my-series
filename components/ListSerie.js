import React, {Component} from 'react';
import { List, ListItem } from 'native-base'
import { StyleSheet, Text, View, Image } from 'react-native'

class ListSerie extends Component {

    render() {
        const {data, propsFather, ...props} = this.props

        return (data.map(serie => {
                    return  <List key={serie.id} >
                                <ListItem style={{flexDirection: "row"}} onPress={() => propsFather.navigation.navigate('ViewSerie', {id: serie.id})}>
                                    <Image
                                        source={{uri: serie.avatar}}
                                        style={styles.imageSerie}
                                    />
                                    <View style={{flexDirection: "column", marginLeft: 25}}>
                                        <Text>{serie.name}</Text>
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
	}
});

export default ListSerie