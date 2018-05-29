import React from 'react'
import { Grid, StackedBarChart } from 'react-native-svg-charts'

const getItem = (index, key) => {
    // const value = getRandomInt()
    const value = Math.round(Math.random() * 3440 + 480)
    const onPress = () => console.warn(`onPress => ${index}:${key}:${value}`)
    return { value, onPress }
}

const times = 5
const colors = [ '#33691E', '#689F38', '#9CCC65', '#DCEDC8' ]
const keys = [ 'broccoli', 'celery', 'onions', 'tomato' ]
const data = [ ...Array(times) ].map((_, index) =>
    keys.reduce((obj, key) => ({ ...obj, [key]: getItem(index, key) }), {})
)

class StackedBarChartWithOnPressExample extends React.PureComponent {
    valueAccessor = ({ item, key }) => item[key].value

    render() {
        return (
            <StackedBarChart
                style={{ height: 300 }}
                colors={ colors }
                contentInset={{ top: 30, bottom: 30 }}
                data={ data }
                keys={ keys }
                valueAccessor={ this.valueAccessor }
            >
                <Grid />
            </StackedBarChart>
        )
    }
}

export default StackedBarChartWithOnPressExample
