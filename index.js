/* eslint-disable no-unused-vars */

import React from 'react'
import { AppRegistry, Text, View } from 'react-native'

const App = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
            }}
        >
            <Text
                style={{
                    fontSize: 22,
                    textAlign: 'center',
                }}
            >
                {'Welcome to "react-native-svg-charts". \n' + 'To see showcases of all our charts\n'}
            </Text>
            <Text
                style={{
                    fontSize: 14,
                    alignSelf: 'center',
                }}
            >
                {'• Stop your packager \n' +
                    '• run "yarn storybook" \n' +
                    '• Go to "localhost:7008" in your browser\n' +
                    '• reload your device \n' +
                    '• browse our charts'}
            </Text>
        </View>
    )
}

AppRegistry.registerComponent('react-native-svg-charts', () => App)
