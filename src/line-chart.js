import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'
import Path from './animated-path'
import { Constants } from './util'
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

    _createLine(dataPoints, yAccessor, xAccessor) {
        const { curve } = this.props

        return shape.line()
            .x(xAccessor)
            .y(yAccessor)
            .defined(value => typeof value === 'number')
            .curve(curve)
            (dataPoints)
    }

    render() {

        const {
                  dataPoints,
                  strokeColor,
                  dashArray,
                  shadowColor,
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
                  strokeWidth,
                  shadowWidth,
                  gridProps,
              } = this.props

        const { width, height } = this.state

        if (dataPoints.length === 0) {
            return <View style={ style }/>
        }

        const extent = array.extent([ ...dataPoints, gridMax, gridMin ])
        const ticks  = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        //invert range to support svg coordinate system
        const y = scale.scaleLinear()
            .domain(extent)
            .range([ height - bottom, top ])

        const x = scale.scaleLinear()
            .domain([ 0, dataPoints.length - 1 ])
            .range([ left, width - right ])

        const line = this._createLine(
            dataPoints,
            value => y(value),
            (value, index) => x(index),
        )

        const shadow = this._createLine(
            dataPoints,
            value => y(value) + 3,
            (value, index) => x(index),
        )

        return (
            <View style={style}>
                <View style={{ flex: 1 }} onLayout={event => this._onLayout(event)}>
                    <Svg style={{ flex: 1 }}>
                        {
                            showGrid &&
                            <Grid
                                y={ y }
                                ticks={ ticks }
                                gridProps={ gridProps }
                            />
                        }
                        <Path
                            d={line}
                            stroke={strokeColor}
                            fill={'none'}
                            strokeWidth={ strokeWidth }
                            strokeDasharray={dashArray}
                            animate={animate}
                            animationDuration={animationDuration}
                        />
                        <Path
                            d={shadow}
                            stroke={shadowColor}
                            fill={'none'}
                            strokeWidth={ shadowWidth }
                            strokeDasharray={dashArray}
                            animate={animate}
                            animationDuration={animationDuration}
                        />
                        { dataPoints.map((value, index) => renderDecorator({ x, y, value, index })) }
                        { extras.map((item, index) => renderExtra({ x, y, item, index, width, height })) }
                    </Svg>
                </View>
            </View>
        )
    }
}

LineChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    shadowWidth: PropTypes.number,
    strokeWidth: PropTypes.number,
    strokeColor: PropTypes.string,
    fillColor: PropTypes.string,
    dashArray: PropTypes.arrayOf(PropTypes.number),
    style: PropTypes.any,
    shadowColor: PropTypes.string,
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
    showGrid: PropTypes.bool,
    gridMin: PropTypes.number,
    gridMax: PropTypes.number,
    extras: PropTypes.array,
    gridProps: PropTypes.object,
    renderDecorator: PropTypes.func,
    renderExtra: PropTypes.func,
    ...Constants.gridProps,
}

LineChart.defaultProps = {
    strokeColor: '#22B6B0',
    strokeWidth: 2,
    shadowWidth: 5,
    width: 100,
    height: 100,
    curve: shape.curveCardinal,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    gridMin: 0,
    gridMax: 0,
    extras: [],
    ...Constants.gridDefaultProps,
    renderDecorator: () => {
    },
    renderExtra: () => {
    },
}

export default LineChart
