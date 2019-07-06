import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'
import Path from '../animated-path'

class BarChart extends PureComponent {
    static extractDataPoints(data, keys, order = shape.stackOrderNone, offset = shape.stackOffsetNone) {
        const series = shape
            .stack()
            .keys(keys)
            .order(order)
            .offset(offset)(data)

        //double merge arrays to extract just the values
        return array.merge(array.merge(series))
    }

    state = {
        width: 0,
        height: 0,
    }

    _onLayout(event) {
        const {
            nativeEvent: {
                layout: { height, width },
            },
        } = event
        this.setState({ height, width })
    }

    calcXScale(domain) {
        const { data } = this.props

        const {
            horizontal,
            contentInset: { left = 0, right = 0 },
            spacingInner,
            spacingOuter,
        } = this.props

        const { width } = this.state

        if (horizontal) {
            return scale
                .scaleLinear()
                .domain(domain)
                .range([left, width - right])
        }

        // use index as domain identifier instead of value since
        // domain must be same length as number of bars
        // same value can occur at several places in data
        return scale
            .scaleBand()
            .domain(data.map((_, index) => index))
            .range([left, width - right])
            .paddingInner([spacingInner])
            .paddingOuter([spacingOuter])
    }

    calcYScale(domain) {
        const { data } = this.props

        const {
            horizontal,
            contentInset: { top = 0, bottom = 0 },
            spacingInner,
            spacingOuter,
        } = this.props

        const { height } = this.state

        if (horizontal) {
            return scale
                .scaleBand()
                .domain(data.map((_, index) => index))
                .range([top, height - bottom])
                .paddingInner([spacingInner])
                .paddingOuter([spacingOuter])
        }

        return scale
            .scaleLinear()
            .domain(domain)
            .range([height - bottom, top])
    }

    calcAreas(x, y, series) {
        const { horizontal, colors, keys } = this.props

        if (horizontal) {
            return array.merge(
                series.map((serie, keyIndex) => {
                    return serie.map((entry, entryIndex) => {
                        const path = shape
                            .area()
                            .x0((d) => x(d[0]))
                            .x1((d) => x(d[1]))
                            .y((d, _index) => (_index === 0 ? y(entryIndex) : y(entryIndex) + y.bandwidth()))
                            .defined((d) => !isNaN(d[0]) && !isNaN(d[1]))([entry, entry])

                        return {
                            path,
                            color: colors[keyIndex],
                            key: keys[keyIndex],
                        }
                    })
                })
            )
        }

        return array.merge(
            series.map((serie, keyIndex) => {
                return serie.map((entry, entryIndex) => {
                    const path = shape
                        .area()
                        .y0((d) => y(d[0]))
                        .y1((d) => y(d[1]))
                        .x((d, _index) => (_index === 0 ? x(entryIndex) : x(entryIndex) + x.bandwidth()))
                        .defined((d) => !isNaN(d[0]) && !isNaN(d[1]))([entry, entry])

                    return {
                        path,
                        color: colors[keyIndex],
                        key: keys[keyIndex],
                    }
                })
            })
        )
    }

    calcExtent(values) {
        const { gridMax, gridMin } = this.props

        return array.extent([...values, gridMin, gridMax])
    }

    calcIndexes(values) {
        return values.map((_, index) => index)
    }

    getSeries() {
        const { data, keys, offset, order, valueAccessor } = this.props

        return shape
            .stack()
            .keys(keys)
            .value((item, key) => valueAccessor({ item, key }))
            .order(order)
            .offset(offset)(data)
    }

    render() {
        const { data, animate, animationDuration, style, numberOfTicks, children, horizontal } = this.props

        const { height, width } = this.state

        if (data.length === 0) {
            return <View style={style} />
        }

        const series = this.getSeries()

        //double merge arrays to extract just the values
        const values = array.merge(array.merge(series))
        const indexes = this.calcIndexes(values)

        const extent = this.calcExtent(values)
        const ticks = array.ticks(extent[0], extent[1], numberOfTicks)

        const xDomain = horizontal ? extent : indexes
        const yDomain = horizontal ? indexes : extent

        const x = this.calcXScale(xDomain)
        const y = this.calcYScale(yDomain)

        const bandwidth = horizontal ? y.bandwidth() : x.bandwidth()

        const areas = this.calcAreas(x, y, series)

        const extraProps = {
            x,
            y,
            width,
            height,
            ticks,
            data,
            bandwidth,
        }

        return (
            <View style={style}>
                <View style={{ flex: 1 }} onLayout={(event) => this._onLayout(event)}>
                    {height > 0 && width > 0 && (
                        <Svg style={{ height, width }}>
                            {React.Children.map(children, (child) => {
                                if (child && child.props.belowChart) {
                                    return React.cloneElement(child, extraProps)
                                }
                                return null
                            })}
                            {areas.map((bar, index) => {
                                const keyIndex = index % data.length
                                const key = `${keyIndex}-${bar.key}`
                                const { svg } = data[keyIndex][bar.key]

                                return (
                                    <Path
                                        key={key}
                                        fill={bar.color}
                                        {...svg}
                                        d={bar.path}
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
                        </Svg>
                    )}
                </View>
            </View>
        )
    }
}

BarChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    offset: PropTypes.func,
    order: PropTypes.func,
    style: PropTypes.any,
    spacingInner: PropTypes.number,
    spacingOuter: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    contentInset: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
    }),
    gridMin: PropTypes.number,
    gridMax: PropTypes.number,
    valueAccessor: PropTypes.func,
}

BarChart.defaultProps = {
    spacingInner: 0.05,
    spacingOuter: 0.05,
    offset: shape.stackOffsetNone,
    order: shape.stackOrderNone,
    width: 100,
    height: 100,
    showZeroAxis: true,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    valueAccessor: ({ item, key }) => item[key],
}

export default BarChart
