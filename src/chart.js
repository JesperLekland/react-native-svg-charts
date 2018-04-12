import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'
import Svg, {Line} from 'react-native-svg'
import Path from './animated-path'
import Grid from './grid'


class Chart extends PureComponent {

    state = {
        width: 0,
        height: 0,
        plotLinesArray: []
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height, width } } } = event
        this.setState({ height, width })
    }

    createPaths() {
        throw 'Extending "Chart" requires you to override "createPaths'
    }

    buildPlotLinesArray = ({ x, y, index, value }) => (
        {x: x(index), index, value}
    )


 binaryInsert(item,sortedList,low = 0,high = (sortedList.length - 1)) {
        if(sortedList && sortedList.length > 0){
    	if (low == high) {
    		// hit end of sortedList - done
    		return low > 0 ? sortedList[low-1].value : 0;
    	}

    	// get midpoint of list and item value
    	let mid = low + Math.floor((high - low) / 2),
    		itemCompare = sortedList[mid].x;

    	if (item > itemCompare) {
    		// work higher end of list
    		return this.binaryInsert(item,sortedList,mid + 1,high);
    	}

    	if (item < itemCompare) {
    		// work lower end of list
    		return this.binaryInsert(item,sortedList,low,mid);
    	}

    	// found equal value - done
    	return mid > 0 ? sortedList[mid-1].value : 0;
        }
        return 0
    }

componentWillReceiveProps (newProps) {
    if(newProps.data && newProps.data.length > 0) {
        const xScale = scale.scaleLinear
        const yScale = scale.scaleLinear
        const xAccessor = ({ index }) => index
        const yAccessor = ({ item }) => item

            const mappedData = newProps.data.map((item, index) => ({
                y: yAccessor({ item, index }),
                x: xAccessor({ item, index }),
            }))

            const yValues = mappedData.map(item => item.y)
            const xValues = mappedData.map(item => item.x)
            const height = this.state.height
            const width = this.state.width
            const bottom = 0
            const top = 0
            const left = 0
            const right = 0


            const yExtent = array.extent([ ...yValues ])
            const xExtent = array.extent([ ...xValues ])
            const y = yScale()
                .domain(yExtent)
                .range([ height - bottom, top ])

            const x = xScale()
                .domain(xExtent)
                .range([ left, width - right ])
            const plotLinesArray = newProps.data.map((value, index) => (this.buildPlotLinesArray({ x, y, value, index })))
            this.setState({plotLinesArray})
    }
}


    render() {

        const {
            data,
            xAccessor,
            yAccessor,
            yScale,
            xScale,
            style,
            animate,
            animationDuration,
            showGrid,
            numberOfTicks,
            showPlotLines,
            plotLines,
            contentInset: {
                top = 0,
                bottom = 0,
                left = 0,
                right = 0,
            },
            gridMax,
            gridMin,
            renderDecorator,
            extras,
            gridProps,
            svg,
            renderGrid = Grid,
        } = this.props
        const { width, height } = this.state

        if (data.length === 0) {
            return <View style={ style }/>
        }

        const mappedData = data.map((item, index) => ({
            y: yAccessor({ item, index }),
            x: xAccessor({ item, index }),
        }))

        const yValues = mappedData.map(item => item.y)
        const xValues = mappedData.map(item => item.x)


        const yExtent = array.extent([ ...yValues ])
        const xExtent = array.extent([ ...xValues ])
        //invert range to support svg coordinate system
        const y = yScale()
            .domain(yExtent)
            .range([ height - bottom, top ])
        const x = xScale()
            .domain(xExtent)
            .range([ left, width - right ])

        const paths = this.createPaths({
            data: mappedData,
            x,
            y,
        })

        const ticks = y.ticks(numberOfTicks)

        const extraData = {
            x,
            y,
            width,
            height,
            ...paths,
        }


        return (
            <View style={ style }>
        <Text>{this.binaryInsert(plotLines.nativeEventX, this.state.plotLinesArray)}</Text>
                <View style={{ flex: 1 }} onLayout={ event => this._onLayout(event) }>
                    <Svg style={{ flex: 1 }}>
                        {showGrid && renderGrid({ x, y, ticks, data, gridProps })}
                        {showPlotLines && <Line
                                                x1= { plotLines.nativeEventX }
                                                y1="0"
                                                x2= { plotLines.nativeEventX }
                                                y2= { height }
                                                stroke="red"
                                                strokeWidth="2" />}
                        <Path
                            fill={ 'none' }
                            { ...svg }
                            d={ paths.path }
                            animate={ animate }
                            animationDuration={ animationDuration }
                        />

                        {data.map((value, index) => renderDecorator({ x, y, value, index }))}
                        {extras.map((item, index) => item({ ...extraData, index }))}
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
    extras: PropTypes.arrayOf(PropTypes.func),

    renderDecorator: PropTypes.func,

    gridMin: PropTypes.number,
    gridMax: PropTypes.number,
    showPlotLines: PropTypes.bool,
    plotLines: PropTypes.object,
    showGrid: PropTypes.bool,
    gridProps: PropTypes.object,
    renderGrid: PropTypes.func,

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
    showPlotLines: false,
    showGrid: true,
    extras: [],
    xScale: scale.scaleLinear,
    yScale: scale.scaleLinear,
    xAccessor: ({ index }) => index,
    yAccessor: ({ item }) => item,
    renderDecorator: () => {
    },
}

export default Chart
