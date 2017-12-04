import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import * as scale from 'd3-scale'

class XAxis extends PureComponent {

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

    render() {

        const {
                  style,
                  values,
                  labelStyle,
                  spacing,
                  chartType,
                  formatLabel,
                  contentInset: {
                      left  = 0,
                      right = 0,
                  },
              } = this.props

        const { width } = this.state

        if (values.length === 0) {
            return <View style={ style }/>
        }

        let labelWidth
        let x
        let transform
        const domain = [ 0, values.length - 1 ]

        switch (chartType) {
            case 'bar': {

                // use index as domain identifier instead of value since
                // same value can occur at several places in dataPoints
                x = scale.scaleBand()
                    .domain(values.map((_, index) => index))
                    .range([ left, width - right ])
                    .paddingInner([ spacing ])
                    .paddingOuter([ spacing ])

                labelWidth = x.bandwidth()
                transform  = []

                break

            }
            case 'line': {

                labelWidth = ((width - left - right) / values.length )
                transform  = [ { translateX: -labelWidth / 2 } ]

                x = scale.scaleLinear()
                    .domain(domain)
                    .range([ left, width - right ])

                break
            }
            default:
                console.warn(
                    `invalid chartType "${chartType}"
                    Must be one of "XAxis.Type.LINE" or "XAxis.type.BAR `,
                )

                labelWidth = 0
                x          = () => {}
                transform  = []
        }

        return (
            <View style={[ style ]}>
                <View
                    style={ { flexGrow: 1 } }
                    onLayout={ event => this._onLayout(event) }
                >
                    {/*invisible text to allow for parent resizing*/}
                    <Text style={ [ labelStyle, { color: 'transparent' } ] }>
                        { formatLabel(values[ 0 ], 0) }
                    </Text>
                    {values.map((value, index) => {
                        return (
                            <Text
                                numberOfLines={1}
                                //'clip' not supported on android
                                // ellipsizeMode={'clip'}
                                key={`${value}-${index}`}
                                style={[
                                    styles.text,
                                    labelStyle,
                                    {
                                        width: labelWidth,
                                        position: 'absolute',
                                        left: x(index),
                                        transform,
                                    },
                                ]}
                            >
                                {formatLabel(value, index)}
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
    contentInset: PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
    }),
}

XAxis.defaultProps = {
    type: 'line',
    spacing: 0.05,
    chartType: XAxis.Type.LINE,
    contentInset: {},
    formatLabel: (value, index) => index,
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 10,
    },
})

export default XAxis
