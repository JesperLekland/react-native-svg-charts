import React from 'react'
import AreaChart from '../../src/area-chart'
import { LinearGradient, Stop } from 'react-native-svg'

class GradientExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <AreaChart
                style={ { height: 200 } }
                dataPoints={ data }
                contentInset={ { top: 20, bottom: 20 } }
                renderGradient={ ({ id }) => (
                    <LinearGradient id={ id } x1={ '0%' } y={ '0%' } x2={ '0%' } y2={ '100%' }>
                        <Stop offset={ '0%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.8 }/>
                        <Stop offset={ '100%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.2 }/>
                    </LinearGradient>
                ) }
            />
        )
    }

}

export default GradientExample
