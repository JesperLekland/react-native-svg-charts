import React, { PureComponent } from 'react'
import { View, Platform } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import Svg, { G, Path } from 'react-native-svg'

class PieChart extends PureComponent {
    state = {
        height: 0,
        width: 0,
    }

    _onLayout(event) {
        const {
            nativeEvent: {
                layout: { height, width },
            },
        } = event

        this.setState({ height, width })
    }

    _calculateRadius(arg, max, defaultVal) {
        if (typeof arg === 'string') {
            return (arg.split('%')[0] / 100) * max
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
            sort,
            valueAccessor,
            children,
            startAngle,
            endAngle,
        } = this.props

        const { height, width } = this.state

        if (!data && dataPoints) {
            throw `"dataPoints" have been renamed to "data" to better reflect the fact that it's an array of objects`
        }

        if (data.length === 0) {
            return <View style={style} />
        }

        const maxRadius = Math.min(width, height) / 2

        if (Math.min(...data.map((obj) => valueAccessor({ item: obj }))) < 0) {
            console.error("don't pass negative numbers to pie-chart, it makes no sense!")
        }

        const _outerRadius = this._calculateRadius(outerRadius, maxRadius, maxRadius)
        const _innerRadius = this._calculateRadius(innerRadius, maxRadius, 0)
        const _labelRadius = this._calculateRadius(labelRadius, maxRadius, _outerRadius)

        if (outerRadius > 0 && _innerRadius >= outerRadius) {
            console.warn('innerRadius is equal to or greater than outerRadius')
        }

        const arcs = data.map((item) => {
            const arc = shape
                .arc()
                .outerRadius(_outerRadius)
                .innerRadius(_innerRadius)
                .padAngle(padAngle) // Angle between sections

            item.arc &&
                Object.entries(item.arc).forEach(([key, value]) => {
                    if (typeof arc[key] === 'function') {
                        if (typeof value === 'string') {
                            arc[key]((value.split('%')[0] / 100) * _outerRadius)
                        } else {
                            arc[key](value)
                        }
                    }
                })

            return arc
        })

        const labelArcs = data.map((item, index) => {
            if (labelRadius) {
                return shape
                    .arc()
                    .outerRadius(_labelRadius)
                    .innerRadius(_labelRadius)
                    .padAngle(padAngle)
            }
            return arcs[index]
        })

        const pieSlices = shape
            .pie()
            .value((d) => valueAccessor({ item: d }))
            .sort(sort)
            .startAngle(startAngle)
            .endAngle(endAngle)(data)

        const slices = pieSlices.map((slice, index) => ({
            ...slice,
            pieCentroid: arcs[index].centroid(slice),
            labelCentroid: labelArcs[index].centroid(slice),
        }))

        const extraProps = {
            width,
            height,
            data,
            slices,
        }

        return (
            <View pointerEvents={'box-none'} style={style}>
                <View pointerEvents={'box-none'} style={{ flex: 1 }} onLayout={(event) => this._onLayout(event)}>
                    {height > 0 && width > 0 && (
                        <Svg pointerEvents={Platform.OS === 'android' && 'box-none'} style={{ height, width }}>
                            {/* center the progress circle*/}
                            <G x={width / 2} y={height / 2}>
                                {React.Children.map(children, (child) => {
                                    if (child && child.props.belowChart) {
                                        return React.cloneElement(child, extraProps)
                                    }
                                    return null
                                })}
                                {pieSlices.map((slice, index) => {
                                    const { key, onPress, svg } = data[index]
                                    return (
                                        <Path
                                            key={key}
                                            onPress={onPress}
                                            {...svg}
                                            d={arcs[index](slice)}
                                            animate={animate}
                                            animationDuration={animationDuration}
                                        />
                                    )
                                })}
                                {React.Children.map(children, (child) => {
                                    if (child && !child.props.belowChart) {
                                        return React.cloneElement(child, extraProps)
                                    }
                                    return null
                                })}
                            </G>
                        </Svg>
                    )}
                </View>
            </View>
        )
    }
}

PieChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            svg: PropTypes.object,
            key: PropTypes.any.isRequired,
            value: PropTypes.number,
            arc: PropTypes.object,
        })
    ).isRequired,
    innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    outerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    labelRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    padAngle: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    style: PropTypes.any,
    sort: PropTypes.func,
    valueAccessor: PropTypes.func,
}

PieChart.defaultProps = {
    width: 100,
    height: 100,
    padAngle: 0.05,
    startAngle: 0,
    endAngle: Math.PI * 2,
    valueAccessor: ({ item }) => item.value,
    innerRadius: '50%',
    sort: (a, b) => b.value - a.value,
}

export default PieChart
