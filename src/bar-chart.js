import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ART, StyleSheet, View } from 'react-native'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'
import * as array from 'd3-array'
import AnimShape from './anim-shape'

const {
          Group,
          Surface,
      } = ART

class BarChart extends Component {

    state = {
        width: 0,
        height: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    render() {

        const {
                  dataPoints,
                  strokeColor,
                  strokeColorNegative,
                  fillColor,
                  fillColorNegative,
                  spacing,
                  animate,
                  animationDuration,
                  yRatio,
                  style,
              } = this.props

        const { height, width } = this.state

        const y = scale.scaleLinear()
            .domain(array.extent(dataPoints))
            .range([ height - (height * yRatio), height * yRatio ])

        // use index as domain identifier instead of value since
        // same value can occur at several places in dataPoints
        const domain = dataPoints.map((_, index) => index)

        const x = scale.scaleBand()
            .domain(domain)
            .range([ 0, width ])
            .paddingInner([ spacing ])
            .paddingOuter([ spacing ])

        const bars = dataPoints.map((point, index) => {
            const area = shape.area()
                .x((point, _index) => _index === 0 ? x(index) : x(index) + x.bandwidth())
                .y0(-y(0))
                .y1(point => -y(point))
                .defined(value => value)
                ([ point, point ])

            return {
                value: point,
                area,
            }
        })

        return (
            <View style={style}>
                <View
                    style={{ flex: 1 }}
                    onLayout={event => this._onLayout(event)}
                >
                    <Surface width={width} height={height}>
                        <Group x={0} y={height}>
                            {bars.map((bar, index) =>
                                <AnimShape
                                    key={index}
                                    stroke={bar.value >= 0 ? strokeColor : strokeColorNegative}
                                    strokeWidth={1}
                                    fill={bar.value >= 0 ? fillColor : fillColorNegative}
                                    d={bar.area}
                                    animate={animate}
                                    animationDuration={animationDuration}
                                />,
                            )}
                        </Group>
                    </Surface>
                    <View style={[ styles.zeroAxis, { bottom: y(0) - 1 } ]}/>
                </View>
            </View>
        )
    }
}

BarChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    style: PropTypes.any,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    spacing: PropTypes.number,
    animate: PropTypes.bool,
    yRatio: PropTypes.number,
    animationDuration: PropTypes.number,
    fillColorNegative: PropTypes.string,
    strokeColorNegative: PropTypes.string,
}

BarChart.defaultProps = {
    fillColor: 'rgba(34, 182, 176, 0.2)',
    fillColorNegative: 'rgba(255, 0, 0, 0.2',
    strokeColor: '#22B6B0',
    strokeColorNegative: '#ff0000',
    pointColor: 'gray',
    spacing: 0.05,
    width: 100,
    height: 100,
    yRatio: 1,
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

export default BarChart
