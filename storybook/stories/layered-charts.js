import React from 'react'
import AreaChart from '../../src/area-chart'
import * as shape from 'd3-shape'
import { StyleSheet, View } from 'react-native'

class LayeredChartsExample extends React.PureComponent {

    render() {

        const data  = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const data2 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ].reverse()

        return (
            <View style={ { height: 200 } }>
                <AreaChart
                    style={ { flex: 1 } }
                    dataPoints={ data }
                    fillColor={ 'rgba(134, 65, 244, 0.5)' }
                    strokeColor={ 'rgb(134, 65, 244)' }
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                />
                <AreaChart
                    style={ StyleSheet.absoluteFill }
                    dataPoints={ data2 }
                    fillColor={ 'rgba(34, 128, 176, 0.5)' }
                    strokeColor={ 'rgb(34, 128, 176)' }
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                />
            </View>
        )
    }

}

export default LayeredChartsExample
