import React from 'react'
import { BarChart, Grid } from 'react-native-svg-charts'

class BarChartExample extends React.PureComponent {

    render() {

        const data = [
            {
                value: 10,
                svg: {
                    fill: 'red',
                    onPress: () => console.log('red'),
                },
            },
            {
                value: 20,
                svg: {
                    fill: 'blue',
                    onPress: () => console.log('blue'),
                },
            },
            {
                value: 30,
                svg: {
                    fill: 'green',
                    onPress: () => console.log('green'),
                },
            },
        ]

        return (
            <BarChart
                style={{ height: 200 }}
                data={ data }
                yAccessor={ ({ item }) => item.value }
                contentInset={{ top: 30, bottom: 30 }}
            >
                <Grid/>
            </BarChart>
        )
    }

}

export default BarChartExample
