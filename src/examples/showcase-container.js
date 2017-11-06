import React from 'react'
import { StatusBar, View } from 'react-native'
import YAxisExample from './y-axis'

const ShowcaseContainer = () => (
    <View style={ {
        margin: 16,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        shadowOffset: {
            height: 2,
            width: 2,
        },
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.5,
    } }>
        <StatusBar hidden={ true }/>
        <YAxisExample/>
    </View>
)

export default ShowcaseContainer
