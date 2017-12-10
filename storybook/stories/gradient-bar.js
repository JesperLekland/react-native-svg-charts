import React from 'react'
import { LinearGradient, Stop } from 'react-native-svg'
import BarChart from '../../src/bar-chart'

class GradientBarExample extends React.PureComponent {

    render() {

        const {
                  fillColor         = 'rgb(134, 65, 244)',
                  fillColorNegative = 'rgb(239, 71, 71)',
              } = this.props

        const data    = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const barData = [
            {
                values: data,
                positive: {
                    fill: fillColor,
                    // other react-native-svg supported props
                },
                negative: {
                    fill: fillColorNegative,
                    // other react-native-svg supported props
                },
            },
        ]

        return (
            <BarChart
                style={ { height: 200 } }
                data={ barData }
                contentInset={ { top: 20, bottom: 20 } }
                renderGradient={ ({ id, value, fill }) => (
                    <LinearGradient id={ id } x1={ '0%' } y={ '0%' } x2={ '0%' } y2={ '100%' }>
                        <Stop offset={ '0%' } stopColor={ value > 0 ? fill : 'rgb(66, 194, 244)' }/>
                        <Stop offset={ '100%' } stopColor={ value < 0 ? fill : 'rgb(66, 194, 244)' }/>
                    </LinearGradient>
                ) }
                svg={ {
                    strokeWidth: 2,
                } }
            />
        )
    }

}

export default GradientBarExample
