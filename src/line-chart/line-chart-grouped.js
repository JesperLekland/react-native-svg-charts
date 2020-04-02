import * as shape from 'd3-shape'
import ChartGrouped from '../chart/chart-grouped'

class LineChartGrouped extends ChartGrouped {
    createPaths({ data, x, y }) {
        const { curve } = this.props

        const lines = data.map((line) =>
            shape
                .line()
                .x((d) => x(d.x))
                .y((d) => y(d.y))
                .defined((item) => typeof item.y === 'number')
                .curve(curve)(line)
        )

        return {
            path: lines,
            lines,
        }
    }
}

LineChartGrouped.propTypes = {
    ...ChartGrouped.propTypes,
}

LineChartGrouped.defaultProps = {
    ...ChartGrouped.defaultProps,
}

export default LineChartGrouped
