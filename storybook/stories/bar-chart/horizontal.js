import React from 'react'
import { View } from 'react-native'
import BarChart from 'src/bar-chart-horizontal'
import { YAxis } from 'react-native-svg-charts'
import { Defs, Line, LinearGradient, Stop, Text } from 'react-native-svg'
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
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
                </LinearGradient>
            </Defs>
        )

        const Grid = ({ ticks, x }) => (

            ticks.map((tick, index) => (
                    <Line
                        key={index}
                        x={x(tick)}
                        y1={'0%'}
                        y2={'100%'}
                        stroke={'rgba(0,0,0,0.2)'}

                    />
                )
            )
        )

        const CUT_OFF = 50
        const Label = ({ item, x, y, index, bandwidth }) => (
            <Text
                key={item.label}
                x={item.value > CUT_OFF ? x(item.value) - 10 : x(item.value) + 10}
                y={y(index) + (bandwidth / 2)}
                fontSize={14}
                fill={item.value > CUT_OFF ? 'white' : 'black'}
                alignmentBaseline={'middle'}
                textAnchor={item.value > CUT_OFF ? 'end' : 'start'}
            >
                {item.label}
            </Text>
        )

        return (
            <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                <YAxis
                    data={data}
                    yAccessor={({ index }) => index}
                    scale={scale.scaleBand}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    formatLabel={(_, index) => data[ index ].label}
                />
                <BarChart
                    style={{ flex: 1, marginLeft: 8 }}
                    data={data}
                    yAccessor={({ item }) => item.value}
                    svg={{
                        fill: 'blue',
                    }}
                    extras={[ Gradient ]}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    gridMin={0}
                    renderDecorator={Label}
                    renderGrid={Grid}
                />
            </View>
        )
    }

}

export default BarChartExample