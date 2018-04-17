import React from 'react'
import { View } from 'react-native'
import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop, Text } from 'react-native-svg'
import * as scale from 'd3-scale'

class BarChartExample extends React.PureComponent {

    render() {

        const data = [
            {
                value: 50,
                label: 'Default',
            },
            {
                value: 10,
                label: 'PurpleOpacity',
                svg: {
                    fill: 'rgba(134, 65, 244, 0.5)',
                },
            },
            {
                value: 40,
                label: 'PurpleDash',
                svg: {
                    stroke: 'purple',
                    strokeWidth: 2,
                    fill: 'white',
                    strokeDasharray: [ 4, 2 ],
                },
            },
            {
                value: 95,
                label: 'Gradient',
                svg: {
                    fill: 'url(#gradient)',
                },
            },
            {
                value: 85,
                label: 'Green',
                svg: {
                    fill: 'green',
                },
            },
        ]

        const Gradient = () => (
            <Defs key={ 'gradient' }>
                <LinearGradient id={ 'gradient' } x1={ '0' } y={ '0%' } x2={ '100%' } y2={ '0%' }>
                    <Stop offset={ '0%' } stopColor={ 'rgb(134, 65, 244)' }/>
                    <Stop offset={ '100%' } stopColor={ 'rgb(66, 194, 244)' }/>
                </LinearGradient>
            </Defs>
        )

        const CUT_OFF = 50
        const Labels = ({  x, y, bandwidth, data }) => (
            data.map((item, index) => (
                <Text
                    key={ item.label }
                    x={ item.value > CUT_OFF ? x(0) + 10 : x(item.value) + 10 }
                    y={ y(index) + (bandwidth / 2) }
                    fontSize={ 14 }
                    fill={ item.value > CUT_OFF ? 'white' : 'black' }
                    alignmentBaseline={ 'middle' }
                >
                    {item.label}
                </Text>
            ))
        )

        return (
            <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                <YAxis
                    data={ data }
                    yAccessor={ ({ index }) => index }
                    scale={ scale.scaleBand }
                    contentInset={{ top: 10, bottom: 10 }}
                    spacingInner={ 0.2 }
                    formatLabel={ (_, index) => data[ index ].label }
                />
                <BarChart
                    style={{ flex: 1, marginLeft: 8 }}
                    data={ data }
                    horizontal={ true }
                    yAccessor={ ({ item }) => item.value }
                    svg={{
                        fill: 'blue',
                    }}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacingInner={ 0.2 }
                    gridMin={ 0 }
                >
                    <Grid direction={ Grid.Direction.VERTICAL }/>
                    <Gradient/>
                    <Labels/>
                </BarChart>
            </View>
        )
    }

}

export default BarChartExample
