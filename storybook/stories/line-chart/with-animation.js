import React from 'react'
import { View, Button } from 'react-native'
import { LineChart, Grid } from 'react-native-svg-charts'

const data1 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
const data2 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 95, -4, -24 ]

class LineChartExample extends React.PureComponent {

    state = {
        data: data1,
    }

    _onPress = () => {
        this.setState(state => ({
            data: state.data === data1 ? data2 : data1,
        }))
    }

    render() {

        return (
            <View>
                <LineChart
                    style={{ height: 200 }}
                    data={ this.state.data }
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                    animate={ true }
                >
                    <Grid/>
                </LineChart>
                <Button
                    title={ 'animate' }
                    onPress={ this._onPress }
                />
            </View>

        )
    }

}

export default LineChartExample
