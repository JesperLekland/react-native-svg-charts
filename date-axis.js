import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import * as scale from 'd3-scale'
import * as dateFns from 'date-fns'
import * as array from 'd3-array'

class DateAxis extends Component {

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

        const { style, dates, dateFormat, labelStyle, spacing, chartType } = this.props
        const { width, height }                                            = this.state

        let labelWidth
        let x

        switch (chartType) {
            case 'bar': {

                x = scale.scaleBand()
                    .domain(dates)
                    .range([ 0, width ])
                    .paddingInner([ spacing ])
                    .paddingOuter([ spacing ])

                labelWidth = x.bandwidth() //+ x.bandwidth() * spacing

                break

            }
            case 'line': {

                labelWidth = Math.floor(width / dates.length - 1)

                x = scale.scaleTime()
                    .domain(array.extent(dates))
                    .range([ 0, width - labelWidth ])

                break
            }
            default:
                labelWidth = 0
                x          = () => {}
        }

        return (
            <View style={[ style ]}>
                <View
                    style={{ height }}
                    onLayout={event => this._onLayout(event)}
                >
                    {dates.map(date => {
                        return (
                            <Text
                                numberOfLines={1}
                                //'clip' not supported on android
                                // ellipsizeMode={'clip'}
                                onLayout={event => this._onTextLayout(event)}
                                key={date}
                                style={[
                                    styles.text,
                                    labelStyle,
                                    {
                                        width: labelWidth,
                                        position: 'absolute',
                                        left: x(date),
                                    },
                                ]}
                            >
                                {dateFns.format(date, dateFormat)}
                            </Text>
                        )
                    })}
                </View>
            </View>
        )
    }
}

DateAxis.Type = {
    LINE: 'line',
    BAR: 'bar',
}

DateAxis.propTypes = {
    dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    dateFormat: PropTypes.string,
    labelStyle: PropTypes.any,
    chartType: PropTypes.oneOf([ DateAxis.Type.LINE, DateAxis.Type.BAR ]),
    spacing: PropTypes.number,
}

DateAxis.defaultProps = {
    dateFormat: 'MMM',
    type: 'line',
    spacing: 0.05,
    chartType: DateAxis.Type.LINE,
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontSize: 10,
    },
})

export default DateAxis
