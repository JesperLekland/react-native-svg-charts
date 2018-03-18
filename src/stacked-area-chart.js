import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import ChartStack from './chart-stacked'

class AreaStack extends ChartStack {

    calcYScale(domain) {
        const {
            yScale,
            contentInset: {
                top = 0,
                bottom = 0,
            },
        } = this.props

        const { height } = this.state

        //invert range to support svg coordinate system
        return yScale()
            .domain(domain)
            .range([ height - bottom, top ])
    }

    calcXScale(domain) {
        const {
            xScale,
            contentInset: {
                left = 0,
                right = 0,
            },
        } = this.props

        const { width } = this.state

        return xScale()
            .domain(domain)
            .range([ left, width - right ])
    }

    calcAreas(series, x, y) {
        const { data, curve, keys, colors } = this.props

        return series.map((serie, index) => {
            const path = shape.area()
                .x((d, index) => x(index))
                .y0(d => y(d[ 0 ]))
                .y1(d => y(d[ 1 ]))
                .curve(curve)
                (data.map((_, index) => serie[ index ]))

            return {
                path,
                key: keys[ index ],
                color: colors[ index ],
            }
        })
    }
}

AreaStack.defaultProps = {
    ...ChartStack.defaultProps,
    xScale: scale.scaleLinear,
    yScale: scale.scaleLinear,
}

export default AreaStack
