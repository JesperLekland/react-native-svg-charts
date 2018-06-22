import * as React from 'react'
import { StackedBarChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { View } from 'react-native'

const Y_BAR_HEIGHT = 90

class StackedBarLabels extends React.PureComponent {
    render() {
        let colors = [ '#7b4173', '#a55194', '#b53684' ]
        let keys = [ 'apples', 'oranges', 'pears' ]

        let data = [
            {
                label: 'One',
                apples: {
                    value: 1,
                },
                oranges: {
                    value: 2,
                },
                pears: {
                    value: 5,
                },
            },
            {
                label: 'Two',
                apples: {
                    value: 4,
                },
                oranges: {
                    value: 5,
                },
                pears: {
                    value: 2,
                },
            },
        ]

        const Labels = ({ x, y, data }) => {
            return data.map((value, index) => {
                let collectedValue = 0
                return keys.map((key, keyIndex) => {
                    let newValue = value[key].value
                    const oldCollectedValue = collectedValue
                    collectedValue = collectedValue + newValue
                    return (<Text
                        key={ ('' + index) + keyIndex }
                        stroke='white' 
                        fontWeight="100" 
                        x={ x(oldCollectedValue) } 
                        y={ y(index) + (Y_BAR_HEIGHT / 2) }> 
                        { newValue } 
                    </Text>)
                })
            })
        }

        return (
            <View style={{ height: 220 }}>
                <View style={{ height: 200, flexDirection: 'row' }}>
                    <StackedBarChart
                        style={{ flex: 1, marginLeft: 16 }}
                        keys={ keys }
                        colors={ colors }
                        data={ data }
                        horizontal={ true }
                        contentInset={{ top: 15, bottom: 15 }}
                        valueAccessor={ ({ item, key }) => item[ key ].value }>
                        <Labels/>
                    </StackedBarChart>
                </View>
            </View>)
    }
}

export default StackedBarLabels
