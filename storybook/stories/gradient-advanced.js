import React from 'react'
import AreaChart from '../../src/area-chart'
import { LinearGradient, Stop } from 'react-native-svg'
import { StyleSheet, View } from 'react-native'

class GradientAdvancedExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const cut = 0.5
        const cutBuffer = 0.001

        return (
            <View>
                <AreaChart
                    style={ { height: 200 } }
                    dataPoints={ data }
                    contentInset={ { top: 20, bottom: 20 } }
                    renderGradient={ ({ id }) => (
                        <LinearGradient id={ id } x1={ '0%' } y1={ '0%' } x2={ '0%' } y2={ '100%' }>
                            <Stop offset={ '0%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.8 }/>
                            <Stop offset={ '100%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.2 }/>
                        </LinearGradient>
                    ) }
                />
                <AreaChart
                    style={ StyleSheet.absoluteFill }
                    dataPoints={ data }
                    contentInset={ { top: 20, bottom: 20 } }
                    showGrid={false}
                    renderGradient={ ({ id }) => (
                        <LinearGradient id={ id } x1={ '0%' } y1={ '0%' } x2={ '100%' } y2={ '0%' }>
                            <Stop offset={ '0' } stopColor={ 'transparent' } stopOpacity={ 0 }/>
                            <Stop offset={ `${cut}` } stopColor={ 'transparent' } stopOpacity={ 0 }/>
                            <Stop offset={ `${cut + cutBuffer}` } stopColor={ 'white' } stopOpacity={ 0.6 }/>
                            <Stop offset={ '1' } stopColor={ 'white' } stopOpacity={ 0.6 }/>
                        </LinearGradient>
                    ) }
                />
            </View>
        )
    }

}

export default GradientAdvancedExample
