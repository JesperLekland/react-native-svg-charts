import React, { Component } from 'react'
import { ART, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'
import AnimShape from './anim-shape'
import * as array from 'd3-array'

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

        const {
                  dataPoints,
                  strokeColor,
                  fillColor,
                  showPoints,
                  animate,
                  animationDuration,
                  style,
                  showZeroAxis,
              } = this.props

        const { height, width } = this.state

        const extent = array.extent([ ...dataPoints, 0 ])

        const y = scale.scaleLinear()
            .domain(extent)
            .range([ 10, height - 10 ])

        const x = scale.scaleLinear()
            .domain([ 0, dataPoints.length - 1 ])
            .range([ 0, width ])

        const area = shape.area()
            .x((d, index) => x(index))
            .y0(-y(0))
            .y1(d => -y(d))
            .defined(value => typeof value === 'number')
            .curve(shape.curveCardinal)
            (dataPoints)

        return (
            <View style={style}>
                <View
                    style={{ flex: 1 }}
                    onLayout={event => this._onLayout(event)}
                >
                    <Surface width={width} height={height}>
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
                    {showZeroAxis && <View style={[ styles.zeroAxis, { bottom: y(0) - 1 } ]}/>}
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
    showZeroAxis: PropTypes.bool,
}

AreaChart.defaultProps = {
    fillColor: 'rgba(34, 182, 176, 0.2)',
    strokeColor: '#22B6B0',
    pointColor: 'rgb(34, 182, 176)',
    pointWidth: 1,
    pointSize: 4,
    width: 100,
    height: 100,
    showZeroAxis: true,
}

const styles = StyleSheet.create({
    zeroAxis: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        // backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundColor: 'black',
    },
})

export default AreaChart
