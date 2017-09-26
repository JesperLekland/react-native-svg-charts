import React, { PureComponent } from 'react'
import { ART, Platform, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'
import AnimShape from './anim-shape'
import * as array from 'd3-array'
import { Constants } from './util'

const {
          Group,
          Surface,
          LinearGradient,
      } = ART

class AreaChart extends PureComponent {

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
                  gridMin,
                  gridMax,
                  intersections,
                  renderIntersection,
              } = this.props

        const { height, width } = this.state

        const extent = array.extent([ ...dataPoints, gridMin, gridMax ])
        const ticks  = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        const y = scale.scaleLinear()
            .domain(extent)
            .range([ bottom, height - top ])

        this.y = y

        const x = scale.scaleLinear()
            .domain([ 0, dataPoints.length - 1 ])
            .range([ left, width - right ])

        this.x = x

        const area = shape.area()
            .x((d, index) => x(index))
            .y0(-y(0))
            .y1(d => -y(d))
            .defined(value => typeof value === 'number')
            .curve(curve)
            (dataPoints)

        const line = shape.line()
            .x((d, index) => x(index))
            .y(d => -y(d))
            .defined(value => typeof value === 'number')
            .curve(curve)
            (dataPoints)

        /*
        * TODO - this is a proof of concept of a working gradient.
        * TODO Think of a good API and make sure it works on both platforms.
        * TODO Maybe use https://github.com/react-native-community/react-native-svg?
        * */

        // const zeroAxis = height === 0 ? 0 : 1 - (y(0) / height)

        // const fill = Platform.OS === 'ios' ?
        //     new LinearGradient(
        //         {
        //             '0.0': 'rgba(34, 182, 176)',
        //             [`${zeroAxis}`]: 'rgba(34, 182, 176, 0.5)',
        //             [`${zeroAxis + 0.001}`]: 'rgba(255,0,0,0.5)',
        //             '1': 'red',
        //         },
        //         '0', `-${height}`, `0`, `0`,
        //         // `${width / 2}`, `${height / -2}`, `${width}`, `${height / 2}`,
        //     ) :
        //     fillColor

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
                                fill={fillColor}
                                d={area}
                                animate={animate}
                                animationDuration={animationDuration}
                            />
                            <AnimShape
                                strokeWidth={2}
                                stroke={strokeColor}
                                d={line}
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
    gridMin: PropTypes.number,
    gridMax: PropTypes.number,
    intersections: PropTypes.arrayOf(PropTypes.number),
    renderIntersection: PropTypes.func,
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
    gridMin: 0,
    gridMax: 0,
    intersections: [],
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

export default AreaChart
