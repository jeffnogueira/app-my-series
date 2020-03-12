import React from 'react'
import { CheckBox } from 'react-native'

export default props => {

    return (
        <CheckBox {...props} style={[props.style]} />
    )
}