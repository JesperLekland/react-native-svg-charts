function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object)
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object)
        if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })
        keys.push.apply(keys, symbols)
    }
    return keys
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {}
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key])
            })
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
            })
        }
    }
    return target
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true })
    } else {
        obj[key] = value
    }
    return obj
}

import PropTypes from 'prop-types'
import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import BarChart from './bar-chart'

class GroupedBarChart extends BarChart {
    calcXScale(domain) {
        const {
            horizontal,
            contentInset: { left = 0, right = 0 },
            spacingInner,
            spacingOuter,
            clamp,
        } = this.props
        const { width } = this.state

        if (horizontal) {
            return scale
                .scaleLinear()
                .domain(domain)
                .range([left, width - right])
                .clamp(clamp)
        }

        return scale
            .scaleBand()
            .domain(domain)
            .range([left, width - right])
            .paddingInner([spacingInner])
            .paddingOuter([spacingOuter])
    }

    calcYScale(domain) {
        const {
            horizontal,
            spacingInner,
            spacingOuter,
            contentInset: { top = 0, bottom = 0 },
            clamp,
        } = this.props
        const { height } = this.state

        if (horizontal) {
            return scale
                .scaleBand()
                .domain(domain)
                .range([top, height - bottom])
                .paddingInner([spacingInner])
                .paddingOuter([spacingOuter])
        }

        return scale
            .scaleLinear()
            .domain(domain)
            .range([height - bottom, top])
            .clamp(clamp)
    }

    calcAreas(x, y) {
        const { horizontal, data, yAccessor } = this.props

        const _data = data.map((obj) => {
            const { svg = {} } = obj
            return _objectSpread({}, obj, {
                data: obj.data.map((item) => {
                    if (typeof item === 'number') {
                        return {
                            value: item,
                            svg,
                        }
                    }

                    return _objectSpread({}, item, {
                        svg: _objectSpread({}, svg, {}, item.svg),
                        value: yAccessor({
                            item,
                        }),
                    })
                }),
            })
        })

        const areas = []

        if (horizontal) {
            const barWidth = y.bandwidth() / data.length

            _data.forEach((obj, collectionIndex) => {
                obj.data.forEach((item, valueIndex) => {
                    areas.push({
                        bar: item,
                        path: shape
                            .area()
                            .y((value, _index) =>
                                _index === 0
                                    ? y(valueIndex) + barWidth * collectionIndex
                                    : y(valueIndex) + barWidth + barWidth * collectionIndex
                            )
                            .x0(x(0))
                            .x1((value) => x(value))
                            .defined((value) => typeof value === 'number')([item.value, item.value]),
                    })
                })
            })
        } else {
            const barWidth = x.bandwidth() / data.length

            _data.forEach((obj, collectionIndex) => {
                obj.data.forEach((item, valueIndex) => {
                    areas.push({
                        bar: item,
                        path: shape
                            .area()
                            .x((value, _index) =>
                                _index === 0
                                    ? x(valueIndex) + barWidth * collectionIndex
                                    : x(valueIndex) + barWidth + barWidth * collectionIndex
                            )
                            .y0(y(0))
                            .y1((value) => y(value))
                            .defined((value) => typeof value === 'number')([item.value, item.value]),
                    })
                })
            })
        }

        return areas
    }

    calcExtent() {
        const { data, yAccessor, gridMin, gridMax } = this.props
        const dataExtent = array.merge(
            data.map((obj) =>
                obj.data.map((item) =>
                    yAccessor({
                        item,
                    })
                )
            )
        )
        const extent = array.extent([...dataExtent, gridMax, gridMin])
        const { yMin = extent[0], yMax = extent[1] } = this.props
        return [yMin, yMax]
    }

    calcIndexes() {
        const { data } = this.props
        return data[0].data.map((_, index) => index)
    }
}

GroupedBarChart.propTypes = _objectSpread({}, BarChart.propTypes, {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            data: PropTypes.array.isRequired,
            svg: PropTypes.object,
        })
    ).isRequired,
})
export default GroupedBarChart
//# sourceMappingURL=bar-chart-grouped.js.map
