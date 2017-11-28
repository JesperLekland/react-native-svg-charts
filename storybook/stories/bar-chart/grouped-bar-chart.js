import React from 'react'
import BarChart from '../../../src/bar-chart'

class GroupedBarChartExample extends React.PureComponent {

    render() {

        const data1 = [ 14, -1, 100, -95, -94, -24, -8, 85, -91, 35, -53, 53, -78, 66, 96, 33, -26, -32, 73, 8 ]
        const data2 = [ 24, 28, 93, 77, -42, -62, 52, -87, 21, 53, -78, -62, -72, -6, 89, -70, -94, 10, 86, 84 ]

        const {
                  fillColor1         = 'rgb(134, 65, 244)',
                  fillColorNegative1 = 'rgba(134, 65, 244, 0.2)',
                  fillColor2         = 'rgb(244, 115, 65)',
                  fillColorNegative2 = 'rgb(244, 115, 65, 0.2)',
              } = this.props

        const barData = [
            {
                values: data1,
                fillColor: fillColor1,
                fillColorNegative: fillColorNegative1,
            },
            {
                values: data2,
                fillColor: fillColor2,
                fillColorNegative: fillColorNegative2,
            },
        ]

        return (
            <BarChart
                style={ { height: 200 } }
                data={ barData }
                contentInset={ { top: 30, bottom: 30 } }
                { ...this.props }
            />
        )
    }

}

export default GroupedBarChartExample
