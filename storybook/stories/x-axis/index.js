import React from 'react'
import { BarChart, XAxis } from '../../../src'
import { View } from 'react-native'

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
            <View style={ { height: 200, padding: 20 } }>
                <BarChart
                    style={ { flex: 1 } }
                    data={ barData }
                />
                <XAxis
                    style={ { paddingVertical: 4 } }
                    values={ data }
                    formatLabel={ (value, index) => index }
                    chartType={ XAxis.Type.BAR }
                    labelStyle={ { color: 'black' } }
                />
            </View>
        )
    }

}

export default XAxisExample
