import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Svg from 'react-native-svg'
import Path from './animated-path'
import Grid from './grid'

class WaterfallChart extends PureComponent {

    state = {
        width: 0,
        height: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    render() {

        const {
                  dataPoints,
                  strokeColor,
                  dashArray,
                  style,
                  positiveFill,
                  negativeFill,
                  animate,
                  strokeWidth,
                  animationDuration,
                  showGrid,
                  curve,
                  numberOfTicks,
                  onItemPress,
                  spacing,
                  contentInset: {
                      top    = 0,
                      bottom = 0,
                      left   = 0,
                      right  = 0,
                  },
                  gridMax,
                  gridMin,
                  gridProps,
                  extras,
                  renderExtra,
                  renderDecorator,
              } = this.props

        const { width, height } = this.state

        if (dataPoints.length === 0) {
            return <View style={ style }/>
        }

        const changes = []
        for (let i = 0; i < dataPoints.length - 1; i++) {
            const point1 = dataPoints[ i ]
            const point2 = dataPoints[ i + 1 ]
            const diff   = point2 - point1
            if (diff !== 0) {
                const top    = diff > 0 ? point2 : point1
                const bottom = diff > 0 ? point1 : point2
                changes.push({
                    index: i + 1,
                    diff,
                    top,
                    bottom,
                })
            }
        }

        const extent = array.extent([ ...dataPoints, gridMax, gridMin ])
        const ticks  = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        //invert range to support svg coordinate system
        const y = scale.scaleLinear()
            .domain(extent)
            .range([ height - bottom, top ])

        // use index as domain identifier instead of value since
        // same value can occur at several places in dataPoints
        const band = scale.scaleBand()
            .domain(dataPoints.map((_, index) => index))
            .range([ left, width - right ])
            .paddingInner([ spacing ])

        const x = scale.scaleLinear()
            .domain([ 0, dataPoints.length - 1 ])
            .range([ left, width - right ])

        const line = shape.line()
            .x((d, index) => x(index))
            .y(d => y(d))
            .defined(value => typeof value === 'number')
            .curve(curve)
            (dataPoints)

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
                            strokeDasharray={dashArray}
                            strokeWidth={strokeWidth}
                            animate={animate}
                            animationDuration={animationDuration}
                        />
                        { dataPoints.map((value, index) => renderDecorator(
                            {
                                value,
                                x,
                                y,
                                index,
                            }
                        )) }
                        { extras.map((item, index) => renderExtra({ item, index, x, y, width, height })) }
                    </Svg>
                    {
                        changes.map((change, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => onItemPress(dataPoints[ change.index ])}
                                    disabled={!onItemPress}
                                    key={index}
                                    style={{
                                        position: 'absolute',
                                        width: band.bandwidth(),
                                        left: band(change.index),
                                        top: y(change.top),
                                        bottom: height - y(change.bottom),
                                        backgroundColor: change.diff > 0 ? positiveFill : negativeFill,
                                    }}
                                />
                            )
                        })
                    }
                </View>
            </View>
        )
    }
}

WaterfallChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.number).isRequired,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number,
    dashArray: PropTypes.arrayOf(PropTypes.number),
    style: PropTypes.any,
    animate: PropTypes.bool,
    animationDuration: PropTypes.number,
    onItemPress: PropTypes.func,
    curve: PropTypes.func,
    spacing: PropTypes.number,
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
    gridProps: PropTypes.number,
    extras: PropTypes.array,
    renderExtra: PropTypes.func,
    renderDecorator: PropTypes.func,
    positiveFill: PropTypes.string,
    negativeFill: PropTypes.string,
}

WaterfallChart.defaultProps = {
    strokeColor: '#22B6B0',
    positiveFill: 'rgba(34, 128, 176, 0.4)',
    negativeFill: 'rgba(89, 11, 157, 0.4)',
    curve: shape.curveLinear,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    strokeWidth: 3,
    spacing: 0.05,
    gridMin: 0,
    gridMax: 0,
    extras: [],
    renderExtra: () => {
    },
    renderDecorator: () => {
    },
}

export default WaterfallChart
