import React from 'react'
import { AreaChart, Path, XAxis, YAxis } from 'react-native-svg-charts'
import Foo from 'src/foo'
import * as shape from 'd3-shape'

class GridMinMaxExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <Foo>
                <AreaChart
                    style={{ height: 200  }}
                    data={ data }
                    svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                    curve={ shape.curveNatural }
                    gridMax={ 500 }
                    gridMin={ -500 }
                    contentInset={{ top: 10, bottom: 10 }}
                    numberOfTicks={ 6 }
                    extras={ [
                        ({ line }) => (
                            <Path
                                key={ 'line ' }
                                d={ line }
                                stroke={ 'rgb(134, 65, 244)' }
                                fill={ 'none' }
                            />
                        ),
                    ] }
                />
                <YAxis
                    data={ data }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    min={ -500 }
                    max={ 500 }
                    numberOfTicks={ 6 }
                    contentInset={{ top: 10, bottom: 10 }}
                    formatLabel={ value => `${value}ºC` }
                />
                <XAxis
                    style={{ marginVertical: 10 }}
                    data={ data }
                    formatLabel={ (value, index) => index }
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                />
            </Foo>
        )
    }

}

export default GridMinMaxExample
