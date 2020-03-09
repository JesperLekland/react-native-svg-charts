function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true })
    } else {
        obj[key] = value
    }
    return obj
}

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

class Card extends React.PureComponent {
    constructor(...args) {
        super(...args)

        _defineProperty(this, 'state', {
            hasError: false,
        })
    }

    componentDidCatch(error, info) {
        console.warn(error, info)
        this.setState({
            hasError: true,
        })
    }

    render() {
        const { hasError } = this.state
        const { style, children } = this.props
        return React.createElement(
            View,
            {
                style: [styles.container, style],
            },
            hasError ? React.createElement(Text, null, 'Something went wrong') : children
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
//# sourceMappingURL=card.js.map
