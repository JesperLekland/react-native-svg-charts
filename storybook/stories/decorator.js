import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import { Circle } from 'react-native-svg'

class DecoratorExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <AreaChart
                style={ { height: 200 } }
                data={ data }
                svg={ { fill: 'rgba(134, 65, 244, 0.2)' } }
                contentInset={ { top: 20, bottom: 30 } }
                renderDecorator={ ({ x, y, index, value }) => (
                    <Circle
                        key={ index }
                        cx={ x(index) }
                        cy={ y(value) }
                        r={ 4 }
                        stroke={ 'rgb(134, 65, 244)' }
                        fill={ 'white' }
                    />
                ) }
            />
        )
    }

}

export default DecoratorExample
