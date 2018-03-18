import React from 'react'
import { BarChart, XAxis } from 'react-native-svg-charts'
import { View } from 'react-native'
import * as scale from 'd3-scale'

class XAxisExample extends React.PureComponent {

    render() {
        const data = [
            {
                value: 14,
            },
            {
                value: 80,
                svg: {
                    fill: 'purple',
                },
            },
            {
                value: 100,
                svg: {
                    fontWeight: '200',
                },
            },
            {
                value: 55,
                svg: {
                    fontSize: '20',
                    fill: 'orange',
                },
            },
        ]

        return (
            <View style={{ height: 200, padding: 20 }}>
                <BarChart
                    style={{ flex: 1 }}
                    data={ data }
                    yAccessor={ ({ item }) => item.value }
                    gridMin={ 0 }
                    svg={{ fill: 'rgb(134, 65, 244)' }}
                />
                <XAxis
                    style={{ marginTop: 10 }}
                    data={ data }
                    scale={ scale.scaleBand }
                    xAccessor={ ({ item }) => item.value }
                    svg={{ fontWeight: 'bold' }}
                />
            </View>
        )
    }

}

export default XAxisExample
