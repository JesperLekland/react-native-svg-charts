import React from 'react'
import { BarChart, XAxis } from 'react-native-svg-charts'
import { View } from 'react-native'
import * as scale from 'd3-scale'

class XAxisExample extends React.PureComponent {

    render() {

        const data = [ 14, 80, 100, 55 ]

        const barData = [
            {
                values: data,
                positive: {
                    fill: 'rgb(134, 65, 244)',
                },
                negative: {
                    fill: 'rgba(134, 65, 244, 0.2)',
                },
            },
        ]

        return (
            <View style={{ height: 200, padding: 20 }}>
                <BarChart
                    style={{ flex: 1 }}
                    data={ barData }
                    gridMin={0}
                />
                <XAxis
                    data={ data }
                    scale={scale.scaleBand}
                    formatLabel={ (value, index) => index }
                    labelStyle={ { color: 'black' } }
                />
            </View>
        )
    }

}

export default XAxisExample
