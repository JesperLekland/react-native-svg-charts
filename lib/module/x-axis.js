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
import * as d3Scale from 'd3-scale'
import * as array from 'd3-array'
import Svg, { G, Text as SVGText } from 'react-native-svg'

class XAxis extends PureComponent {
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
                layout: { width, height },
            },
        } = event

        if (width !== this.state.width) {
            this.setState({
                width,
                height,
            })
        }
    }

    _getX(domain) {
        const {
            scale,
            spacingInner,
            spacingOuter,
            contentInset: { left = 0, right = 0 },
        } = this.props
        const { width } = this.state
        const x = scale()
            .domain(domain)
            .range([left, width - right])

        if (scale === d3Scale.scaleBand) {
            x.paddingInner([spacingInner]).paddingOuter([spacingOuter]) //add half a bar to center label

            return (value) => x(value) + x.bandwidth() / 2
        }

        return x
    }

    render() {
        const { style, scale, data, xAccessor, formatLabel, numberOfTicks, svg, children, min, max } = this.props
        const { height, width } = this.state

        if (data.length === 0) {
            return React.createElement(View, {
                style: style,
            })
        }

        const values = data.map((item, index) =>
            xAccessor({
                item,
                index,
            })
        )
        const extent = array.extent(values)
        const domain = scale === d3Scale.scaleBand ? values : [min || extent[0], max || extent[1]]

        const x = this._getX(domain)

        const ticks = numberOfTicks ? x.ticks(numberOfTicks) : values
        const extraProps = {
            x,
            ticks,
            width,
            height,
            formatLabel,
        }
        return React.createElement(
            View,
            {
                style: style,
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
                    formatLabel(ticks[0], 0)
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
                            width > 0 &&
                                ticks.map((value, index) => {
                                    const { svg: valueSvg = {} } = data[index] || {}
                                    return React.createElement(
                                        SVGText,
                                        _extends(
                                            {
                                                textAnchor: 'middle',
                                                originX: x(value),
                                                alignmentBaseline: 'hanging',
                                            },
                                            svg,
                                            valueSvg,
                                            {
                                                key: index,
                                                x: x(value),
                                            }
                                        ),
                                        formatLabel(value, index)
                                    )
                                })
                        )
                    )
            )
        )
    }
}

XAxis.propTypes = {
    data: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.object])).isRequired,
    spacingInner: PropTypes.number,
    spacingOuter: PropTypes.number,
    formatLabel: PropTypes.func,
    contentInset: PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
    }),
    scale: PropTypes.func,
    numberOfTicks: PropTypes.number,
    xAccessor: PropTypes.func,
    svg: PropTypes.object,
    min: PropTypes.any,
    max: PropTypes.any,
}
XAxis.defaultProps = {
    spacingInner: 0.05,
    spacingOuter: 0.05,
    contentInset: {},
    svg: {},
    xAccessor: ({ index }) => index,
    scale: d3Scale.scaleLinear,
    formatLabel: (value) => value,
}
export default XAxis
//# sourceMappingURL=x-axis.js.map
