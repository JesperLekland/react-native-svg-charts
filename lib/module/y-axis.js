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

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true })
    } else {
        obj[key] = value
    }
    return obj
}

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { Svg, G, Text as SVGText } from 'react-native-svg'
import * as d3Scale from 'd3-scale'
import * as array from 'd3-array'

class YAxis extends PureComponent {
    constructor(...args) {
        super(...args)

        _defineProperty(this, 'state', {
            height: 0,
            width: 0,
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

    getY(domain) {
        const {
            scale,
            spacingInner,
            spacingOuter,
            contentInset: { top = 0, bottom = 0 },
        } = this.props
        const { height } = this.state
        const y = scale()
            .domain(domain)
            .range([height - bottom, top])

        if (scale === d3Scale.scaleBand) {
            // use index as domain identifier instead of value since
            // same value can occur at several places in dataPoints
            y.range([top, height - bottom]) // set range top to bottom - we are not sorting on values in scaleBand
                .paddingInner([spacingInner])
                .paddingOuter([spacingOuter]) //add half a bar to center label

            return (value) => y(value) + y.bandwidth() / 2
        }

        return y
    }

    render() {
        const { style, data, scale, yAccessor, numberOfTicks, formatLabel, svg, children } = this.props
        const { height, width } = this.state

        if (data.length === 0) {
            return React.createElement(View, {
                style: style,
            })
        }

        const values = data.map((item, index) =>
            yAccessor({
                item,
                index,
            })
        )
        const extent = array.extent(values)
        const { min = extent[0], max = extent[1] } = this.props
        const domain = scale === d3Scale.scaleBand ? values : [min, max] //invert range to support svg coordinate system

        const y = this.getY(domain)
        const ticks = scale === d3Scale.scaleBand ? values : y.ticks(numberOfTicks)
        const longestValue = ticks
            .map((value, index) => formatLabel(value, index))
            .reduce((prev, curr) => (prev.toString().length > curr.toString().length ? prev : curr), 0)
        const extraProps = {
            y,
            ticks,
            width,
            height,
            formatLabel,
        }
        return React.createElement(
            View,
            {
                style: [style],
            },
            React.createElement(
                View,
                {
                    style: {
                        flexGrow: 1,
                    },
                    onLayout: (event) => this._onLayout(event),
                },
                React.createElement(
                    Text,
                    {
                        style: {
                            opacity: 0,
                            fontSize: svg.fontSize,
                            fontFamily: svg.fontFamily,
                            fontWeight: svg.fontWeight,
                        },
                    },
                    longestValue
                ),
                height > 0 &&
                    width > 0 &&
                    React.createElement(
                        Svg,
                        {
                            style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height,
                                width,
                            },
                        },
                        React.createElement(
                            G,
                            null,
                            React.Children.map(children, (child) => {
                                return React.cloneElement(child, extraProps)
                            }), // don't render labels if width isn't measured yet,
                            // causes rendering issues
                            height > 0 &&
                                ticks.map((value, index) => {
                                    return React.createElement(
                                        SVGText,
                                        _extends(
                                            {
                                                originY: y(value),
                                                textAnchor: 'middle',
                                                x: '50%',
                                                alignmentBaseline: 'middle',
                                            },
                                            svg,
                                            {
                                                key: y(value),
                                                y: y(value),
                                            }
                                        ),
                                        formatLabel(value, index, ticks.length)
                                    )
                                })
                        )
                    )
            )
        )
    }
}

YAxis.propTypes = {
    data: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.arrayOf(PropTypes.number)]).isRequired,
    svg: PropTypes.object,
    style: PropTypes.any,
    numberOfTicks: PropTypes.number,
    formatLabel: PropTypes.func,
    contentInset: PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
    }),
    min: PropTypes.number,
    max: PropTypes.number,
    yAccessor: PropTypes.func,
    scale: PropTypes.func,
    spacingInner: PropTypes.number,
    spacingOuter: PropTypes.number,
}
YAxis.defaultProps = {
    numberOfTicks: 10,
    spacingInner: 0.05,
    spacingOuter: 0.05,
    contentInset: {},
    svg: {},
    scale: d3Scale.scaleLinear,
    formatLabel: (value) => value && value.toString(),
    yAccessor: ({ item }) => item,
}
export default YAxis
//# sourceMappingURL=y-axis.js.map
