import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import * as scale from 'd3-scale'
import * as array from 'd3-array'

class YAxis extends PureComponent {

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

        const {
                  style,
                  dataPoints,
                  numberOfTicks,
                  labelStyle,
                  formatLabel,
                  contentInset: {
                      top    = 0,
                      bottom = 0,
                  },
              }                      = this.props
        const { height, textHeight } = this.state

        if (dataPoints.length === 0) {
            return <View style={ style }/>
        }

        const extent = array.extent([ ...dataPoints, 0 ])
        const ticks  = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        const y = scale.scaleLinear()
            .domain(extent)
            .range([ bottom, height - top ])

        const longestValue = ticks
            .map(value => formatLabel(value))
            .reduce((prev, curr) => prev.toString().length > curr.toString().length ? prev : curr, 0)

        return (
            <View style={[ style ]}>
                <View
                    style={{ flex: 1 }}
                    onLayout={event => this._onLayout(event)}
                >
                    {/*This invisible component allows for parent sizing*/}
                    <Text style={[ styles.text, labelStyle, styles.invisibleText ]}>
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
                                    {
                                        bottom: y(value),
                                        transform: [ { translateY: textHeight / 2 } ],
                                    },
                                ]}
                            >
                                {formatLabel(value)}
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
    formatLabel: PropTypes.func,
    contentInset: PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
    }),
}

YAxis.defaultProps = {
    numberOfTicks: 10,
    contentInset: {},
    formatLabel: value => value && value.toString(),
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
    invisibleText: {
        paddingHorizontal: 2,
        color: 'transparent',
        position: 'relative',
    },
})

export default YAxis
