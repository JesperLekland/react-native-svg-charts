import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import * as scale from 'd3-scale'
import * as array from 'd3-array'

class XAxis extends Component {

    state = {
        width: 0,
        height: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { width } } } = event

        if (width !== this.state.width) {
            this.setState({ width })
        }
    }

    _onTextLayout(event) {
        const { nativeEvent: { layout: { height } } } = event

        if (height !== this.state.height) {
            this.setState({ height })
        }
    }

    render() {

        const { style, values, labelStyle, spacing, chartType, formatValue } = this.props
        const { width, height }                                              = this.state

        let labelWidth
        let x

        switch (chartType) {
            case 'bar': {

                x = scale.scaleBand()
                    .domain(values)
                    .range([ 0, width ])
                    .paddingInner([ spacing ])
                    .paddingOuter([ spacing ])

                labelWidth = x.bandwidth()

                break

            }
            case 'line': {

                labelWidth = Math.floor(width / values.length - 1)

                x = scale.scaleTime()
                    .domain(array.extent(values))
                    .range([ 0, width - labelWidth ])

                break
            }
            default:
                console.warn(
                    `invalid chartType "${chartType}"
                    Must be one of "XAxis.Type.LINE" or "XAxis.type.BAR `,
                )

                labelWidth = 0
                x          = () => {}
        }

        return (
            <View style={[ style ]}>
                <View
                    style={{ height }}
                    onLayout={event => this._onLayout(event)}
                >
                    {values.map(value => {
                        return (
                            <Text
                                numberOfLines={1}
                                //'clip' not supported on android
                                // ellipsizeMode={'clip'}
                                onLayout={event => this._onTextLayout(event)}
                                key={value}
                                style={[
                                    styles.text,
                                    labelStyle,
                                    {
                                        width: labelWidth,
                                        position: 'absolute',
                                        left: x(value),
                                    },
                                ]}
                            >
                                {formatValue(value)}
                            </Text>
                        )
                    })}
                </View>
            </View>
        )
    }
}

XAxis.Type = {
    LINE: 'line',
    BAR: 'bar',
}

XAxis.propTypes = {
    values: PropTypes.array.isRequired,
    labelStyle: PropTypes.any,
    chartType: PropTypes.oneOf([ XAxis.Type.LINE, XAxis.Type.BAR ]),
    spacing: PropTypes.number,
    formatLabel: PropTypes.func,
}

XAxis.defaultProps = {
    type: 'line',
    spacing: 0.05,
    chartType: XAxis.Type.LINE,
    formatValue: value => value && value.toString,
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 10,
    },
})

export default XAxis
