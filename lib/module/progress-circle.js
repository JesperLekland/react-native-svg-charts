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

import React, { PureComponent } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import * as shape from 'd3-shape'
import Path from './animated-path'
import Svg, { G } from 'react-native-svg'

class ProgressCircle extends PureComponent {
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

    render() {
        const {
            style,
            progressColor,
            backgroundColor,
            strokeWidth,
            startAngle,
            endAngle,
            animate,
            animateDuration,
            children,
            cornerRadius,
        } = this.props
        let { progress } = this.props
        const { height, width } = this.state
        const outerDiameter = Math.min(width, height)

        if (!isFinite(progress) || isNaN(progress)) {
            progress = 0
        } // important order to have progress render over "rest"

        const data = [
            {
                key: 'rest',
                value: 1 - progress,
                color: backgroundColor,
            },
            {
                key: 'progress',
                value: progress,
                color: progressColor,
            },
        ]
        const pieSlices = shape
            .pie()
            .value((d) => d.value)
            .sort((a) => (a.key === 'rest' ? 1 : -1))
            .startAngle(startAngle)
            .endAngle(endAngle)(data)
        const arcs = pieSlices.map((slice, index) =>
            _objectSpread({}, data[index], {}, slice, {
                path: shape
                    .arc()
                    .outerRadius(outerDiameter / 2) // Radius of the pie
                    .innerRadius(outerDiameter / 2 - strokeWidth) // Inner radius: to create a donut or pie
                    .startAngle(index === 0 ? startAngle : slice.startAngle)
                    .endAngle(index === 0 ? endAngle : slice.endAngle)
                    .cornerRadius(cornerRadius)(),
            })
        )
        const extraProps = {
            width,
            height,
        }
        return React.createElement(
            View,
            {
                style: style,
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
                    React.createElement(
                        G,
                        {
                            x: width / 2,
                            y: height / 2,
                        },
                        React.Children.map(children, (child) => {
                            if (child && child.props.belowChart) {
                                return React.cloneElement(child, extraProps)
                            }

                            return null
                        }),
                        arcs.map((shape, index) => {
                            return React.createElement(Path, {
                                key: index,
                                fill: shape.color,
                                d: shape.path,
                                animate: animate,
                                animationDuration: animateDuration,
                            })
                        }),
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

ProgressCircle.propTypes = {
    progress: PropTypes.number.isRequired,
    style: PropTypes.any,
    progressColor: PropTypes.any,
    backgroundColor: PropTypes.any,
    strokeWidth: PropTypes.number,
    startAngle: PropTypes.number,
    endAngle: PropTypes.number,
    animate: PropTypes.bool,
    cornerRadius: PropTypes.number,
    animateDuration: PropTypes.number,
}
ProgressCircle.defaultProps = {
    progressColor: 'black',
    backgroundColor: '#ECECEC',
    strokeWidth: 5,
    startAngle: 0,
    endAngle: Math.PI * 2,
    cornerRadius: 45,
}
export default ProgressCircle
//# sourceMappingURL=progress-circle.js.map
