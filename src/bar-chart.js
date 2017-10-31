import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Defs, G } from 'react-native-svg'
import Path from './animated-path'
import { Constants } from './util'

class BarChart extends PureComponent {

    state = {
        width: 0,
        height: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    _getBar(value, x, y, barIndex, valueIndex, barWidth) {
        return {
            value,
            area: shape.area()
            // place the bar on the x-axis based on valueIndex + its index among the other bars in its group
                .x((point, _index) =>
                    _index === 0 ?
                        x(valueIndex) + (barWidth * barIndex) :
                        x(valueIndex) + barWidth + (barWidth * barIndex),
                )
                .y0(y(0))
                .y1(point => y(point))
                .defined(value => value)
                ([ value, value ]),
        }
    }

    render() {
        const {
                  dataPoints,
                  spacing,
                  animate,
                  animationDuration,
                  style,
                  showGrid,
                  strokeColor,
                  renderGradient,
                  numberOfTicks,
                  contentInset: {
                      top    = 0,
                      bottom = 0,
                      left   = 0,
                      right  = 0,
                  },
                  gridMax,
                  gridMin,
                  extras,
                  renderExtra,
                  renderDecorator,
              } = this.props

        const { height, width } = this.state

        if (dataPoints.length === 0 || dataPoints[ 0 ].values.length === 0) {
            return <View style={ style }/>
        }

        if (dataPoints.length > 0 && typeof dataPoints[ 0 ] === 'object') {
            const lengths = Object.values(dataPoints).map(obj => obj.values.length)
            const extent  = array.extent(lengths)
            if (extent[ 0 ] - extent[ 1 ] !== 0) {
                throw new Error(`value arrays must be of equal length. Lengths are [${lengths}]`)
            }
        }

        const values = array.merge(Object.values(dataPoints).map(obj => obj.values))

        const extent = array.extent([ ...values, gridMax, gridMin ])
        const ticks  = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        //invert range to support svg coordinate system
        const y = scale.scaleLinear()
            .domain(extent)
            .range([ height - bottom, top ])

        // use index as domain identifier instead of value since
        // same value can occur at several places in dataPoints
        const x = scale.scaleBand()
            .domain(dataPoints[ 0 ].values.map((_, index) => index))
            .range([ left, width - right ])
            .paddingInner([ spacing ])
            .paddingOuter([ spacing ])

        const numberOfDifferentBars = Object.keys(dataPoints).length
        const barWidth              = x.bandwidth() / numberOfDifferentBars
        const dataLength            = dataPoints[ 0 ].values.length

        let areas = []
        for (let i = 0; i < dataLength; i++) {

            //pick up the value from each "bar"
            const currentValues = Object.values(dataPoints)
                .map(obj => obj.values[ i ])

            //for each value calculate the bar area. The object index places a big role
            currentValues.forEach((value, barIndex) => {

                // eslint-disable-next-line no-unused-vars
                const { values, ...colors } = dataPoints[ barIndex ]
                const bar                   = this._getBar(value, x, y, barIndex, i, barWidth)

                areas.push({
                    ...bar,
                    strokeColor,
                    ...colors,
                })
            })
        }

        return (
            <View style={style}>
                <View
                    style={{ flex: 1 }}
                    onLayout={event => this._onLayout(event)}
                >
                    {
                        showGrid &&
                        ticks.map((tick, index) => (
                            <View
                                key={index}
                                style={[ styles.grid, { top: y(tick) } ]}
                            />
                        ))
                    }
                    <Svg style={{ flex: 1 }}>
                        {
                            areas.map((bar, index) => {
                                if (!bar.area) {
                                    return null
                                }

                                const strokeColor = bar.value < 0 ? bar.strokeColorNegative : bar.strokeColor
                                const fillColor   = bar.value < 0 ? bar.fillColorNegative : bar.fillColor

                                return (
                                    <G key={index}>
                                        <Defs>
                                            {
                                                renderGradient && renderGradient({
                                                    id: `gradient-${index}`,
                                                    ...bar,
                                                    fillColor,
                                                    strokeColor,
                                                })
                                            }
                                        </Defs>
                                        <Path
                                            fill={renderGradient ? `url(#gradient-${index})` : fillColor}
                                            stroke={strokeColor}
                                            d={bar.area || null}
                                            animate={animate}
                                            animationDuration={animationDuration}
                                        />
                                    </G>
                                )
                            })
                        }
                        { extras.map(item => renderExtra({ item, x, y, width, height })) }
                        { dataPoints[ 0 ].values.map((value, index) => renderDecorator(
                            {
                                value,
                                x,
                                y,
                                index,
                                width,
                                height,
                                bandwidth: x.bandwidth(),
                            }
                        )) }
                    </Svg>
                </View>
            </View>
        )
    }
}

BarChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.shape({
        fillColor: PropTypes.string,
        strokeColor: PropTypes.string,
        strokeColorNegative: PropTypes.string,
        fillColorNegative: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.number).isRequired,
    })).isRequired,
    style: PropTypes.any,
    strokeColor: PropTypes.string,
    renderGradient: PropTypes.func,
    spacing: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    contentInset: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
    }),
    numberOfTicks: PropTypes.number,
    showGrid: PropTypes.bool,
    gridMin: PropTypes.number,
    gridMax: PropTypes.number,
    extras: PropTypes.array,
    renderExtra: PropTypes.func,
    renderDecorator: PropTypes.func,
}

BarChart.defaultProps = {
    spacing: 0.05,
    width: 100,
    height: 100,
    showZeroAxis: true,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    gridMin: 0,
    gridMax: 0,
    extras: [],
    renderDecorator: () => {
    },
    renderExtra: () => {
    },
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    grid: Constants.gridStyle,
    surface: {
        backgroundColor: 'transparent',
    },
})

export default BarChart
