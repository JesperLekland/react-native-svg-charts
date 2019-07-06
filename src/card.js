import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

class Card extends React.PureComponent {
    state = {
        hasError: false,
    }

    componentDidCatch(error, info) {
        console.warn(error, info)
        this.setState({ hasError: true })
    }

    render() {
        const { hasError } = this.state
        const { style, children } = this.props

        return (
            <View style={[styles.container, style]}>{hasError ? <Text>{'Something went wrong'}</Text> : children}</View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowOffset: {
            height: 2,
            width: 2,
        },
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        padding: 16,
    },
})

export default Card
