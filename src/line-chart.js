import React, { Component } from 'react'
import { ART, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'
import * as array from 'd3-array'
import AnimShape from './anim-shape'
import { Constants } from './util'

const {
          Group,
          Surface,
      } = ART

class LineChart extends Component {

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

    render() {

        const {
                  dataPoints,
                  strokeColor,
                  showPoints,
                  dashSize,
                  shadowColor,
                  style,
                  animate,
                  animationDuration,
                  showGrid,
                  numberOfTicks,
                  contentInset: {
                      top    = 0,
                      bottom = 0,
                      left   = 0,
                      right  = 0,
                  },
              } = this.props

        const { width, height } = this.state

        const extent = array.extent([ ...dataPoints, 0 ])
        const ticks  = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        const y = scale.scaleLinear()
            .domain(extent)
            .range([ bottom, height - top ])

        const x = scale.scaleLinear()
            .domain([ 0, dataPoints.length - 1 ])
            .range([ left, width - right ])

        const line = this._createLine(
            dataPoints,
            value => -y(value),
            (value, index) => x(index),
        )

        const shadow = this._createLine(
            dataPoints,
            value => -(y(value) - 3),
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
                                style={[ styles.grid, { bottom: y(tick) } ]}
                            />
                        ))
                    }
                    <Surface width={width} height={height} style={styles.surface}>
                        <Group x={0} y={height}>
                            {
                                shadowColor &&
                                <AnimShape
                                    stroke={shadowColor}
                                    strokeWidth={5}
                                    d={shadow}
                                    animate={animate}
                                    animationDuration={animationDuration}
                                />
                            }
                            <AnimShape
                                stroke={strokeColor}
                                strokeWidth={2}
                                strokeDash={[ dashSize, dashSize ]}
                                d={line}
                                animate={animate}
                                animationDuration={animationDuration}
                            />

                        </Group>
                    </Surface>
                    {showPoints && dataPoints.map((value, index) => {
                        if (typeof value === 'number') {
                            return (
                                <View
                                    style={this._getPointStyle(value, x(index), y(value))}
                                    key={`${index}-${value}`}
                                />
                            )
                        }
                    })}
                </View>
            </View>
        )
    }
}

LineChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    showPoints: PropTypes.bool,
    pointColor: PropTypes.string,
    pointSize: PropTypes.number,
    pointWidth: PropTypes.number,
    dashSize: PropTypes.number,
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
    showGrid: PropTypes.bool,
}

LineChart.defaultProps = {
    strokeColor: '#22B6B0',
    pointWidth: 1,
    pointSize: 4,
    dashSize: 0,
    width: 100,
    height: 100,
    showZeroAxis: true,
    curve: shape.curveCardinal,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    style: { flex: 1 },
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

export default LineChart
