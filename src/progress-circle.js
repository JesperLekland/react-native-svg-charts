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
            backgroundColor,
            strokeWidth,
            startAngle,
            endAngle,
            animate,
            animateDuration,
            extras,
        } = this.props

        let { progress } = this.props

        const { height, width } = this.state

        const outerDiameter = Math.min(width, height)

        if (!isFinite(progress) || isNaN(progress)) {
            progress = 0
        }

        const data = [
            {
                key: 'rest',
                value: 1 - progress,
                color: backgroundColor,
            },
            {
                key: 'progress',
                value: progress,
                color: progressColor,
            },
        ]

        const pieSlices = shape
            .pie()
            .startAngle(startAngle)
            .endAngle(endAngle)
            (data.map(d => d.value))

        const arcs = pieSlices.map((slice, index) => (
            {
                ...data[ index ],
                ...slice,
                path: shape.arc()
                    .outerRadius(outerDiameter / 2)  // Radius of the pie
                    .innerRadius((outerDiameter / 2) - strokeWidth)  // Inner radius: to create a donut or pie
                    .startAngle(index === 0 ? startAngle : slice.startAngle)
                    .endAngle(index === 0 ? endAngle : slice.endAngle)
                    .cornerRadius(45)
                    (),
            }
        ))

        const x = width / 2
        const y = height / 2

        const extraData = {
            width,
            height,
            x,
            y,
        }

        return (
            <View
                style={ style }
                onLayout={ event => this._onLayout(event) }
            >
                <Svg style={{ flex: 1 }}>
                    <G
                        x={ x }
                        y={ y }
                    >
                        {arcs.map((shape, index) => {
                            return (
                                <Path
                                    key={ index }
                                    fill={ shape.color }
                                    d={ shape.path }
                                    animate={ animate }
                                    animationDuration={ animateDuration }
                                />
                            )
                        })}
                        {extras.map((item, index) => item({ ...extraData, index }))}
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
    backgroundColor: PropTypes.any,
    strokeWidth: PropTypes.number,
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    animate: PropTypes.bool,
    animateDuration: PropTypes.number,
    extras: PropTypes.arrayOf(PropTypes.func),
}

ProgressCircle.defaultProps = {
    progressColor: 'black',
    backgroundColor: '#ECECEC',
    strokeWidth: 5,
    startAngle: 0,
    endAngle: Math.PI * 2,
    extras: [],
}

export default ProgressCircle
