import React from 'react'
import { LinearGradient, Stop } from 'react-native-svg'
import LineChart from '../../src/line-chart'

class GradientLineExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <LineChart
                style={ { height: 200 } }
                dataPoints={ data }
                contentInset={ { top: 20, bottom: 20 } }
                renderGradient={ ({ id }) => (
                    <LinearGradient id={ id } x1={ '0%' } y={ '0%' } x2={ '100%' } y2={ '0%' }>
                        <Stop offset={ '0%' } stopColor={ 'rgb(134, 65, 244)' }/>
                        <Stop offset={ '100%' } stopColor={ 'rgb(66, 194, 244)' }/>
                    </LinearGradient>
                ) }
                svg={{
                    strokeWidth: 2,
                }}
            />
        )
    }

}

export default GradientLineExample
