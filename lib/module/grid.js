function _objectWithoutProperties(source, excluded) {
    if (source == null) return {}
    var target = _objectWithoutPropertiesLoose(source, excluded)
    var key, i
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source)
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i]
            if (excluded.indexOf(key) >= 0) continue
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue
            target[key] = source[key]
        }
    }
    return target
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {}
    var target = {}
    var sourceKeys = Object.keys(source)
    var key, i
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i]
        if (excluded.indexOf(key) >= 0) continue
        target[key] = source[key]
    }
    return target
}

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

function _extends() {
    _extends =
        Object.assign ||
        function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i]
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key]
                    }
                }
            }
            return target
        }
    return _extends.apply(this, arguments)
}

import React from 'react'
import PropTypes from 'prop-types'
import { G, Line } from 'react-native-svg'

const Horizontal = ({ ticks = [], y, svg }) => {
    return React.createElement(
        G,
        null,
        ticks.map((tick) =>
            React.createElement(
                Line,
                _extends(
                    {
                        key: tick,
                        x1: '0%',
                        x2: '100%',
                        y1: y(tick),
                        y2: y(tick),
                        strokeWidth: 1,
                        stroke: 'rgba(0,0,0,0.2)',
                    },
                    svg
                )
            )
        )
    )
}

const Vertical = ({ ticks = [], x, svg }) => {
    return React.createElement(
        G,
        null,
        ticks.map((tick, index) =>
            React.createElement(
                Line,
                _extends(
                    {
                        key: index,
                        y1: '0%',
                        y2: '100%',
                        x1: x(tick),
                        x2: x(tick),
                        strokeWidth: 1,
                        stroke: 'rgba(0,0,0,0.2)',
                    },
                    svg
                )
            )
        )
    )
}

const Both = (props) => {
    return React.createElement(G, null, React.createElement(Horizontal, props), React.createElement(Vertical, props))
}

Vertical.propTypes = {
    x: PropTypes.func,
    dataPoints: PropTypes.array,
    svg: PropTypes.object,
}
Horizontal.propTypes = {
    y: PropTypes.func,
    ticks: PropTypes.array,
}
Both.propTypes = _objectSpread({}, Vertical.propTypes, {}, Horizontal.propTypes)
const Direction = {
    VERTICAL: 'VERTICAL',
    HORIZONTAL: 'HORIZONTAL',
    BOTH: 'BOTH',
}

const Grid = (_ref) => {
    let { direction } = _ref,
        props = _objectWithoutProperties(_ref, ['direction'])

    if (direction === Direction.VERTICAL) {
        return React.createElement(Vertical, props)
    } else if (direction === Direction.HORIZONTAL) {
        return React.createElement(Horizontal, props)
    } else if (direction === Direction.BOTH) {
        return React.createElement(Both, props)
    }

    return null
}

Grid.Direction = Direction
Grid.propTypes = {
    direction: PropTypes.oneOf(Object.values(Direction)),
    belowChart: PropTypes.bool,
    svg: PropTypes.object,
}
Grid.defaultProps = {
    direction: Direction.HORIZONTAL,
    belowChart: true,
}
export default Grid
//# sourceMappingURL=grid.js.map
