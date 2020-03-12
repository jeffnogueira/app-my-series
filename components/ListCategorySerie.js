import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'

class ListCategorySerie extends Component {

    render() {
        const {data, propsFather, ...props} = this.props

        return <FlatList
                    data={data}
                    renderItem={({ item, index }) => {
                        return (<TouchableOpacity onPress={() => propsFather.navigation.navigate('ViewSerie', {id: item.id})}>
                                    <Image
                                        source={{uri: item.avatar}}
                                        style={styles.imageSerie}
                                    />
                                </TouchableOpacity>)
                    }}
                    numColumns={3}
                    keyExtractor={item => item.id}
				/>
    }
}

const styles = StyleSheet.create({
	imageSerie: {
		width: 100,
		height: 150,
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 15
	}
});

export default ListCategorySerie