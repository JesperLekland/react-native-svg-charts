import React, { Component } from 'react'
import { ART, View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import AnimShape from './anim-shape'

const {
          Group,
          Surface,
      } = ART

class PieChart extends Component {

    state = {
        height: 0,
        width: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    render() {
        const {
                  dataPoints,
                  innerRadius,
                  padAngle,
                  animate,
                  animationDuration,
                  style,
              } = this.props

        const { height, width } = this.state

        const outerDiameter = Math.min(width, height)

        const data = dataPoints.filter(point => point.name)

        const pieSlices = shape
            .pie()
            .sort(null)
            (data.map(d => d.value))

        const shapes = data.map((dataPoint, index) => ({
            ...dataPoint,
            path: shape.arc()
                .outerRadius(outerDiameter / 2)  // Radius of the pie
                .innerRadius(innerRadius || outerDiameter / 4)  // Inner radius: to create a donut or pie
                .padAngle(padAngle)    // Angle between sections
                (pieSlices[ index ]),
        }))

        return (
            <View
                style={style}
                onLayout={event => this._onLayout(event)}
            >
                <Surface width={width} height={height}>
                    <Group x={width / 2} y={height / 2}>
                        {shapes.map(shape => {
                            return (
                                <AnimShape
                                    key={shape.name}
                                    fill={shape.color}
                                    d={shape.path}
                                    animate={animate}
                                    animationDuration={animationDuration}
                                />
                            )
                        })}
                    </Group>
                </Surface>
            </View>
        )
    }
}

PieChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.shape({
        // value: PropTypes.number.isRequired,
        // color: PropTypes.string.isRequired,
    })).isRequired,
    innerRadius: PropTypes.number,
    padAngle: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    style: PropTypes.any,
}

PieChart.defaultProps = {
    width: 100,
    height: 100,
    padAngle: 0.05,
}

export default PieChart
