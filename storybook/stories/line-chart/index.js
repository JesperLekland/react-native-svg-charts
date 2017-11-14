import React from 'react'
import LineChart from '../../../src/line-chart'
import * as shape from 'd3-shape'

class LineChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <LineChart
                style={ { height: 200 } }
                dataPoints={ data }
                fillColor={ 'purple' }
                strokeColor={ 'rgb(134, 65, 244)' }
                shadowColor={ 'rgba(134, 65, 244, 0.2)' }
                contentInset={ { top: 20, bottom: 20 } }
                curve={shape.curveLinear}
                { ...this.props }
            />
        )
    }

}

export default LineChartExample
