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

import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import Chart from './chart/chart'

class AreaChart extends Chart {
    createPaths({ data, x, y }) {
        const { curve, start } = this.props
        const area = shape
            .area()
            .x((d) => x(d.x))
            .y0(y(start))
            .y1((d) => y(d.y))
            .defined((item) => typeof item.y === 'number')
            .curve(curve)(data)
        const line = shape
            .line()
            .x((d) => x(d.x))
            .y((d) => y(d.y))
            .defined((item) => typeof item.y === 'number')
            .curve(curve)(data)
        return {
            path: area,
            area,
            line,
        }
    }
}

AreaChart.propTypes = _objectSpread({}, Chart.propTypes, {
    start: PropTypes.number,
})
AreaChart.defaultProps = _objectSpread({}, Chart.defaultProps, {
    start: 0,
})
export default AreaChart
//# sourceMappingURL=area-chart.js.map
