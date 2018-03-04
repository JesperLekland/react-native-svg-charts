import React from 'react'
import { BarChart } from 'react-native-svg-charts'

class BarChartExample extends React.PureComponent {

    render() {

        const fillColor = 'rgb(134, 65, 244)'
        const fillColorNegative = 'rgba(134, 65, 244, 0.2)'

        const data    = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
            .map(number => ({
                value: number,
                svg: {
                    fill: number >= 0 ? fillColor : fillColorNegative,
                },
            }))

        return (
            <BarChart
                style={ { height: 200 } }
                data={data}
                yAccessor={({ item }) => item.value}
                contentInset={ { top: 30, bottom: 30 } }
                { ...this.props }
            />
        )
    }

}

export default BarChartExample
