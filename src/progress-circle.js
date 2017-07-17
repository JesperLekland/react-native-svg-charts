import React, { Component } from 'react'
import { ART, View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import AnimShape from './anim-shape'

const {
          Group,
          Surface,
      } = ART

class ProgressCircle extends Component {

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
                  progress,
                  style,
                  progressColor,
              } = this.props

        const { height, width } = this.state

        const outerDiameter = Math.min(width, height)
        const data          = [
            {
                key: 'progress',
                value: progress,
                color: progressColor,
            },
            {
                key: 'rest',
                value: 1 - progress,
                color: '#ECECEC',
            },
        ]

        const pieSlices = shape
            .pie()
            .sort(null)
            (data.map(d => d.value))

        const shapes = data.map((dataPoint, index) => ({
            ...dataPoint,
            path: shape.arc()
                .outerRadius(outerDiameter / 2)  // Radius of the pie
                .innerRadius((outerDiameter / 2) - 5)  // Inner radius: to create a donut or pie
                .padAngle(0)    // Angle between sections
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
                                    key={shape.key}
                                    fill={shape.color}
                                    d={shape.path}
                                />
                            )
                        })}
                    </Group>
                </Surface>
            </View>
        )
    }
}

ProgressCircle.propTypes = {
    progress: PropTypes.number.isRequired,
    innerRadius: PropTypes.number,
    padAngle: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    style: PropTypes.any,
    progressColor: PropTypes.any,
}

ProgressCircle.defaultProps = {
    progressColor: '#22B6B0',
    width: 100,
    height: 100,
    padAngle: 0.05,
}

export default ProgressCircle
