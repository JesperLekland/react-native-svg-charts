import PropTypes from 'prop-types'
import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Svg } from 'react-native-svg'
import Path from './animated-path'

class AreaStack extends PureComponent {

    static extractDataPoints(data, keys, order = shape.stackOrderNone, offset = shape.stackOffsetNone) {
        const series = shape.stack()
            .keys(keys)
            .order(order)
            .offset(offset)
            (data)

        //double merge arrays to extract just the values
        return array.merge(array.merge(series))
    }

    state = {
        height: 0,
        width: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    render() {

        const {
            data,
            keys,
            colors,
            animate,
            animationDuration,
            style,
            curve,
            numberOfTicks,
            contentInset: {
                top    = 0,
                bottom = 0,
                left   = 0,
                right  = 0,
            },
            gridMin,
            gridMax,
            children,
            offset,
            order,
            svgs,
        } = this.props

        const { height, width } = this.state

        if (data.length === 0) {
            return <View style={ style }/>
        }

        const series = shape.stack()
            .keys(keys)
            .order(order)
            .offset(offset)
            (data)

        //double merge arrays to extract just the values
        const values = array.merge(array.merge(series))

        const extent = array.extent([ ...values, gridMin, gridMax ])
        const ticks  = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        //invert range to support svg coordinate system
        const y = scale.scaleLinear()
            .domain([ extent[ 0 ], extent[ 1 ] ])
            .range([ height - bottom, top ])

        const x = scale.scaleLinear()
            .domain([ 0, data.length - 1 ])
            .range([ left, width - right ])

        const areas = series.map((serie, index) => {
            const path = shape.area()
                .x((d, index) => x(index))
                .y0(d => y(d[ 0 ]))
                .y1(d => y(d[ 1 ]))
                .curve(curve)
                (data.map((_, index) => serie[ index ]))

            return {
                path,
                key: keys[ index ],
                color: colors[ index ],
            }
        })

        const extraProps = {
            x,
            y,
            width,
            height,
            ticks,
        }

        return (
            <View style={ style }>
                <View
                    style={{ flex: 1 }}
                    onLayout={ event => this._onLayout(event) }
                >
                    {
                        height > 0 && width > 0 &&
                        <Svg style={{ height, width }}>
                            {
                                React.Children.map(children, child => {
                                    if (child && child.props.belowChart) {
                                        return React.cloneElement(child, extraProps)
                                    }
                                    return null
                                })
                            }
                            {
                                areas.map((area, index) => (
                                    <Path
                                        key={ area.key }
                                        fill={ area.color }
                                        { ...svgs[ index ] }
                                        animate={ animate }
                                        animationDuration={ animationDuration }
                                        d={ area.path }
                                    />
                                ))
                            }
                            {
                                React.Children.map(children, child => {
                                    if (child && !child.props.belowChart) {
                                        return React.cloneElement(child, extraProps)
                                    }
                                    return null
                                })
                            }
                        </Svg>
                    }
                </View>
            </View>
        )
    }
}

AreaStack.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    svgs: PropTypes.arrayOf(PropTypes.object),
    offset: PropTypes.func,
    order: PropTypes.func,
    style: PropTypes.any,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    contentInset: PropTypes.shape({
        top: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        bottom: PropTypes.number,
    }),
    numberOfTicks: PropTypes.number,
    showGrid: PropTypes.bool,
}

AreaStack.defaultProps = {
    curve: shape.curveLinear,
    offset: shape.stackOffsetNone,
    order: shape.stackOrderNone,
    strokeWidth: 2,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
}

export default AreaStack
