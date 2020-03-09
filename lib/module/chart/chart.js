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

import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'
import Path from '../animated-path'

class Chart extends PureComponent {
    constructor(...args) {
        super(...args)

        _defineProperty(this, 'state', {
            width: 0,
            height: 0,
        })
    }

    _onLayout(event) {
        const {
            nativeEvent: {
                layout: { height, width },
            },
        } = event
        this.setState({
            height,
            width,
        })
    }

    createPaths() {
        throw 'Extending "Chart" requires you to override "createPaths'
    }

    render() {
        const {
            data,
            xAccessor,
            yAccessor,
            yScale,
            xScale,
            style,
            animate,
            animationDuration,
            numberOfTicks,
            contentInset: { top = 0, bottom = 0, left = 0, right = 0 },
            gridMax,
            gridMin,
            clampX,
            clampY,
            svg,
            children,
        } = this.props
        const { width, height } = this.state

        if (data.length === 0) {
            return React.createElement(View, {
                style: style,
            })
        }

        const mappedData = data.map((item, index) => ({
            y: yAccessor({
                item,
                index,
            }),
            x: xAccessor({
                item,
                index,
            }),
        }))
        const yValues = mappedData.map((item) => item.y)
        const xValues = mappedData.map((item) => item.x)
        const yExtent = array.extent([...yValues, gridMin, gridMax])
        const xExtent = array.extent([...xValues])
        const { yMin = yExtent[0], yMax = yExtent[1], xMin = xExtent[0], xMax = xExtent[1] } = this.props //invert range to support svg coordinate system

        const y = yScale()
            .domain([yMin, yMax])
            .range([height - bottom, top])
            .clamp(clampY)
        const x = xScale()
            .domain([xMin, xMax])
            .range([left, width - right])
            .clamp(clampX)
        const paths = this.createPaths({
            data: mappedData,
            x,
            y,
        })
        const ticks = y.ticks(numberOfTicks)

        const extraProps = _objectSpread(
            {
                x,
                y,
                data,
                ticks,
                width,
                height,
            },
            paths
        )

        return React.createElement(
            View,
            {
                style: style,
            },
            React.createElement(
                View,
                {
                    style: {
                        flex: 1,
                    },
                    onLayout: (event) => this._onLayout(event),
                },
                height > 0 &&
                    width > 0 &&
                    React.createElement(
                        Svg,
                        {
                            style: {
                                height,
                                width,
                            },
                        },
                        React.Children.map(children, (child) => {
                            if (child && child.props.belowChart) {
                                return React.cloneElement(child, extraProps)
                            }

                            return null
                        }),
                        React.createElement(
                            Path,
                            _extends(
                                {
                                    fill: 'none',
                                },
                                svg,
                                {
                                    d: paths.path,
                                    animate: animate,
                                    animationDuration: animationDuration,
                                }
                            )
                        ),
                        React.Children.map(children, (child) => {
                            if (child && !child.props.belowChart) {
                                return React.cloneElement(child, extraProps)
                            }

                            return null
                        })
                    )
            )
        )
    }
}

Chart.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(PropTypes.array),
    ]).isRequired,
    svg: PropTypes.object,
    style: PropTypes.any,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    curve: PropTypes.func,
    contentInset: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
    }),
    numberOfTicks: PropTypes.number,
    gridMin: PropTypes.number,
    gridMax: PropTypes.number,
    yMin: PropTypes.any,
    yMax: PropTypes.any,
    xMin: PropTypes.any,
    xMax: PropTypes.any,
    clampX: PropTypes.bool,
    clampY: PropTypes.bool,
    xScale: PropTypes.func,
    yScale: PropTypes.func,
    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
}
Chart.defaultProps = {
    svg: {},
    width: 100,
    height: 100,
    curve: shape.curveLinear,
    contentInset: {},
    numberOfTicks: 10,
    xScale: scale.scaleLinear,
    yScale: scale.scaleLinear,
    xAccessor: ({ index }) => index,
    yAccessor: ({ item }) => item,
}
export default Chart
//# sourceMappingURL=chart.js.map
