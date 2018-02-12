import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Svg, { Defs } from 'react-native-svg'
import Path from './animated-path'
import Grid from './grid'

class LineChart extends PureComponent {

    state = {
        width: 0,
        height: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    _createLine(data, yAccessor, xAccessor) {
        const { curve } = this.props

        return shape.line()
            .x(xAccessor)
            .y(yAccessor)
            .defined(item => typeof item.y === 'number')
            .curve(curve)
            (data)
    }

    render() {

        const {
                  data,
                  yScale,
                  xScale,
                  style,
                  animate,
                  animationDuration,
                  showGrid,
                  numberOfTicks,
                  contentInset: {
                      top    = 0,
                      bottom = 0,
                      left   = 0,
                      right  = 0,
                  },
                  gridMax,
                  gridMin,
                  renderDecorator,
                  extras,
                  renderExtra,
                  shadowOffset,
                  gridProps,
                  svg,
                  shadowSvg,
                  renderGradient,
                  renderGrid = Grid,
              } = this.props

        const { width, height } = this.state

        if (data.length === 0) {
            return <View style={ style }/>
        }

        const yValues = data.map((item) =>        typeof item === 'number' ? item  : item.y)
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

        const line = this._createLine(
            mappedData,
            item => y(item.y),
            item => x(item.x),
        )

        const shadow = this._createLine(
            mappedData,
            item => y(item.y - shadowOffset),
            item => x(item.x),
        )

        const ticks = y.ticks(numberOfTicks)

        return (
            <View style={style}>
                <View style={{ flex: 1 }} onLayout={event => this._onLayout(event)}>
                    <Svg style={{ flex: 1 }}>
                        {showGrid && renderGrid({ x, y, ticks, data, gridProps })}
                        {
                            <Defs>
                                { renderGradient && renderGradient({ id: 'gradient', width, height, x, y }) }
                            </Defs>
                        }
                        <Path
                            { ...svg }
                            d={line}
                            stroke={renderGradient ? 'url(#gradient)' : svg.stroke}
                            fill={ 'none' }
                            animate={animate}
                            animationDuration={animationDuration}
                        />
                        <Path
                            strokeWidth={ 5 }
                            { ...shadowSvg }
                            d={shadow}
                            fill={'none'}
                            animate={animate}
                            animationDuration={animationDuration}
                        />
                        {data.map((value, index) => renderDecorator({ x, y, value, index }))}
                        { extras.map((item, index) => renderExtra({ 
                            x, 
                            y, 
                            item, 
                            index, 
                            width, 
                            height,
                            line,
                            shadow,
                            gradientId: 'gradient',
                        })) }
                    </Svg>
                </View>
            </View>
        )
    }
}

LineChart.propTypes = {
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
    shadowSvg: PropTypes.object,
    shadowOffset: PropTypes.number,

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
    extras: PropTypes.array,

    renderDecorator: PropTypes.func,
    renderExtra: PropTypes.func,
    renderGradient: PropTypes.func,

    gridMin: PropTypes.number,
    gridMax: PropTypes.number,
    showGrid: PropTypes.bool,
    gridProps: PropTypes.object,
    renderGrid: PropTypes.func,

    xScale: PropTypes.func,
    yScale: PropTypes.func,
}

LineChart.defaultProps = {
    svg: {},
    shadowSvg: {},
    shadowOffset: 3,
    width: 100,
    height: 100,
    curve: shape.curveLinear,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    extras: [],
    xScale: scale.scaleLinear,
    yScale: scale.scaleLinear,
    renderDecorator: () => {
    },
    renderExtra: () => {
    },
}

export default LineChart
