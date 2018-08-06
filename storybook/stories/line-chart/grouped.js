import React from 'react'
import { LineChart, Grid } from 'react-native-svg-charts'

class GroupedLineChartExample extends React.PureComponent {

    render() {

        const data1 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const data2 = [ -87, 66, -69, 92, -40, -61, 16, 62, 20, -93, -54, 47, -89, -44, 18 ]

        const data = [
            {
                data: data1,
                svg: { stroke: '#8800cc' },
            },
            {
                data: data2,
                svg: { stroke: 'green' },
            },
        ]

        return (
            <LineChart
                style={{ height: 200 }}
                data={ data }
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid />
            </LineChart>
        )
    }

}

export default GroupedLineChartExample
