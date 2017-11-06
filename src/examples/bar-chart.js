import React from 'react'
import BarChart from '../bar-chart'

class BarChartExample extends React.PureComponent {

    render() {

        const data    = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const barData = [
            {
                values: data,
                fillColor: 'rgb(134, 65, 244)',
                fillColorNegative: 'rgba(134, 65, 244, 0.2)',
            },
        ]

        return (
            <BarChart
                style={ { height: 200 } }
                dataPoints={ barData }
                contentInset={ { top: 30, bottom: 30 } }
            />
        )
    }

}

export default BarChartExample
