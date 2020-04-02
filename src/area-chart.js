import * as shape from 'd3-shape'
import PropTypes from 'prop-types'
import Chart from './chart/chart'

class AreaChart extends Chart {
    createPaths({ data, x, y }) {
        const { curve, start } = this.props

        const area = shape
            .area()
            .x((d) => x(d.x))
            .y0(y(start))
            .y1((d) => y(d.y))
            .defined((item) => typeof item.y === 'number')
            .curve(curve)(data)

        const line = shape
            .line()
            .x((d) => x(d.x))
            .y((d) => y(d.y))
            .defined((item) => typeof item.y === 'number')
            .curve(curve)(data)

        return {
            path: area,
            area,
            line,
        }
    }
}

AreaChart.propTypes = {
    ...Chart.propTypes,
    start: PropTypes.number,
}

AreaChart.defaultProps = {
    ...Chart.defaultProps,
    start: 0,
}

export default AreaChart
