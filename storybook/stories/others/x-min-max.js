import React from 'react'
import { View } from 'react-native'
import { AreaChart, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import { setHours, format } from 'date-fns'

class GridMinMaxExample extends React.PureComponent {
    render() {
        const data = [
            {
                value: 50,
                date: setHours(new Date(2018, 0, 0), 6),
            },
            {
                value: 10,
                date: setHours(new Date(2018, 0, 0), 9),
            },
            {
                value: 150,
                date: setHours(new Date(2018, 0, 0), 15),
            },
            {
                value: 10,
                date: setHours(new Date(2018, 0, 0), 18),
            },
            {
                value: 100,
                date: setHours(new Date(2018, 0, 0), 21),
            },
            {
                value: 20,
                date: setHours(new Date(2018, 0, 0), 24),
            },
        ]

        const xMin = setHours(new Date(2018, 0, 0), 0)

        return (
            <View style={{ height: 200 }}>
                <AreaChart
                    style={{ flex: 1 }}
                    data={data}
                    svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                    // curve={shape.curveNatural}
                    xMin={xMin}
                    xScale={scale.scaleTime}
                    xAccessor={({ item }) => item.date}
                    yAccessor={({ item }) => item.value}
                    yMax={200}
                />
                <XAxis
                    style={{ marginHorizontal: -10, marginTop: 10 }}
                    contentInset={{ left: 10, right: 10 }}
                    data={data}
                    scale={scale.scaleTime}
                    numberOfTicks={12}
                    xAccessor={({ item }) => item.date}
                    formatLabel={(value) => format(value, 'HH')}
                    min={xMin}
                />
            </View>
        )
    }
}

export default GridMinMaxExample
