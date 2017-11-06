import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import Path from './animated-path'
import Svg, { G } from 'react-native-svg'

class ProgressCircle extends PureComponent {

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
                  style,
                  progressColor,
                  startAngle,
                  endAngle,
                  animate,
                  animateDuration,
              } = this.props

        let { progress } = this.props

        const { height, width } = this.state

        const outerDiameter = Math.min(width, height)

        if (!isFinite(progress) || isNaN(progress)) {
            progress = 0
        }

        const data = [
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
            .startAngle(startAngle)
            .endAngle(endAngle)
            (data.map(d => d.value))

        const arcs = pieSlices.map((slice, index) => (
            {
                ...data[ index ],
                ...slice,
                path: shape.arc()
                    .outerRadius(outerDiameter / 2)  // Radius of the pie
                    .innerRadius((outerDiameter / 2) - 5)  // Inner radius: to create a donut or pie
                    .startAngle(slice.startAngle)
                    .endAngle(slice.endAngle)
                    .cornerRadius(45)
                    (),
            }
        ))

        return (
            <View
                style={style}
                onLayout={event => this._onLayout(event)}
            >
                <Svg style={{ flex: 1 }}>
                    <G
                        x={width / 2}
                        y={height / 2}
                    >
                        {arcs.map((shape, index) => {
                            return (
                                <Path
                                    key={index}
                                    fill={shape.color}
                                    d={shape.path}
                                    onPress={() => console.log(shape)}
                                    animate={animate}
                                    animationDuration={animateDuration}
                                />
                            )
                        })}
                    </G>
                </Svg>
            </View>
        )
    }
}

ProgressCircle.propTypes = {
    progress: PropTypes.number.isRequired,
    style: PropTypes.any,
    progressColor: PropTypes.any,
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    animate: PropTypes.bool,
    animateDuration: PropTypes.number,
}

ProgressCircle.defaultProps = {
    progressColor: '#22B6B0',
    startAngle: 0,
    endAngle: Math.PI * 2,
}

export default ProgressCircle
