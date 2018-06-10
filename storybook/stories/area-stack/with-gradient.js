import React from 'react'
import { StackedAreaChart, Grid } from 'react-native-svg-charts'
import { Defs, Stop, LinearGradient } from 'react-native-svg'
import * as shape from 'd3-shape'

class AreaStackChartExample extends React.PureComponent {

    render() {

        const data = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ]

        const Gradient = ({ index }) => (
            <Defs key={ index }>
                <LinearGradient id={ 'gradient' } x1={ '0%' } y={ '0%' } x2={ '100%' } y2={ '0%' }>
                    <Stop offset={ '0%' } stopColor={ 'rgb(134, 65, 244)' }/>
                    <Stop offset={ '100%' } stopColor={ '#eeccff' }/>
                </LinearGradient>
            </Defs>
        )

        const colors = [ '#8800cc', '#aa00ff', '#cc66ff', '#eeccff' ]
        const keys = [ 'apples', 'bananas', 'cherries', 'dates' ]
        const svgs = [
            { fill: 'url(#gradient)' },
            { onPress: () => console.log('bananas') },
            { onPress: () => console.log('cherries') },
            { onPress: () => console.log('dates') },
        ]

        return (
            <StackedAreaChart
                style={{ height: 200, paddingVertical: 16 }}
                data={ data }
                keys={ keys }
                colors={ colors }
                curve={ shape.curveNatural }
                svgs={ svgs }
            >
                <Grid/>
                <Gradient/>
            </StackedAreaChart>
        )
    }
}

export default AreaStackChartExample
