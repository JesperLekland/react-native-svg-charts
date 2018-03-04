import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'
import Path from '../animated-path'
import Grid from '../grid'

class BarChart extends PureComponent {

    state = {
        width: 0,
        height: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    calcXScale(domain) {
        const {
            horizontal,
            contentInset: {
                left = 0,
                right = 0,
            },
            spacing,
        } = this.props

        const { width } = this.state

        if (horizontal) {
            return scale.scaleLinear()
                .domain(domain)
                .range([ left, width - right ])
        }

        return scale.scaleBand()
            .domain(domain)
            .range([ left, width - right ])
            .paddingInner([ spacing ])
            .paddingOuter([ spacing ])
    }

    calcYScale(domain) {
        const {
            horizontal,
            spacing,
            contentInset: {
                top = 0,
                bottom = 0,
            },
        } = this.props

        const { height } = this.state

        if (horizontal) {
            return scale.scaleBand()
                .domain(domain)
                .range([ top, height - bottom ])
                .paddingInner([ spacing ])
                .paddingOuter([ spacing ])
        }

        return scale.scaleLinear()
            .domain(domain)
            .range([ height - bottom, top ])
    }

    calcAreas(x, y) {
        const { horizontal, data, yAccessor } = this.props

        const values = data.map(item => yAccessor({ item }))

        if (horizontal) {
            return data.map((bar, index) => ({
                bar,
                path: shape.area()
                    .y((value, _index) => _index === 0 ?
                        y(index) :
                        y(index) + y.bandwidth())
                    .x0(x(0))
                    .x1(value => x(value))
                    .defined(value => value)
                    ([ values[ index ], values[ index ] ]),
            }))
        }

        return data.map((bar, index) => ({
            bar,
            path: shape.area()
                .y0(y(0))
                .y1(value => y(value))
                .x((value, _index) => _index === 0 ?
                    x(index) :
                    x(index) + x.bandwidth())
                .defined(value => value)
                ([ values[ index ], values[ index ] ]),
        }))
    }

    calcExtent() {
        const { data, gridMin, gridMax, yAccessor } = this.props
        const values = data.map(obj => yAccessor({ item: obj }))

        return array.extent([ ...values, gridMax, gridMin ])
    }

    calcIndexes() {
        const { data } = this.props
        return data.map((_, index) => index)
    }

    render() {
        const {
            data,
            animate,
            animationDuration,
            style,
            showGrid,
            numberOfTicks,
            gridProps,
            extras,
            renderDecorator,
            renderGrid = Grid,
            svg,
            horizontal,
        } = this.props

        const { height, width } = this.state

        if (data.length === 0) {
            return <View style={style}/>
        }

        const extent = this.calcExtent()
        const indexes = this.calcIndexes()
        const ticks = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        const xDomain = horizontal ? extent : indexes
        const yDomain = horizontal ? indexes : extent

        const x = this.calcXScale(xDomain)
        const y = this.calcYScale(yDomain)

        const bandwidth = horizontal ? y.bandwidth() : x.bandwidth()

        const areas = this.calcAreas(x, y)

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
                                bandwidth,
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
