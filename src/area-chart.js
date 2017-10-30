import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import Svg, { Defs, LinearGradient, Stop } from 'react-native-svg'
import Path from './animated-path'
import { Constants } from './util'

class AreaChart extends PureComponent {

    state = {
        height: 0,
        width: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    _getPointStyle(value, x, y) {
        const { pointSize, pointWidth, strokeColor } = this.props
        const { pointColor = strokeColor }           = this.props

        return {
            position: 'absolute',
            left: x - pointSize,
            bottom: y - pointSize,
            height: pointSize * 2,
            width: pointSize * 2,
            borderRadius: pointSize,
            borderWidth: pointWidth,
            backgroundColor: 'white',
            borderColor: value >= 0 ? pointColor : 'red',
        }
    }

    getY(value) {
        return this.y(value)
    }

    getX(index) {
        return this.x(index)
    }

    render() {

        const {
                  dataPoints,
                  strokeColor,
                  strokeWidth,
                  fillColor,
                  showPoints,
                  animate,
                  dashArray,
                  animationDuration,
                  pointSize,
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
                  gridStyle,
                  intersections,
                  renderIntersection,
                  renderAccessories,
                  extras,
                  renderExtras,
              } = this.props

        const { height, width } = this.state

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
                    {
                        showGrid &&
                        ticks.map((tick, index) => (
                            <View
                                key={index}
                                style={[ styles.grid, gridStyle, { top: y(tick) } ]}
                            />
                        ))
                    }
                    <Svg style={{ flex: 1 }}>
                        <Defs>
                            {
                                renderGradient ? renderGradient({ id: 'gradient' }) :
                                (
                                    <LinearGradient id={ 'gradient' } x1={ '0' } y={ `${top}` } x2={ '0' }
                                                    y2={ `100%` }>
                                        <Stop offset={ '0' } stopColor={ fillColor } stopOpacity={ 0.5 }/>
                                        <Stop offset={ `1` } stopColor={ fillColor } stopOpacity={ 0.1 }/>
                                    </LinearGradient>
                                )
                            }
                        </Defs>
                        <Path
                            d={area}
                            fill={'url(#gradient)'}
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
                        {
                            dataPoints.map((value, index) => renderAccessories({ x, y, index, value, height, width }))
                        }
                        {
                            extras.map((item, index) => renderExtras({ item, x, y, index, height, width }))
                        }
                    </Svg>
                </View>
            </View>
        )
    }
}

AreaChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    fillColor: PropTypes.string,
    dashArray: PropTypes.arrayOf(PropTypes.number),
    showPoints: PropTypes.bool,
    pointColor: PropTypes.string,
    // see https://github.com/react-native-community/react-native-svg#lineargradient for more info
    renderGradient: PropTypes.func,
    pointSize: PropTypes.number,
    pointWidth: PropTypes.number,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    style: PropTypes.any,
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
    gridStyle: PropTypes.any,
    intersections: PropTypes.arrayOf(PropTypes.number),
    renderIntersection: PropTypes.func,
    extras: PropTypes.array,
    renderExtras: PropTypes.func,
}

AreaChart.defaultProps = {
    fillColor: 'rgba(34, 182, 176, 0.2)',
    gradientColors: 'rgba(34, 182, 176)',
    strokeColor: '#22B6B0',
    strokeWidth: 1,
    pointWidth: 1,
    pointSize: 4,
    width: 100,
    height: 100,
    showZeroAxis: true,
    curve: shape.curveCardinal,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    gridMin: 0,
    gridMax: 0,
    intersections: [],
    renderIntersection: () => {
    },
    renderExtras: () => {},
    extras: [],
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    grid: Constants.gridStyle,
    surface: {
        backgroundColor: 'transparent',
    },
    intersection: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
})

export default AreaChart
