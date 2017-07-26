import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ART, Platform } from 'react-native'
import Morph from 'art/morph/path'

const {
          Shape,
      } = ART

class AnimShape extends Component {

    constructor(props) {
        super(props)

        this.state = {
            d: props.d,
        }
    }

    componentWillReceiveProps(props) {
        const { d: newD, animate } = props
        const { d: oldD }          = this.props

        this.newD = newD || ''

        if (newD === oldD) {
            return
        }

        if (!animate || newD === null || oldD === null) {
            this.setState({
                d: this.newD,
            })
            return
        }

        this.newD = newD

        this.setState({
            d: Morph.Tween(oldD, newD),
        }, () => this._animate())
    }

    _animate(start) {
        cancelAnimationFrame(this.animation)
        this.animation = requestAnimationFrame((timestamp) => {
            if (!start) {
                start = timestamp
            }

            // Get the delta on how far long in our animation we are.
            const delta = (timestamp - start) / this.props.animationDuration

            // If we're above 1 then our animation should be complete.
            if (delta > 1) {
                // Just to be safe set our final value to the new graph path.
                this.setState({
                    d: this.newD,
                })

                // Stop our animation loop.
                return
            }
            // Tween the SVG path value according to what delta we're currently at.
            this.state.d.tween(delta)

            // Update our state with the new tween value and then jump back into
            // this loop.
            this.setState(this.state, () => {
                this._animate(start)
            })
        })
    }

    render() {

        const { d }                      = this.state

        if (!d) {
            return <Shape/>
        }

        return (
            <Shape
                {...this.props}
                d={d}
            />
        )
    }
}

AnimShape.propTypes = {
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    ...Shape.propTypes,
}

AnimShape.defaultProps = {
    animate: __DEV__ && Platform.OS === 'ios',
    animationDuration: 300,
}

export default AnimShape
