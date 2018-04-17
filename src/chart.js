import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import Svg, { Line } from 'react-native-svg'
import Path from './animated-path'

class Chart extends PureComponent {
    state = {
        width: 0,
        height: 0,
        plotLinesArray: [],
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    createPaths() {
        throw 'Extending "Chart" requires you to override "createPaths'
    }
    buildPlotLinesArray = ({ x, index, value }) => (
        { x: x(index), index, value }
    )

    binaryInsert(item,sortedList,low = 0,high = (sortedList.length - 1)) {
        if(sortedList && sortedList.length > 0){
            if (low == high) {
                // hit end of sortedList - done
                return low > 0 ? sortedList[low - 1].value : 0
            }

            // get midpoint of list and item value
            let mid = low + Math.floor((high - low) / 2),
                itemCompare = sortedList[mid].x

            if (item > itemCompare) {
                // work higher end of list
                return this.binaryInsert(item,sortedList,mid + 1,high)
            }

            if (item < itemCompare) {
                // work lower end of list
                return this.binaryInsert(item,sortedList,low,mid)
            }

            // found equal value - done
            return mid > 0 ? sortedList[mid - 1].value : 0
        }
        return 0
    }

    componentWillReceiveProps (newProps) {
        const {
            data,
            xAccessor,
            yAccessor,
            yScale,
            xScale,
            numberOfTicks,
            contentInset: {
                top = 0,
                bottom = 0,
                left = 0,
                right = 0,
            },
        } = newProps

        const { width, height } = this.state
        if(data && data.length > 0) {
            const mappedData = data.map(items =>
                items.datapoints.map((item, i) => ({
                    y: yAccessor({ item, i }),
                    x: xAccessor({ item, i }),
                })))

            let yValues = []
            const yValuesSequence = data.map(items => items.datapoints.map(item => yValues.push(item[1])))
            let xValues = []
            const xValuesSequence = data.map(items => items.datapoints.map(item => xValues.push(item[0])))

            const yExtent = array.extent([ ...yValues ])
            const xExtent = array.extent([ ...xValues ])
            const xScaleFactor = Math.max(...xValuesSequence.map(items => items.length))
            //invert range to support svg coordinate system

            const y = yScale()
                .domain(yExtent)
                .range([ height - bottom, top ])
            const x = xScale()
                .domain(xExtent)
                .range([ left, width - right ])
            const x2 = xScale()
                .domain([ 0, xScaleFactor - 1 ])
                .range([ left, width - right ])

            const pathsArr = mappedData.map(items => this.createPaths({
                data: items,
                x,
                y,
            }))

            this.setState({ pathsArr })

            const ticks = y.ticks(numberOfTicks)

            this.setState({ ticks })

            const plotLinesArray = newProps.data.map(items => items.datapoints.map((value, index) => {
                return this.buildPlotLinesArray({ x: x2, y, value, index })
            }))
            this.setState({ plotLinesArray })
            const extraProps = {
                x,
                y,
                data,
                ticks,
                width,
                height,
                ...pathsArr,
            }
            this.setState({ extraProps })
        }
    }

    render() {
        const { height, extraProps } = this.state
        const {
            data,
            style,
            plotLines,
            showPlotLines,
            plotLinesProps,
            svg,
            animate,
            animationDuration,
            children,
        } = this.props

        if (data.length === 0) {
            return <View style={ style }/>
        }

        return (
            <View style={ style }>
                <Text>
                    {this.state.plotLinesArray.map(items=>this.binaryInsert(plotLines.nativeEventX, items))}
                </Text>
                <View style={{ flex: 1 }} onLayout={ event => this._onLayout(event) }>
                    <Svg style={{ flex: 1 }}>
                        {
                            React.Children.map(children, child => {
                                if (child.props.belowChart) {
                                    return React.cloneElement(child, extraProps)
                                }
                                return null
                            })
                        }
                        {showPlotLines &&
                            <Line
                                x1= { plotLines.nativeEventX }
                                y1="0"
                                x2= { plotLines.nativeEventX }
                                y2= { height }
                                stroke={ plotLinesProps.stroke }
                                strokeWidth={ plotLinesProps.strokeWidth } />
                        }
                        {this.state.pathsArr && this.state.pathsArr.length > 0 &&
                            this.state.pathsArr.map((paths, index) =>
                                <Path
                                    key = { index }
                                    fill={ 'none' }
                                    { ...svg }
                                    d={ paths.path }
                                    animate={ animate }
                                    animationDuration={ animationDuration }
                                />
                            )
                        }
                        {
                            React.Children.map(children, child => {
                                if (!child.props.belowChart) {
                                    return React.cloneElement(child, extraProps)
                                }
                                return null
                            })
                        }

                    </Svg>
                </View>
            </View>
        )
    }
}

Chart.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.number),
    ]).isRequired,
    svg: PropTypes.object,

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

    gridMin: PropTypes.number,
    gridMax: PropTypes.number,
    gridProps: PropTypes.object,

    showPlotLines: PropTypes.bool,
    plotLines: PropTypes.object,
    plotLinesProps: PropTypes.object,

    xScale: PropTypes.func,
    yScale: PropTypes.func,

    xAccessor: PropTypes.func,
    yAccessor: PropTypes.func,
}

Chart.defaultProps = {
    svg: {},
    width: 100,
    height: 100,
    curve: shape.curveLinear,
    contentInset: {},
    numberOfTicks: 10,
    xScale: scale.scaleLinear,
    yScale: scale.scaleLinear,
    xAccessor: ({ index }) => index,
    yAccessor: ({ item }) => item,
    plotLinesProps: { stroke: 'red', strokeWidth: '2' },
}

export default Chart
