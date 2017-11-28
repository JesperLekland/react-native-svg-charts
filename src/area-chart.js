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
                  dataPoints,
                  strokeColor,
                  strokeWidth,
                  fillColor,
                  animate,
                  dashArray,
                  animationDuration,
                  style,
                  renderGradient,
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
              } = this.props

        const { height, width } = this.state

        if (dataPoints.length === 0) {
            return <View style={ style }/>
        }

        const extent = array.extent([ ...dataPoints, gridMin, gridMax ])
        const ticks  = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        //invert range to support svg coordinate system
        const y = scale.scaleLinear()
            .domain(extent)
            .range([ height - bottom, top ])

        this.y = y

        const x = scale.scaleLinear()
            .domain([ 0, dataPoints.length - 1 ])
            .range([ left, width - right ])

        this.x = x

        const area = shape.area()
            .x((d, index) => x(index))
            .y0(y(0))
            .y1(d => y(d))
            .defined(value => typeof value === 'number')
            .curve(curve)
            (dataPoints)

        const line = shape.line()
            .x((d, index) => x(index))
            .y(d => y(d))
            .defined(value => typeof value === 'number')
            .curve(curve)
            (dataPoints)

        if (dataPoints.length === 0) {
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
                        {
                            showGrid &&
                            <Grid
                                y={ y }
                                ticks={ ticks }
                                gridProps={ gridProps }
                            />
                        }
                        <Defs>
                            { renderGradient && renderGradient({ id: 'gradient', width, height, x, y }) }
                        </Defs>
                        <Path
                            d={area}
                            fill={ renderGradient ? 'url(#gradient)' : fillColor }
                            animate={animate}
                            animationDuration={animationDuration}
                        />
                        <Path
                            d={line}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            fill={'none'}
                            strokeDasharray={dashArray}
                            animate={animate}
                            animationDuration={animationDuration}
                        />
                        { dataPoints.map((value, index) => renderDecorator({ x, y, index, value })) }
                        { extras.map((item, index) => renderExtra({ item, x, y, index, width, height })) }
                    </Svg>
                </View>
            </View>
        )
    }
}

AreaChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    dashArray: PropTypes.arrayOf(PropTypes.number),
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
    curve: PropTypes.func,
}

AreaChart.defaultProps = {
    curve: shape.curveCardinal,
    strokeWidth: 2,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    gridMin: 0,
    gridMax: 0,
    extras: [],
    renderDecorator: () => {
    },
    renderExtra: () => {
    },
}

export default AreaChart
