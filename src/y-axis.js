import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import * as scale from 'd3-scale'
import * as array from 'd3-array'

class YAxis extends Component {

    state = {
        height: 0,
        textHeight: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height } } } = event
        this.setState({ height })
    }

    _onTextLayout(event) {
        const { nativeEvent: { layout: { height } } } = event
        if (height === this.state.textHeight) {
            return
        }
        this.setState({ textHeight: height })
    }

    render() {

        const { style, dataPoints, numberOfTicks, labelStyle, yRatio } = this.props
        const { height, textHeight }                                   = this.state

        const extent = array.extent(dataPoints)
        const ticks  = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        const y = scale.scaleLinear()
            .domain(array.extent(dataPoints))
            .range([ height * yRatio, height - (height * yRatio) ])

        const longestValue = ticks.reduce((prev, curr) =>
                prev.toString().length > curr.toString().length ? prev : curr
            , 0)

        return (
            <View style={[ style ]}>
                <View
                    style={{ flex: 1 }}
                    onLayout={event => this._onLayout(event)}
                >
                    {/*This invisible component allows for parent sizing*/}
                    <Text style={[ styles.text, labelStyle, { color: 'transparent', position: 'relative' } ]}>
                        {longestValue}
                    </Text>
                    {ticks.map((value, index) => {
                        return (
                            <Text
                                key={index}
                                numberOfLines={1}
                                //'clip' not supported on android
                                // ellipsizeMode={'clip'}
                                onLayout={event => this._onTextLayout(event)}
                                style={[
                                    styles.text,
                                    labelStyle,
                                    { top: y(value) - (textHeight / 2) },
                                ]}
                            >
                                {value}
                            </Text>
                        )
                    })}
                </View>
            </View>
        )
    }
}

YAxis.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    style: PropTypes.any,
    labelStyle: PropTypes.any,
    numberOfTicks: PropTypes.number,
    yRatio: PropTypes.number,
}

YAxis.defaultProps = {
    numberOfTicks: 10,
    yRatio: 1,
}

const styles = StyleSheet.create({
    text: {
        // borderWidth: 1,
        borderColor: 'red',
        minHeight: 14,
        fontSize: 10,
        textAlign: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 0,
        right: 0,
    },
})

export default YAxis
