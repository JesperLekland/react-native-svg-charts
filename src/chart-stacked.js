import PropTypes from 'prop-types'
import * as array from 'd3-array'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'
import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { G, Svg } from 'react-native-svg'
import Grid from './grid'
import Path from './animated-path'

class ChartStack extends PureComponent {

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

    calcXScale() {
        throw 'calcXScale is not implemented'
    }

    calcYScale() {
        throw 'calcYScale is not implemented'
    }

    calcAreas() {
        throw 'calcAreas is not implemented'
    }

    render() {

        const {
            data,
            keys,
            animate,
            animationDuration,
            style,
            renderGradient,
            showGrid,
            numberOfTicks,
            gridMin,
            gridMax,
            gridProps,
            renderDecorator,
            extras,
            offset,
            order,
            horizontal,
            start,
            xScale,
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
        const indexes = values.map((_, index) => index)

        const extent = array.extent([ ...values, gridMin, gridMax ])
        const ticks = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        const xDomain = xScale === horizontal ?
            extent :
            xScale === scale.scaleLinear ?
                [ start, data.length - 1 ] : indexes
        const yDomain = horizontal ? indexes : extent

        const y = this.calcYScale(yDomain)
        const x = this.calcXScale(xDomain)

        const areas = this.calcAreas(series, x, y)

        const extraData = {
            x,
            y,
            width,
            height,
        }

        return (
            <View style={ style }>
                <View
                    style={{ flex: 1 }}
                    onLayout={ event => this._onLayout(event) }
                >
                    <Svg style={{ flex: 1 }}>
                        {showGrid &&
                        <Grid
                            ticks={ ticks }
                            y={ y }
                            gridProps={ gridProps }
                        />
                        }
                        {areas.map((area) => (
                            <G key={ area.key }>
                                <Path
                                    animate={ animate }
                                    animationDuration={ animationDuration }
                                    d={ area.path }
                                    fill={ renderGradient ? `url(#gradient-${area.key})` : area.color }
                                />
                            </G>
                        ),
                        )}
                        {series.map((serie) => data.map((key, index) => {
                            return renderDecorator({ x, y, index, value: serie[ index ][ 1 ] })
                        }))}
                        {extras.map((item, index) => item({ ...extraData, index }))}
                    </Svg>
                </View>
            </View>
        )
    }
}

ChartStack.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    keys: PropTypes.arrayOf(PropTypes.string).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    offset: PropTypes.func,
    order: PropTypes.func,
    renderGradient: PropTypes.func,
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
    start: PropTypes.number,
    yScale: PropTypes.func,
    xScale: PropTypes.func,
}

ChartStack.defaultProps = {
    curve: shape.curveLinear,
    offset: shape.stackOffsetNone,
    order: shape.stackOrderNone,
    strokeWidth: 2,
    contentInset: {},
    numberOfTicks: 10,
    showGrid: true,
    start: 0,
    extras: [],
    yScale: scale.scaleLinear,
    xScale: scale.scaleLinear,
    renderDecorator: () => {
    },

}

export default ChartStack
