import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'
import * as array from 'd3-array'
import { Constants } from './util'
import Path from './animated-path'
import Svg, { Circle, Line } from 'react-native-svg'

class LineChart extends PureComponent {

    state = {
        width: 0,
        height: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    _createLine(dataPoints, yAccessor, xAccessor) {
        const { curve } = this.props

        return shape.line()
            .x(xAccessor)
            .y(yAccessor)
            .defined(value => typeof value === 'number')
            .curve(curve)
            (dataPoints)
    }

    _getPointStyle(value, x, y) {
        const { pointSize, pointWidth, strokeColor } = this.props
        const { pointColor = strokeColor }           = this.props

        return {
            position: 'absolute',
            left: x - pointSize,
            bottom: y - pointSize,
            height: pointSize * 2,
            width: pointSize * 2,
            borderRadius: pointSize,
            borderWidth: pointWidth,
            backgroundColor: 'white',
            borderColor: value >= 0 ? pointColor : 'red',
        }
    }

    getY(value) {
        return this.y(value)
    }

    getX(index) {
        return this.x(index)
    }

    render() {

        const {
                  dataPoints,
                  strokeColor,
                  showPoints,
                  dashArray,
                  shadowColor,
                  style,
                  animate,
                  animationDuration,
                  showGrid,
                  numberOfTicks,
                  pointSize,
                  contentInset: {
                      top    = 0,
                      bottom = 0,
                      left   = 0,
                      right  = 0,
                  },
                  gridMax,
                  gridMin,
                  intersections,
                  renderIntersection,
                  projections,
              } = this.props

        const { width, height } = this.state

        const extent = array.extent([ ...dataPoints, gridMax, gridMin ])
        const ticks  = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        //invert range to support svg coordinate system
        const y = scale.scaleLinear()
            .domain(extent)
            .range([ height - bottom, top ])

        this.y = y

        const x = scale.scaleLinear()
            .domain([ 0, dataPoints.length - 1 ])
            .range([ left, width - right ])

        this.x = x

        const line = this._createLine(
            dataPoints,
            value => y(value),
            (value, index) => x(index),
        )

        const shadow = this._createLine(
            dataPoints,
            value => y(value) + 3,
            (value, index) => x(index),
        )

        return (
            <View style={style}>
                <View style={{ flex: 1 }} onLayout={event => this._onLayout(event)}>
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
                        <Path
                            d={line}
                            stroke={strokeColor}
                            fill={'none'}
                            strokeWidth={2}
                            strokeDasharray={dashArray}
                            animate={animate}
                            animationDuration={animationDuration}
                        />
                        <Path
                            d={shadow}
                            stroke={shadowColor}
                            fill={'none'}
                            strokeWidth={5}
                            strokeDasharray={dashArray}
                            animate={animate}
                            animationDuration={animationDuration}
                        />
                        {
                            showPoints && dataPoints.map((value, index) => {
                                if (isNaN(value)) {
                                    return
                                }
                                return (
                                    <Circle
                                        key={index}
                                        cx={x(index)}
                                        cy={y(value)}
                                        r={pointSize}
                                        stroke={strokeColor}
                                        fill={'white'}
                                    />
                                )
                            })
                        }
                        {projections.map(({ x1, x2, y1, y2 }, index) => (
                            <Line
                                key={index}
                                x1={x(x1)}
                                x2={x(x2)}
                                y1={y(y1)}
                                y2={y(y2)}
                                stroke={strokeColor}
                                strokeWidth={2}
                            />
                        ))}
                    </Svg>
                    {intersections.map((intersection) => (
                        <View
                            key={intersection}
                            style={[ styles.intersection, { transform: [ { translateY: -y(intersection) } ] } ]}
                        >
                            {renderIntersection(intersection)}
                        </View>
                    ))}
                </View>
            </View>
        )
    }
}

LineChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    showPoints: PropTypes.bool,
    pointColor: PropTypes.string,
    pointSize: PropTypes.number,
    pointWidth: PropTypes.number,
    dashArray: PropTypes.arrayOf(PropTypes.number),
    style: PropTypes.any,
    shadowColor: PropTypes.string,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    curve: PropTypes.func,
    contentInset: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
    }),
    numberOfTicks: PropTypes.number,
    projections: PropTypes.arrayOf(
        PropTypes.shape({
            x1: PropTypes.number,
            x2: PropTypes.number,
            y1: PropTypes.number,
            y2: PropTypes.number,
        })),
    showGrid: PropTypes.bool,
    gridMin: PropTypes.number,
    gridMax: PropTypes.number,
    intersections: PropTypes.arrayOf(PropTypes.number),
    renderIntersection: PropTypes.func,
}

LineChart.defaultProps = {
    strokeColor: '#22B6B0',
    pointWidth: 1,
    pointSize: 4,
    width: 100,
    height: 100,
    showZeroAxis: true,
    curve: shape.curveCardinal,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    gridMin: 0,
    gtidMax: 0,
    intersections: [],
    projections: [],
    renderIntersection: () => {
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
    intersection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
})

export default LineChart
