import React, {Component} from 'react';
import { List, ListItem } from 'native-base'
import { Text, View } from 'react-native'

class ListCategory extends Component {

    render() {
        const {data, propsFather, ...props} = this.props
        return (data.map(category => {
                    return  <List key={category.id} >
                                <ListItem style={{flexDirection: "row"}} onPress={() => propsFather.navigation.navigate('ViewCategory', {id: category.id})}>
                                    <View style={{flexDirection: "column", marginLeft: 25}}>
                                        <Text>{category.description}</Text>
                                    </View>
                                </ListItem>
                            </List>
                })
        )
    }
}

export default ListCategory