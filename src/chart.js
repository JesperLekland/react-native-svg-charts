import * as array from 'd3-array'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import Svg from 'react-native-svg'
import Path from './animated-path'
import Grid from './grid'

class Chart extends PureComponent {

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
            data,
            xAccessor,
            yAccessor,
            yScale,
            xScale,
            style,
            createPaths,
            animate,
            animationDuration,
            showGrid,
            numberOfTicks,
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
            return <View style={style}/>
        }

        const mappedData = data.map((item, index) => ({
            y: yAccessor({ item, index }),
            x: xAccessor({ item, index }),
        }))

        const yValues = mappedData.map(item => item.y)
        const xValues = mappedData.map(item => item.x)

        const yExtent = array.extent([ ...yValues, gridMin, gridMax ])
        const xExtent = array.extent([ ...xValues ])

        //invert range to support svg coordinate system
        const y = yScale()
            .domain(yExtent)
            .range([ height - bottom, top ])

        const x = xScale()
            .domain(xExtent)
            .range([ left, width - right ])

        const paths = createPaths({
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
            <View style={style}>
                <View style={{ flex: 1 }} onLayout={event => this._onLayout(event)}>
                    <Svg style={{ flex: 1 }}>
                        {showGrid && renderGrid({ x, y, ticks, data, gridProps })}
                        <Path
                            fill={'none'}
                            {...svg}
                            d={paths.path}
                            animate={animate}
                            animationDuration={animationDuration}
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
