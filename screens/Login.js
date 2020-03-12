import React, {Component} from 'react';
import { Container, Content } from 'native-base';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, AsyncStorage, Dimensions } from 'react-native';
import Input from '../components/Input';
import { signIn, signUp } from '../configs/api';
import BackgroundImage from '../components/BackgroundImage'
import axios from 'axios';

class LoginScreen extends Component{

	constructor(props){
		super(props)
		this.state = {
			name: '',
			email: '',
            password: '',
            confirmPassword: '',
			avatar: '',
			banner: '',
			stageNew: false,
			isLoading: false,
		}
		this.emptyFields = this.emptyFields.bind()
	}

    signin = async () => {
		signIn.sendSignIn(this.state.email, this.state.password).then(async (res) => {
            this.emptyFields()
			axios.defaults.headers.common['Authorization']
				= `JWT ${res.data.tokenUser}`
			await AsyncStorage.setItem('userData', JSON.stringify(res.data))
			this.props.navigation.navigate('Home', res.data)
		}).catch(err => console.log(err))

    }

    signup = async () => {
		signUp.sendSignUp( this.state.name, this.state.email, this.state.password,
							this.state.avatar,this.state.banner ).then(() => {
								this.emptyFields()
								this.setState({ stageNew: false })
		}).catch(err => console.log(err))
    }

    signinOrSignup = () => {
        if (this.state.stageNew){
            this.signup()
        }else {
            this.signin()
        }
	}

	emptyFields = async () => {
		this.setState({ name: '',password: '',email: '',avatar: '',banner: '',confirmPassword: '' })
	}

	render(){
		const validations = []

		validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stageNew){
            validations.push(this.state.name && this.state.name.trim())
            validations.push(this.state.confirmPassword)
            validations.push(this.state.password === this.state.confirmPassword)
		}

		const validForm = validations.reduce((all,v) => all && v)

		return(
			<Container>
				{this.state.isLoading && <View style={styles.container}><ActivityIndicator size='large' /></View> }
                <BackgroundImage source={{uri: 'http://jeff.sbxdigital.com.br/wallpaper.jpg'}} style={styles.background}>
                    <Content style={styles.content}>
                            <View>
                                {this.state.stageNew &&
                                <Input icon='user' placeholder='Nome' style={styles.input}
                                    value={this.state.name} onChangeText={name => this.setState({ name })} /> }
                                <Input icon='at' placeholder='Email' style={styles.input}
                                    value={this.state.email} onChangeText={email => this.setState({ email })} />
                                <Input icon='lock' secureTextEntry={true} placeholder='Senha' style={styles.input} 
                                    value={this.state.password} onChangeText={password => this.setState({ password })} />
                                {this.state.stageNew &&
                                <Input icon='asterisk' secureTextEntry={true} placeholder='Confirmar Senha' style={styles.input} 
                                    value={this.state.confirmPassword} onChangeText={confirmPassword => this.setState({ confirmPassword })} />}
                                {this.state.stageNew &&
                                <Input icon='image' placeholder='Avatar' style={styles.input}
                                    value={this.state.avatar} onChangeText={avatar => this.setState({ avatar })} /> }
                                {this.state.stageNew &&
                                <Input icon='image' placeholder='Banner' style={styles.input}
                                    value={this.state.Banner} onChangeText={Banner => this.setState({ Banner })} /> }

                                <TouchableOpacity dissbled={!validForm}
                                    onPress={this.signinOrSignup}>
                                    <View style={[styles.button, !validForm ? { backgroundColor: '#AAA' } : {}]}>
                                        <Text style={styles.buttonText}>
                                            {this.state.stageNew ? 'Registrar' : 'Entrar'}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={{padding: 10}}
                                onPress={() => this.setState({ stageNew: !this.state.stageNew})}>
                                <Text style={styles.text}>
                                    {this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}
                                </Text>
                            </TouchableOpacity>
                        </Content>
                    </BackgroundImage>
		    </Container>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
    input: {
        marginTop: 10,
        backgroundColor: '#FFF',
    },
    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 15
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        borderRadius: 15
    },
    text: {
        fontSize: 13,
        textAlign: 'center',
        color: 'white',
    },
    content: {
        marginTop: '70%',
        marginLeft: '17%',
        width: Dimensions.get('window').width * 2 / 3,
    },
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
});

export default LoginScreen