import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import Svg, { G, Path, Line } from 'react-native-svg'

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

    render() {
        const {
                  dataPoints,
                  innerRadius,
                  padAngle,
                  animate,
                  animationDuration,
                  style,
                  renderLabel,
                  labelSpacing = 0,

              } = this.props

        const { height, width } = this.state

        const maxRadius = Math.min(width, height) / 2

        if (Math.min(...dataPoints) < 0) {
            console.warn('don\'t pass negative numbers to pie-chart')
        }

        const pieOuterRadius = maxRadius - labelSpacing
        const pieInnerRadius = pieOuterRadius * innerRadius

        if (pieOuterRadius > 0 && pieInnerRadius >= pieOuterRadius) {
            console.warn('innerRadius is equal to or greater than outerRadius')
        }

        const labelOuterRadius = maxRadius
        const labelInnerRadius = labelSpacing > 0 ? pieOuterRadius : pieInnerRadius

        const arc = shape.arc()
            .outerRadius(pieOuterRadius)
            .innerRadius(pieInnerRadius)
            .padAngle(padAngle) // Angle between sections

        const labelArc = shape.arc()
            .outerRadius(labelOuterRadius)
            .innerRadius(labelInnerRadius)

        const pieSlices = shape.pie()
            .value(d => d.value)
            (dataPoints)

        const shapes = pieSlices.map((slice, index) => ({
            point: dataPoints[ index ],
            path: arc(slice),
        }))
        
        const links = pieSlices.map((d,i)=>{
            let source = arc.centroid(d)
            let target = labelArc.centroid(d)
            let color = dataPoints[ i ].color
            return (
                <Line
                    key={i}
                    x1={source[0]}
                    y1={source[1]}
                    x2={target[0]}
                    y2={target[1]}
                    stroke={color}
                />
            )
        })

        const labels = pieSlices.map((slice, index) => ({
            point: dataPoints[ index ],
            translate: labelArc.centroid(slice),
        }))

        return (
            <View style={style}>
                <View
                    style={{ flex: 1 }}
                    onLayout={event => this._onLayout(event)}
                >
                    <Svg style={{ flex: 1 }}>
                        <G x={width / 2} y={height / 2}>
                            {links}
                            {shapes.map((shape) => {
                                const { path, point: { key, color } } = shape
                                return (
                                    <Path
                                        key={key}
                                        fill={color}
                                        d={path}
                                        animate={animate}
                                        animationDuration={animationDuration}
                                        onPress={() => console.log(shape)}
                                    />
                                )
                            })}
                        </G>
                    </Svg>
                    {labels.map((label, index) => {
                        const { point } = label
                        const { key }   = point

                        //Translate center of label - hence the width and height divided by 2
                        const translate = [
                            label.translate[ 0 ] - (this.state[ `labelWidth_${index}` ] / 2 || 0),
                            label.translate[ 1 ] - (this.state[ `labelHeight_${index}` ] / 2 || 0),
                        ]

                        return (
                            <View
                                key={key}
                                onLayout={event => this._onLabelLayout(event, index)}
                                style={{
                                    top: (height / 2),
                                    left: (width / 2),
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
    outerRadius: PropTypes.number,
    padAngle: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    style: PropTypes.any,
    renderLabel: PropTypes.func,
    labelDistance: PropTypes.number,
    labelSpacing: PropTypes.number,
}

PieChart.defaultProps = {
    width: 100,
    height: 100,
    padAngle: 0.05,
    labelSpacing: 0,
    innerRadius: 0.5,
    renderLabel: () => <View/>,
}

export default PieChart
