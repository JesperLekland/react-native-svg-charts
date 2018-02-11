import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Svg, { Defs } from 'react-native-svg'
import Path from './animated-path'
import Grid from './grid'

class AreaChart extends PureComponent {

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
                  start,
                  data,
                  animate,
                  animationDuration,
                  style,
                  renderGradient,
                  renderLineGradient,
                  curve,
                  showGrid,
                  numberOfTicks,
                  contentInset: {
                      top    = 0,
                      bottom = 0,
                      left   = 0,
                      right  = 0,
                  },
                  gridMin,
                  gridMax,
                  gridProps,
                  renderDecorator,
                  extras,
                  renderExtra,
                  svg,
                  xScale,
                  yScale,
                  renderGrid = Grid,
              } = this.props

        const { height, width } = this.state

        if (data.length === 0) {
            return <View style={ style }/>
        }

        const yValues = data.map((item) => typeof item === 'number' ? item : item.y)
        const xValues = data.map((item, index) => typeof item === 'number' ? index : item.x)

        const mappedData = data.map((_, index) => ({ y: yValues[ index ], x: xValues[ index ] }))

        const yExtent = array.extent([ ...yValues, gridMin, gridMax ])
        const xExtent = array.extent([ ...xValues ])

        //invert range to support svg coordinate system
        const y = yScale()
            .domain(yExtent)
            .range([ height - bottom, top ])

        const x = xScale()
            .domain(xExtent)
            .range([ left, width - right ])

        const area = shape.area()
            .x((d) => x(d.x))
            .y0(y(start) || y(0))
            .y1(d => y(d.y))
            .defined(item => typeof item.y === 'number')
            .curve(curve)
            (mappedData)

        const line = shape.line()
            .x((d) => x(d.x))
            .y(d => y(d.y))
            .defined(item => typeof item.y === 'number')
            .curve(curve)
            (mappedData)

        const ticks = y.ticks(numberOfTicks)

        if (data.length === 0) {
            return (
                <View style={style}>

                </View>
            )
        }

        return (
            <View style={style}>
                <View
                    style={{ flex: 1 }}
                    onLayout={event => this._onLayout(event)}
                >
                    <Svg style={{ flex: 1 }}>
                        {showGrid && renderGrid({ x, y, ticks, data, gridProps })}
                        <Defs>
                            { renderGradient && renderGradient({ id: 'gradient', width, height, x, y }) }
                            { renderLineGradient && renderLineGradient({ id: 'line-gradient', width, height, x, y }) }
                        </Defs>
                        <Path
                            { ...svg }
                            fill={ renderGradient ? 'url(#gradient)' : svg.fill }
                            d={area}
                            animate={animate}
                            animationDuration={animationDuration}
                            stroke={ 'none' }
                        />
                        <Path
                            { ...svg }
                            stroke={ renderLineGradient ? 'url(#line-gradient)' : svg.stroke }
                            animate={animate}
                            animationDuration={animationDuration}
                            d={ line }
                            fill={ 'none' }
                        />
                        { data.map((value, index) => renderDecorator({ x, y, index, value })) }
                        { extras.map((item, index) => renderExtra({ 
                            item, 
                            x, 
                            y, 
                            index, 
                            width, 
                            height, 
                            area, 
                            line, 
                            gradientId: 'gradient', 
                            linearGradientId: 'line-gradient', 
                        })) 
                        }
                    </Svg>
                </View>
            </View>
        )
    }
}

AreaChart.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                x: PropTypes.any.isRequired,
                y: PropTypes.number.isRequired,
            }),
        ),
        PropTypes.arrayOf(PropTypes.number),
    ]).isRequired,
    svg: PropTypes.object,
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
    extras: PropTypes.array,
    renderDecorator: PropTypes.func,
    renderExtra: PropTypes.func,
    gridProps: PropTypes.object,
    gridWidth: PropTypes.number,
    gridMin: PropTypes.number,
    gridMax: PropTypes.number,
    // see https://github.com/react-native-community/react-native-svg#lineargradient for more info
    renderGradient: PropTypes.func,
    renderLineGradient: PropTypes.func,
    curve: PropTypes.func,
    renderGrid: PropTypes.func,
    start: PropTypes.number,
}

AreaChart.defaultProps = {
    svg: {},
    curve: shape.curveCardinal,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    extras: [],
    xScale: scale.scaleLinear,
    yScale: scale.scaleLinear,
    getY: ({ item }) => item,
    getX: ({ index }) => index,
    renderDecorator: () => {
    },
    renderExtra: () => {
    },
}

export default AreaChart
