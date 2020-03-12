import axios from 'axios';
import { AsyncStorage } from 'react-native'

logout = async () =>{
    try{
        delete axios.defaults.headers.common['Authorization']
        await AsyncStorage.removeItem('userData')
        this.props.navigation.navigate('Login')
    }catch(err){

    }
}

export const verify = {

	authenticate : () => AsyncStorage.getItem('userData').then((res) => {
        var json = null
        if(json == null){
            return this.logout()
        }else{
            axios.defaults.headers.common['Authorization']
                    = `JWT ${json.tokenUser}`
                    console.log('verify')
            return json
        }
    })
}