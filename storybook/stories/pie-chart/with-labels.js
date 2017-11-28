import React from 'react'
import PieChart from '../../../src/pie-chart'
import { Circle, G, Line } from 'react-native-svg'

class PieChartWithLabelExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91 ]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                color: randomColor(),
                key: `pie-${index}`,
            }))

        return (
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
                spacing={ 0 }
                innerRadius={ 20 }
                outerRadius={ 55 }
                labelRadius={ 80 }
                renderDecorator={ ({ item, pieCentroid, labelCentroid, index }) => (
                    <G key={ index }>
                        <Line
                            x1={ labelCentroid[ 0 ] }
                            y1={ labelCentroid[ 1 ] }
                            x2={ pieCentroid[ 0 ] }
                            y2={ pieCentroid[ 1 ] }
                            stroke={ item.color }
                        />
                        <Circle
                            cx={ labelCentroid[ 0 ] }
                            cy={ labelCentroid[ 1 ] }
                            r={ 15 }
                            fill={ item.color }
                        />
                    </G>
                ) }

            />
        )
    }

}

export default PieChartWithLabelExample
