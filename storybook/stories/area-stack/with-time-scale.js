import React from 'react'
import { View } from 'react-native'
import { StackedAreaChart, Grid, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import * as scale from 'd3-scale'
import dateFns from 'date-fns'

class AreaStackChartExample extends React.PureComponent {

    render() {

        const data = [
            {
                month: new Date(2018, 5, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2018, 8, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2018, 9, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2018, 10, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ]

        const colors = [ '#8800cc', '#aa00ff', '#cc66ff', '#eeccff' ]
        const keys = [ 'apples', 'bananas', 'cherries', 'dates' ]

        return (
            <View style={{ height: 200, paddingVertical: 16 }}>
                <StackedAreaChart
                    style={{ flex: 1 }}
                    data={ data }
                    keys={ keys }
                    colors={ colors }
                    curve={ shape.curveNatural }
                    xScale={ scale.scaleTime }
                    xAccessor={ ({ item }) => item.month }
                >
                    <Grid/>
                </StackedAreaChart>
                <XAxis
                    style={{ marginTop: 10, marginHorizontal: -10 }}
                    contentInset={{ left: 10, right: 10 }}
                    numberOfTicks={ 6 }
                    data={ data }
                    xAccessor={ ({ item }) => item.month }
                    scale={ scale.scaleTime }
                    formatLabel={ (value) => dateFns.format(value, 'MMM') }
                />
            </View>
        )
    }
}

export default AreaStackChartExample
