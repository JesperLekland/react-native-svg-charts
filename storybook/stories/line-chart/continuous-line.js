import React from 'react'
import { LineChart, Grid } from 'react-native-svg-charts'

class ContinuousLineLineChartExample extends React.PureComponent {
    render() {
        const data = [50, 10, 40, 95, null, -24, 85, 91, 35, 53, -53, null, 50, -20, -80]

        return (
            <LineChart
                style={{ height: 200 }}
                data={data}
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
                continuousLine
            >
                <Grid />
            </LineChart>
        )
    }
}

export default ContinuousLineLineChartExample
