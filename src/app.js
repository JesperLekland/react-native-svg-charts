import * as shape from 'd3-shape'
import * as dateFns from 'date-fns'
import React, { Component } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { G, Line, LinearGradient, Stop } from 'react-native-svg'
import Label from './assets/d3.png'
import Card from './card'
import Point from './chart-decorators/point'
import Tooltip from './chart-decorators/tooltip'
import {
    AreaChart,
    BarChart,
    Decorators,
    HorizontalLabeledBarChart,
    LineChart,
    PieChart,
    ProgressCircle,
    WaterfallChart,
    XAxis,
    YAxis,
} from './index'

const _data = [
    [
        { 'value': 80, 'key': 'Fun activities', color: 'blue', date: new Date(2016, 7) },
        { 'value': 15, 'key': 'Dog', color: 'green', date: new Date(2016, 8) },
        { 'value': 150, 'key': 'Food', color: 'purple', date: new Date(2016, 9) },
        { 'value': 10, 'key': 'YouFood', color: 'purple', date: new Date(2016, 10) },
        { 'value': 100, 'key': 'barfoo', color: 'purple', date: new Date(2016, 11) },
        { 'value': -23, 'key': 'Car', color: 'gray', date: new Date(2016, 12) },
        { 'value': 220, 'key': 'Rent', color: 'red', date: new Date(2017, 1) },
        { 'value': 20, 'key': 'Rent2', color: 'red', date: new Date(2017, 2) },
        { 'value': 30, 'key': 'bar', color: 'red', date: new Date(2017, 3) },
        { 'value': -40, 'key': 'baz', color: 'orange', date: new Date(2017, 4) },
        { 'value': -100, 'key': 'foobar', color: 'orange', date: new Date(2017, 5) },
    ],
    [
        { 'value': 60, 'key': 'Fun activities', color: 'blue', date: new Date(2016, 7) },
        { 'value': 150, 'key': 'Dog', color: 'green', date: new Date(2016, 8) },
        { 'value': 15, 'key': 'Food', color: 'purple', date: new Date(2016, 9) },
        { 'value': undefined, 'key': 'YouFood', color: 'purple', date: new Date(2016, 10) },
        { 'value': 10, 'key': 'barfoo', color: 'purple', date: new Date(2016, 11) },
        { 'value': -23, 'key': 'Car', color: 'gray', date: new Date(2016, 12) },
        { 'value': 220, 'key': 'Rent', color: 'red', date: new Date(2017, 1) },
        { 'value': undefined, 'key': 'Rent2', color: 'red', date: new Date(2017, 2) },
        { 'value': 0, 'key': 'bar', color: 'red', date: new Date(2017, 3) },
        { 'value': -40, 'key': 'baz', color: 'orange', date: new Date(2017, 4) },
        { 'value': -100, 'key': 'foobar', color: 'orange', date: new Date(2017, 5) },
    ],
    [
        { 'value': 30, 'key': 'Fun activities', color: 'blue', date: new Date(2017, 10) },
        { 'value': 65, 'key': 'Dog', color: 'green', date: new Date(2017, 11) },
        { 'value': -200, 'key': 'Foo', color: 'green', date: new Date(2017, 12) },
        { 'value': 10, 'key': 'Food', color: 'purple', date: new Date(2018, 1) },
        { 'value': 230, 'key': 'Car', color: 'gray', date: new Date(2018, 2) },
        { 'value': 20, 'key': 'Rent', color: 'red', date: new Date(2018, 3) },
        { 'value': 410, 'key': 'Misc', color: 'orange', date: new Date(2018, 4) },
    ],
    [
        { 'value': 30, 'key': 'Fun activities', color: 'blue', date: new Date(2017, 10) },
        { 'value': 65, 'key': 'Dog', color: 'green', date: new Date(2017, 11) },
    ],
    [
        { 'value': 30, 'key': 'Fun activities', color: 'blue', date: new Date(2017, 10) },
    ],
    [],
]

const _progressData = [
    0.4,
    0.8,
    0.2,
    1,
    0,
    0.95,
]

const _multipleBarData = [
    {
        fillColor: 'green',
        strokeColor: 'green',
        strokeColorNegative: 'red',
        fillColorNegative: 'red',
        values: _data[ 0 ].map(obj => obj.value),
    },
    {
        fillColor: 'blue',
        strokeColor: 'blue',
        strokeColorNegative: 'orange',
        fillColorNegative: 'orange',
        values: _data[ 1 ].map(obj => obj.value),
    },
]

const WATERFALL_DATA = [ 5, -2, 0, 0, 5, 5, 5, 0, 0, -1, -1, -2, -2, 1, 1, 0, 0, 2, 4, 6, -4, -4, -4, 10, 10, 10 ]

const CASHFLOW_DATA = [
    { date: '2017-10-25T12:23:00.388Z', amount: 470986.05999999994 },
    { date: '2017-10-26T12:23:00.388Z', amount: 395114.05999999994 },
    { date: '2017-10-27T12:23:00.388Z', amount: 564537.0599999999 },
    { date: '2017-10-28T12:23:00.388Z', amount: 552047.0599999999 },
    { date: '2017-10-29T13:23:00.388Z', amount: 470884.05999999994 },
    { date: '2017-10-30T13:23:00.388Z', amount: 536444.8399999999 },
    { date: '2017-10-31T13:23:00.388Z', amount: -2516492.84 },
    { date: '2017-11-01T13:23:00.388Z', amount: -2507596.84 },
    { date: '2017-11-02T13:23:00.388Z', amount: 2531371.84 },
    { date: '2017-11-03T13:23:00.388Z', amount: 2577592.84 },
    { date: '2017-11-04T13:23:00.388Z', amount: 2577592.84 },
    { date: '2017-11-05T13:23:00.388Z', amount: 2565873.84 },
    { date: '2017-11-06T13:23:00.388Z', amount: 2541708.84 },
    { date: '2017-11-07T13:23:00.388Z', amount: 2541708.84 },
    { date: '2017-11-08T13:23:00.388Z', amount: 2487333.84 },
    { date: '2017-11-09T13:23:00.389Z', amount: 2470303.84 },
    { date: '2017-11-10T13:23:00.389Z', amount: 2675255.84 },
    { date: '2017-11-11T13:23:00.389Z', amount: 2675255.84 },
    { date: '2017-11-12T13:23:00.389Z', amount: 1592701.8399999999 },
    { date: '2017-11-13T13:23:00.389Z', amount: 1100572.8399999999 },
    { date: '2017-11-14T13:23:00.389Z', amount: 1100572.8399999999 },
    { date: '2017-11-15T13:23:00.389Z', amount: 1100572.8399999999 },
    { date: '2017-11-16T13:23:00.389Z', amount: 1100572.8399999999 },
    { date: '2017-11-17T13:23:00.389Z', amount: 1100572.8399999999 },
    { date: '2017-11-18T13:23:00.389Z', amount: 1100572.8399999999 },
    { date: '2017-11-19T13:23:00.389Z', amount: 1100572.8399999999 },
    { date: '2017-11-20T13:23:00.389Z', amount: 1100572.8399999999 },
    { date: '2017-11-21T13:23:00.390Z', amount: 1100572.8399999999 },
    { date: '2017-11-22T13:23:00.390Z', amount: 1100572.8399999999 },
    { date: '2017-11-23T13:23:00.390Z', amount: 1100572.8399999999 },
]

const FLEX_1 = { flex: 1 }
class App extends Component {

    state = {
        index: 0,
        data: _data[ 0 ],
        progress: _progressData[ 0 ],
    }

    _toggleData() {
        const { index } = this.state

        const newIndex = index < _data.length - 1 ? index + 1 : 0

        this.setState({
            data: _data[ newIndex ],
            progress: _progressData[ newIndex ],
            index: newIndex,
        })
    }

    render() {
        const { data, progress } = this.state
        return (
            <View style={styles.flex1}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.card}>
                        <View style={{ height: 200, flexDirection: 'row' }}>
                            <YAxis
                                dataPoints={WATERFALL_DATA}
                                contentInset={{ top: 20, bottom: 40, left: 10, right: 10 }}
                                numberOfTicks={6}
                            />
                            <View style={{ flex: 1 }}>
                                <WaterfallChart
                                    style={{ flex: 1 }}
                                    dataPoints={WATERFALL_DATA}
                                    dashArray={[ 3, 5 ]}
                                    numberOfTicks={6}
                                    contentInset={{ top: 20, bottom: 20, left: 10, right: 10 }}
                                />
                                <XAxis
                                    values={WATERFALL_DATA}
                                    style={{ height: 20 }}
                                    chartType={XAxis.Type.BAR}
                                    contentInset={{ left: 10, right: 10 }}
                                    formatLabel={(value, index) => index}
                                    labelStyle={{ fontSize: 6 }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', height: 200 }}>
                            <YAxis
                                style={{ paddingRight: 5 }}
                                contentInset={{ bottom: 20 }}
                                dataPoints={_multipleBarData[ 0 ].values}
                                labelStyle={{ color: 'grey' }}
                            />
                            <View style={styles.flex1}>
                                <BarChart
                                    style={FLEX_1}
                                    data={_multipleBarData}
                                    spacing={0.3}
                                />
                                <XAxis
                                    chartType={XAxis.Type.BAR}
                                    spacing={0.3}
                                    style={{ height: 20, justifyContent: 'center' }}
                                    values={_data[ 0 ].map(data => data.date)}
                                    formatLabel={date => dateFns.format(date, 'MMM')}
                                    labelStyle={{ color: 'grey', fontSize: 8 }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={[ styles.card, { height: 120 } ]}>
                        <ProgressCircle
                            style={styles.flex1}
                            progress={progress}
                        />
                    </View>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', height: 200 }}>
                            <YAxis
                                style={{ width: 30 }}
                                contentInset={{ bottom: 20 }}
                                dataPoints={data.map(data => data.value)}
                                labelStyle={{ color: 'grey' }}
                            />
                            <View style={styles.flex1}>
                                <BarChart
                                    style={FLEX_1}
                                    data={ [ {
                                        values: data.map(data => data.value),
                                        fillColor: 'green',
                                        fillColorNegative: 'red',
                                    } ] }
                                    spacing={0.05}
                                    renderGradient={({ id, fillColor }) => (
                                        <LinearGradient id={id} x1={'0%'} y={'0%'} x2={'0%'}
                                                        y2={'100%'}>
                                            <Stop offset={'0%'} stopColor={fillColor} stopOpacity={0.8}/>
                                            <Stop offset={'100%'} stopColor={fillColor} stopOpacity={0.2}/>
                                        </LinearGradient>
                                    )}
                                />
                                <XAxis
                                    chartType={XAxis.Type.BAR}
                                    spacing={0.05}
                                    style={{ height: 20, justifyContent: 'center' }}
                                    values={data.map(data => data.date)}
                                    formatLabel={date => dateFns.format(date, 'MMM')}
                                    labelStyle={{ color: 'grey' }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', height: 200 }}>
                            <View style={styles.flex1}>
                                <HorizontalLabeledBarChart
                                    style={FLEX_1}
                                    maxValue={200}
                                    dataPoints={data.slice(0, 3).map(obj => ({
                                        ...obj,
                                        renderLabel: () => <Text style={{ alignSelf: 'flex-start' }}>{obj.key}</Text>,
                                        renderValue: () => <Text style={{ fontSize: 24, alignSelf: 'flex-end' }}>{obj.value}</Text>,
                                    }))}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={{ height: 200, flexDirection: 'row' }}>
                            <YAxis
                                dataPoints={data.map(data => data.value)}
                                style={{ marginTop: 10, marginRight: 5 }}
                                contentInset={{ bottom: 30 }}
                            />
                            <View style={styles.flex1}>
                                <LineChart
                                    style={styles.flex1}
                                    dataPoints={data.map(data => data.value)}
                                    showPoints={true}
                                    strokeColor={ '#22B6B0' }
                                    shadowColor={'rgba(34, 182, 176, 0.2)'}
                                    contentInset={{ bottom: 10, left: 15, right: 15, top: 10 }}
                                    intersections={[ 125, -25 ]}
                                    extras={ [
                                        ({ y }) => <Decorators.HorizontalLine y={ y } value={ -50 }/>,
                                        ({ y }) => <Decorators.HorizontalLine y={ y } value={ 150 }/>,
                                        ({ y, x }) => <Line x1={ x(2) } x2={ x(6) } y1={ y(150) } y2={ y(220) }
                                                            stroke={ 'blue' } strokeDasharray={ [ 8, 4 ] }/>,
                                        ({ y, x }) => <Line x1={ x(2) } x2={ x(5) } y1={ y(150) } y2={ y(-23) }
                                                            stroke={ 'blue' } strokeDasharray={ [ 8, 4 ] }/>,
                                    ] }
                                    renderDecorator={ layout => (
                                        <Decorators.Point
                                            color={ '#22B6B0' }
                                            key={ layout.index }
                                            { ...layout }
                                        />
                                    ) }
                                    renderExtra={ ({ item, x, y }) => item({ x, y }) }
                                />

                                <XAxis
                                    chartType={XAxis.Type.LINE}
                                    spacing={0.05}
                                    style={{ height: 20, justifyContent: 'center' }}
                                    contentInset={{ left: 15, right: 15 }}
                                    values={data.map(data => data.date)}
                                    formatLabel={ date => dateFns.format(date, 'MMM') }
                                />
                            </View>
                        </View>
                    </View>
                    <View style={[ styles.card, { height: 250 } ]}>
                        <PieChart
                            style={styles.flex1}
                            data={data.filter(data => data.value >= 0)}
                            labelDistance={5}
                            innerRadius={0.7}
                            labelSpacing={40}
                            renderLabel={item => (
                                <TouchableOpacity
                                    style={[ styles.pieLabelContainer, { borderColor: item.color } ]}
                                    onPress={() => console.log('clicked!', item)}
                                >
                                    <Image source={Label} style={styles.pieLabelImage}/>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <Card style={ { margin: 16, backgroundColor: '#227FBB' } }>
                        <View style={ { flexDirection: 'row', height: 200 } }>
                            <YAxis
                                dataPoints={ CASHFLOW_DATA.map(data => data.amount) }
                                style={{ width: 40 }}
                                contentInset={ { bottom: 10, top: 40 } }
                                labelStyle={ { color: 'rgba(255, 255, 255, 0.5)' } }
                                numberOfTicks={ 4 }
                                formatLabel={ value => value / 1000 }
                            />
                            <View style={styles.flex1}>
                                <AreaChart
                                    style={styles.flex1}
                                    dataPoints={ CASHFLOW_DATA.map(data => data.amount) }
                                    showPoints={false}
                                    strokeColor={ 'white' }
                                    dashArray={ [ 8, 4 ] }
                                    strokeWidth={2}
                                    numberOfTicks={ 4 }
                                    curve={ shape.curveLinear }
                                    gridStyle={ { backgroundColor: 'rgba(255, 255, 255, 0.5)' } }
                                    renderGradient={({ id }) => (
                                        <LinearGradient id={id} x1={'0'} y={'0'} x2={'0'} y2={`50%`}>
                                            <Stop offset={ '0' } stopColor={ 'white' } stopOpacity={ 0.5 }/>
                                            <Stop offset={ `1` } stopColor={ 'white' } stopOpacity={ 0.2 }/>
                                        </LinearGradient>
                                    )}
                                    contentInset={ { bottom: 10, left: 15, top: 40, right: 15 } }
                                    renderDecorator={ obj => {
                                        if (obj.index === 5) {
                                            return (
                                                <Tooltip
                                                    stroke={ 'white' }
                                                    pointStroke={ 'purple' }
                                                    key={ obj.index }
                                                    { ...obj }
                                                    text={ 'Foo fii faa' }
                                                />
                                            )
                                        }
                                        return <G key={ obj.index }/>
                                    } }
                                />
                            </View>
                        </View>
                    </Card>
                    <Card style={ { margin: 16 } }>
                        <View style={ { flexDirection: 'row', height: 200 } }>
                            <YAxis
                                dataPoints={ data.map(data => data.value) }
                                style={ { width: 40 } }
                                contentInset={ { bottom: 30, top: 10 } }
                            />
                            <View style={ styles.flex1 }>
                                <AreaChart
                                    style={ styles.flex1 }
                                    dataPoints={ data.map(data => data.value) }
                                    strokeColor={ 'white' }
                                    strokeWidth={ 2 }
                                    renderGradient={ ({ id }) => (
                                        <LinearGradient id={ id } x1={ '0' } y={ '0' } x2={ '0' } y2={ `50%` }>
                                            <Stop offset={ '0' } stopColor={ 'blue' } stopOpacity={ 0.9 }/>
                                            <Stop offset={ `1` } stopColor={ 'blue' } stopOpacity={ 0.3 }/>
                                        </LinearGradient>
                                    ) }
                                    contentInset={ { bottom: 10, left: 15, top: 10, right: 15 } }
                                    renderDecorator={ obj => (
                                        <Point
                                            key={ obj.index }
                                            color={ 'blue' }
                                            { ...obj }
                                        />
                                    ) }
                                />
                                <XAxis
                                    style={ { height: 20 } }
                                    values={ data.map(data => data.date) }
                                    contentInset={ { left: 15, right: 15 } }
                                    formatLabel={ date => dateFns.format(date, 'MMM') }
                                    spacing={ 0 }
                                />
                            </View>
                        </View>
                    </Card>
                </ScrollView>
                <TouchableOpacity
                    onPress={() => this._toggleData()}
                >
                    <View style={styles.button}>
                        <Text style={{ color: 'white' }}>{'Switch data'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    flex1: {
        flex: 1,
    },
    card: {
        backgroundColor: 'white',
        shadowOffset: {
            height: 2,
            width: 2,
        },
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.5,
        margin: 16,
        padding: 16,
    },
    button: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    pieLabelContainer: {
        padding: 5,
        borderWidth: 2,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    pieLabelImage: {
        height: 15,
        width: 15,
    },
})

export default App
