import React from 'react'
import AreaChart from '../../../src/area-chart'
import * as shape from 'd3-shape'

class AreaChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <AreaChart
                style={ { height: 200 } }
                dataPoints={ data }
                contentInset={ { top: 30, bottom: 30 } }
                curve={shape.curveNatural}
                svg={{
                    fill: 'rgba(134, 65, 244, 0.2)',
                    stroke: 'rgb(134, 65, 244)',
                }}
                { ...this.props }
            />
        )
    }
}

export default AreaChartExample
