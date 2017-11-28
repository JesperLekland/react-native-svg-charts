import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import Svg, { G, Path } from 'react-native-svg'

class PieChart extends PureComponent {

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

    _calculateRadius(arg, max, defaultVal) {
        if (typeof arg === 'string') {
            return (arg.split('%')[ 0 ] / 100) * max
        } else if (arg) {
            return arg
        } else {
            return defaultVal
        }
    }

    render() {
        const {
                  data,
                  dataPoints,
                  innerRadius,
                  outerRadius,
                  labelRadius,
                  padAngle,
                  animate,
                  animationDuration,
                  style,
                  renderDecorator,
                  sort,
              } = this.props

        const { height, width } = this.state

        if (!data && dataPoints) {
            throw `"dataPoints" have been renamed to "data" to better reflect the fact that it's an array of  objects`
        }

        if (data.length === 0) {
            return <View style={ style }/>
        }

        const maxRadius = Math.min(width, height) / 2

        if (Math.min(...data.map(obj => obj.value)) < 0) {
            console.error('don\'t pass negative numbers to pie-chart, it makes no sense!')
        }

        const _outerRadius = this._calculateRadius(outerRadius, maxRadius, maxRadius)
        const _innerRadius = this._calculateRadius(innerRadius, maxRadius, 0)
        const _labelRadius = this._calculateRadius(labelRadius, maxRadius, _outerRadius)

        if (outerRadius > 0 && _innerRadius >= outerRadius) {
            console.warn('innerRadius is equal to or greater than outerRadius')
        }

        const arc = shape.arc()
            .outerRadius(_outerRadius)
            .innerRadius(_innerRadius)
            .padAngle(padAngle) // Angle between sections

        const labelArc = labelRadius ?
                         shape.arc()
                             .outerRadius(_labelRadius)
                             .innerRadius(_labelRadius)
                             .padAngle(padAngle) :
                         arc

        const pieSlices = shape.pie()
            .value(d => d.value)
            .sort(sort)
            (data)

        return (
            <View style={style}>
                <View
                    style={{ flex: 1 }}
                    onLayout={event => this._onLayout(event)}
                >
                    <Svg style={{ flex: 1 }}>
                        <G x={width / 2} y={height / 2}>
                            { pieSlices.map((slice, index) => {
                                const { key, color } = data[ index ]
                                return (
                                    <Path
                                        key={key}
                                        fill={color}
                                        d={ arc(slice) }
                                        animate={animate}
                                        animationDuration={animationDuration}
                                    />
                                )
                            })}
                            { pieSlices.map((slice, index) => renderDecorator({
                                index,
                                item: data[ index ],
                                height,
                                width,
                                pieCentroid: arc.centroid(slice),
                                labelCentroid: labelArc.centroid(slice),
                            })) }
                        </G>
                    </Svg>
                </View>
            </View>
        )
    }
}

PieChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        color: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
    })).isRequired,
    innerRadius: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    outerRadius: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    labelRadius: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    padAngle: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    style: PropTypes.any,
    renderDecorator: PropTypes.func,
    sort: PropTypes.func,
}

PieChart.defaultProps = {
    width: 100,
    height: 100,
    padAngle: 0.05,
    innerRadius: '50%',
    sort: (a, b) => b.value - a.value,
    renderDecorator: () => {
    },
}

export default PieChart
