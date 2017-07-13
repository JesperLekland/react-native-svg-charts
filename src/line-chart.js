import React, { Component } from 'react'
import { ART, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'
import * as array from 'd3-array'
import AnimShape from './anim-shape'

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
        return shape.line()
            .x(xAccessor)
            .y(yAccessor)
            .defined(value => typeof value === 'number')
            .curve(shape.curveNatural)
            (dataPoints)
    }

    _getPointStyle(value, x, y) {
        const { pointSize, pointWidth, pointColor } = this.props

        return {
            position: 'absolute',
            left: x - pointSize,
            bottom: y - pointSize,
            height: pointSize * 2,
            width: pointSize * 2,
            borderRadius: pointSize,
            borderWidth: pointWidth,
            // backgroundColor: value >= 0 ? pointColor : 'red',
            borderColor: value >= 0 ? pointColor : 'red',
        }
    }

    render() {

        let {
                dataPoints,
                strokeColor,
                showPoints,
                dashSize,
                shadowColor,
                style,
                yRatio,
                animate,
                animationDuration,
                showZeroAxis,
            } = this.props

        const { width, height } = this.state

        const y = scale.scaleLinear()
            .domain(array.extent(dataPoints))
            .range([ height - (height * yRatio), height * yRatio ])

        const x = scale.scaleLinear()
            .domain([ 0, dataPoints.length - 1 ])
            .range([ 0, width ])

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
                    <Surface width={width} height={height}>
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
                    {showZeroAxis && <View style={[ styles.zeroAxis, { bottom: y(0) - 1 } ]}/>}
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
    yRatio: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    showZeroAxis: PropTypes.bool,
}

LineChart.defaultProps = {
    strokeColor: '#22B6B0',
    pointColor: '#22B6B0',
    pointWidth: 1,
    pointSize: 4,
    dashSize: 0,
    width: 100,
    height: 100,
    yRatio: 1,
    showZeroAxis: true,
}

const styles = StyleSheet.create({
    zeroAxis: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: 'black',
    },
})

export default LineChart
