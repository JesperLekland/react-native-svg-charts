import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'
import Path from './animated-path'
import Grid from './grid'

class BarChart extends PureComponent {

    state = {
        width: 0,
        height: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    _getBar(value, x, y, barIndex, valueIndex, barWidth) {
        return {
            value,
            area: shape.area()
            // place the bar on the x-axis based on valueIndex + its index among the other bars in its group
                .y((point, _index) =>
                    _index === 0 ?
                        y(valueIndex) + (barWidth * barIndex) :
                        y(valueIndex) + barWidth + (barWidth * barIndex),
                )
                .x0(x(0))
                .x1(point => x(point))
                .defined(value => value)
                ([ value, value ]),
        }
    }

    render() {
        const {
            data,
            dataPoints,
            spacing,
            animate,
            animationDuration,
            style,
            showGrid,
            renderGradient,
            numberOfTicks,
            contentInset: {
                top = 0,
                bottom = 0,
                left = 0,
                right = 0,
            },
            gridMax,
            gridMin,
            gridProps,
            extras,
            renderExtra,
            renderDecorator,
            renderGrid = Grid,
            yAccessor,
            svg,
        } = this.props

        const { height, width } = this.state

        if (data.length === 0) {
            return <View style={style}/>
        }

        const values = data.map(obj => yAccessor({ item: obj }))

        const extent = array.extent([ ...values, gridMax, gridMin ])
        const ticks = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        //invert range to support svg coordinate system
        const x = scale.scaleLinear()
            .domain(extent)
            .range([ left, width - right ])

        // use index as domain identifier instead of value since
        // same value can occur at several places in data
        const y = scale.scaleBand()
            .domain(values.map((_, index) => index))
            .range([ top, height - bottom ])
            .paddingInner([ spacing ])
            .paddingOuter([ spacing ])

        const barWidth = y.bandwidth()

        const areas = data.map((bar, index) => ({
            bar,
            path: shape.area()
                .y((point, _index) =>
                    _index === 0 ?
                        y(index) :
                        y(index) + barWidth,
                )
                .x0(x(0))
                .x1(point => x(point))
                .defined(value => value)
                ([ values[ index ], values[ index ] ]),
        }))

        return (
            <View style={style}>
                <View
                    style={{ flex: 1 }}
                    onLayout={event => this._onLayout(event)}
                >
                    <Svg style={{ flex: 1 }}>
                        {showGrid && renderGrid({ x, y, ticks, data, gridProps })}
                        {
                            areas.map((area, index) => {

                                const { bar: { svg: barSvg = {} }, path } = area

                                return (
                                    <Path
                                        key={index}
                                        fill={'black'}
                                        {...svg}
                                        {...barSvg}
                                        d={path || null}
                                        animate={animate}
                                        animationDuration={animationDuration}
                                    />
                                )
                            })
                        }

                        {data.map((item, index) => renderDecorator(
                            {
                                item,
                                x,
                                y,
                                index,
                                bandwidth: y.bandwidth(),
                            }
                        ))}
                        {extras.map((extra, index) => extra({ item: extra, x, y, index, width, height }))}
                    </Svg>
                </View>
            </View>
        )
    }
}

BarChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
    ])).isRequired,
    style: PropTypes.any,
    renderGradient: PropTypes.func,
    spacing: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    contentInset: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
    }),
    numberOfTicks: PropTypes.number,
    showGrid: PropTypes.bool,
    gridMin: PropTypes.number,
    gridMax: PropTypes.number,
    gridProps: PropTypes.object,
    extras: PropTypes.array,
    renderDecorator: PropTypes.func,
    renderGrid: PropTypes.func,
    svg: PropTypes.object,
}

BarChart.defaultProps = {
    spacing: 0.05,
    width: 100,
    height: 100,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    extras: [],
    svg: {},
    renderDecorator: () => {
    },
    yAccessor: ({ item }) => item,
}

export default BarChart
