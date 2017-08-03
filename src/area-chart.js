import React, { Component } from 'react'
import { ART, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'
import AnimShape from './anim-shape'
import * as array from 'd3-array'
import { Constants } from './util'

const {
          Group,
          Surface,
      } = ART

class AreaChart extends Component {

    state = {
        height: 0,
        width: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
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
                  fillColor,
                  showPoints,
                  animate,
                  animationDuration,
                  style,
                  curve,
                  showGrid,
                  numberOfTicks,
                  contentInset: {
                      top    = 0,
                      bottom = 0,
                      left   = 0,
                      right  = 0,
                  },
              } = this.props

        const { height, width } = this.state

        const extent = array.extent([ ...dataPoints, 0 ])
        const ticks  = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        const y = scale.scaleLinear()
            .domain(extent)
            .range([ bottom, height - top ])

        const x = scale.scaleLinear()
            .domain([ 0, dataPoints.length - 1 ])
            .range([ left, width - right ])

        const area = shape.area()
            .x((d, index) => x(index))
            .y0(-y(0))
            .y1(d => -y(d))
            .defined(value => typeof value === 'number')
            .curve(curve)
            (dataPoints)

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
                                style={[ styles.grid, { bottom: y(tick) } ]}
                            />
                        ))
                    }
                    <Surface width={width} height={height} style={styles.surface}>
                        <Group x={0} y={height}>
                            <AnimShape
                                stroke={strokeColor}
                                strokeWidth={2}
                                fill={fillColor}
                                d={area}
                                animate={animate}
                                animationDuration={animationDuration}
                            />
                        </Group>
                    </Surface>
                    {
                        showPoints &&
                        dataPoints.map((value, index) => {
                            if (typeof value === 'number') {
                                return (
                                    <View
                                        style={this._getPointStyle(value, x(index), y(value))}
                                        key={index}
                                    />
                                )
                            }
                            return <View key={index}/>
                        },
                    )}
                </View>
            </View>
        )
    }
}

AreaChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    showPoints: PropTypes.bool,
    pointColor: PropTypes.string,
    pointSize: PropTypes.number,
    pointWidth: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    style: PropTypes.any,
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

AreaChart.defaultProps = {
    fillColor: 'rgba(34, 182, 176, 0.2)',
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

export default AreaChart
