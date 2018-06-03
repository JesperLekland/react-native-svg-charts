import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Text, View } from 'react-native'

class OrderExample extends React.PureComponent {

    render() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        return (
            <View>
                <Text>grid on top of chart (default)</Text>
                <AreaChart
                    style={{ height: 200 }}
                    data={ data }
                    contentInset={{ top: 30, bottom: 30 }}
                    curve={ shape.curveNatural }
                    svg={{ fill: 'rgba(134, 65, 244, 1)' }}
                />
                <Text>grid underneath chart</Text>
                <AreaChart
                    style={{ height: 200 }}
                    data={ data }
                    contentInset={{ top: 30, bottom: 30 }}
                    curve={ shape.curveNatural }
                    svg={{ fill: 'rgba(134, 65, 244, 1)' }}
                    renderOrder={ () => [ 'grid', 'chart', 'decorators', 'extras' ] }
                />
            </View>
        )
    }
}

export default OrderExample
