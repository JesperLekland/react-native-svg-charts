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

    _onLabelLayout(event, key) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({
            [`labelHeight_${key}`]: height,
            [`labelWidth_${key}`]: width,
        })
    }

    render() {
        const {
                  dataPoints,
                  innerRadius,
                  padAngle,
                  animate,
                  animationDuration,
                  style,
                  renderLabel,
                  labelDistance,
              } = this.props

        const { height, width } = this.state

        const outerRadius  = Math.min(width, height) / 2
        const _innerRadius = innerRadius >= 0 ? innerRadius : outerRadius / 2

        dataPoints.forEach(point => {
            if (point.value < 0) {
                console.warn('don\'t pass negative numbers to pie-chart')
            }
        })

        if (outerRadius > 0 && _innerRadius >= outerRadius) {
            console.warn('innerRadius is equal to or greater than outerRadius')
        }

        const pieSlices = shape
            .pie()
            .value(d => d.value)
            (dataPoints)

        const labelArc = shape.arc()
            .outerRadius(outerRadius + labelDistance)
            .innerRadius(outerRadius + labelDistance)

        const arc = shape.arc()
            .outerRadius(outerRadius * 0.9)  // Radius of the pie
            .innerRadius(_innerRadius * 0.9)  // Inner radius: to create a donut or pie
            .padAngle(padAngle) // Angle between sections

        const shapes = pieSlices.map((slice, index) => ({
            point: dataPoints[ index ],
            label: { translate: labelArc.centroid(slice) },
            path: arc(slice),
        }))

        return (
            <View style={style}>
                <View
                    style={{ flex: 1 }}
                    onLayout={event => this._onLayout(event)}
                >
                <Surface width={width} height={height}>
                    <Group x={width / 2} y={height / 2}>
                        {shapes.map((shape) => {
                            const { path, point: { key, color } } = shape
                            return (
                                <AnimShape
                                    key={key}
                                    fill={color}
                                    d={path}
                                    animate={animate}
                                    animationDuration={animationDuration}
                                />
                            )
                        })}
                    </Group>
                </Surface>
                    {shapes.map((shape, index) => {
                        const { label: { translate }, point } = shape
                        const { key }                         = point
                        return (
                            <View
                                key={key}
                                onLayout={event => this._onLabelLayout(event, index)}
                                style={{
                                    top: (height / 2) - this.state[ `labelHeight_${index}` ] / 2,
                                    left: width / 2 - this.state[ `labelWidth_${index}` ] / 2,
                                    position: 'absolute',
                                    transform: [ { translate } ],
                                }}
                            >
                                {renderLabel(point)}
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}

PieChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
    })).isRequired,
    innerRadius: PropTypes.number,
    padAngle: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    style: PropTypes.any,
    renderLabel: PropTypes.func,
    labelDistance: PropTypes.number,
}

PieChart.defaultProps = {
    width: 100,
    height: 100,
    padAngle: 0.05,
    labelDistance: 10,
    renderLabel: () => <View/>,
}

export default PieChart
