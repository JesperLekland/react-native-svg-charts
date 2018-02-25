import React from 'react'
import * as shape from 'd3-shape'
import Chart from './chart'

class LineChart extends React.PureComponent {

    _createPaths = ({ data, x, y }) => {
        const { curve } = this.props

        const line = shape.line()
            .x((d) => x(d.x))
            .y(d => y(d.y))
            .defined(item => typeof item.y === 'number')
            .curve(curve)
            (data)

        return {
            path: line,
            line,
        }
    }

    render() {

        return (
            <Chart
                createPaths={this._createPaths}
                {...this.props}
            />
        )
    }
}

LineChart.propTypes = {
    ...Chart.propTypes,
}

LineChart.defaultProps = {
    ...Chart.defaultProps,
}

export default LineChart
