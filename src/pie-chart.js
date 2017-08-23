import React, { PureComponent } from 'react'
import { ART, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import AnimShape from './anim-shape'

const {
          Group,
          Surface,
      } = ART

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
                <Surface width={width} height={height} style={styles.surface}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    surface: {
        backgroundColor: 'transparent',
    },
})

export default PieChart
