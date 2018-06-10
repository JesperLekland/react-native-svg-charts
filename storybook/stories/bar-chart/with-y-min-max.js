import React from 'react'
import { View } from 'react-native'
import { BarChart, Grid, YAxis } from 'react-native-svg-charts'

class BarChartExample extends React.PureComponent {

    render() {

        const fill = 'rgb(134, 65, 244)'
        const data = [ 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80 ]
        const contentInset = { top: 10, bottom: 10 }
        const yMax = 10
        const yMin = -10

        return (
            <View style={{ height: 200, flexDirection: 'row', padding: 15 }}>
                <YAxis
                    data={ data }
                    contentInset={ contentInset }
                    max={ yMax }
                    min={ yMin }
                />
                <BarChart
                    style={{ flex: 1, marginLeft: 10 }}
                    data={ data }
                    svg={{ fill }}
                    contentInset={ contentInset }
                    yMax={ yMax }
                    yMin={ yMin }
                    clamp={ true }
                >
                    <Grid/>
                </BarChart>
            </View>
        )
    }

}

export default BarChartExample
