import React from 'react'
import { BarChart, XAxis } from '../../../src'
import { View } from 'react-native'

class XAxisExample extends React.PureComponent {

    render() {

        const data    = [ 14, -1, 100, -95, -94, -24, -8, 85, -91, 35, -53, 53, -78, 66, 96, 33, -26, -32, 73, 8 ]
        const barData = [
            {
                values: data,
                fillColor: 'rgb(134, 65, 244)',
                fillColorNegative: 'rgba(134, 65, 244, 0.2)',
            },
        ]

        return (
            <View style={ { height: 200 } }>
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
