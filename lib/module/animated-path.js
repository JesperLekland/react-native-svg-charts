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

import React, { Component } from 'react'
import { InteractionManager } from 'react-native'
import PropTypes from 'prop-types'
import { Path } from 'react-native-svg'
import * as interpolate from 'd3-interpolate-path'

class AnimatedPath extends Component {
    constructor(props) {
        super(props)
        this.state = {
            d: props.d,
        }
    }

    componentDidUpdate(props) {
        const { d: newD, animate } = this.props
        const { d: oldD } = props
        this.newD = newD

        if (newD === oldD) {
            return
        }

        if (!animate || newD === null || oldD === null) {
            return
        }

        this.newD = newD
        this.interpolator = interpolate.interpolatePath(oldD, newD)

        this._animate()
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.animation)

        this._clearInteraction()
    }

    _animate(start) {
        cancelAnimationFrame(this.animation)
        this.animation = requestAnimationFrame((timestamp) => {
            if (!start) {
                this._clearInteraction()

                this.handle = InteractionManager.createInteractionHandle()
                start = timestamp
            } // Get the delta on how far long in our animation we are.

            const delta = (timestamp - start) / this.props.animationDuration // If we're above 1 then our animation should be complete.

            if (delta > 1) {
                // Just to be safe set our final value to the new graph path.
                this.component.setNativeProps({
                    d: this.newD,
                }) // Stop our animation loop.

                this._clearInteraction()

                return
            }

            const d = this.interpolator(delta)
            this.component.setNativeProps({
                d,
            }) // console.log(this.interpolator)
            // this.tween && console.log(this.tween.tween(delta))
            // Tween the SVG path value according to what delta we're currently at.
            // Update our state with the new tween value and then jump back into
            // this loop.

            this.setState(this.state, () => {
                this._animate(start)
            })
        })
    }

    _clearInteraction() {
        if (this.handle) {
            InteractionManager.clearInteractionHandle(this.handle)
            this.handle = null
        }
    }

    render() {
        return React.createElement(
            Path,
            _extends(
                {
                    ref: (_ref) => (this.component = _ref),
                },
                this.props,
                {
                    d: this.props.animate ? this.state.d : this.props.d,
                }
            )
        )
    }
}

AnimatedPath.propTypes = _objectSpread(
    {
        animate: PropTypes.bool,
        animationDuration: PropTypes.number,
        renderPlaceholder: PropTypes.func,
    },
    Path.propTypes
)
AnimatedPath.defaultProps = {
    animate: false,
    animationDuration: 300,
    renderPlaceholder: () => null,
}
export default AnimatedPath
//# sourceMappingURL=animated-path.js.map
