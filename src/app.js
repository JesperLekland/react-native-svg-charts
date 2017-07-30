import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AreaChart from './area-chart'
import XAxis from './x-axis'
import YAxis from './y-axis'
import LineChart from './line-chart'
import PieChart from './pie-chart'
import MultipleBarChart from './bar-chart'
import * as dateFns from 'date-fns'
import ProgressCircle from './progress-circle'

const _data = [
    [
        { 'value': 80, 'name': 'Fun activities', color: 'blue', date: new Date(2016, 7) },
        { 'value': 15, 'name': 'Dog', color: 'green', date: new Date(2016, 8) },
        { 'value': 150, 'name': 'Food', color: 'purple', date: new Date(2016, 9) },
        { 'value': 10, 'name': 'YouFood', color: 'purple', date: new Date(2016, 10) },
        { 'value': 100, 'name': 'barfoo', color: 'purple', date: new Date(2016, 11) },
        { 'value': -23, 'name': 'Car', color: 'gray', date: new Date(2016, 12) },
        { 'value': 220, 'name': 'Rent', color: 'red', date: new Date(2017, 1) },
        { 'value': 20, 'foo': 'Rent', color: 'red', date: new Date(2017, 2) },
        { 'value': 30, 'name': 'bar', color: 'red', date: new Date(2017, 3) },
        { 'value': -40, 'name': 'baz', color: 'orange', date: new Date(2017, 4) },
        { 'value': -100, 'name': 'foobar', color: 'orange', date: new Date(2017, 5) },
    ],
    [
        { 'value': 60, 'name': 'Fun activities', color: 'blue', date: new Date(2016, 7) },
        { 'value': 150, 'name': 'Dog', color: 'green', date: new Date(2016, 8) },
        { 'value': 15, 'name': 'Food', color: 'purple', date: new Date(2016, 9) },
        { 'value': undefined, 'name': 'YouFood', color: 'purple', date: new Date(2016, 10) },
        { 'value': 10, 'name': 'barfoo', color: 'purple', date: new Date(2016, 11) },
        { 'value': -23, 'name': 'Car', color: 'gray', date: new Date(2016, 12) },
        { 'value': 220, 'name': 'Rent', color: 'red', date: new Date(2017, 1) },
        { 'value': undefined, 'foo': 'Rent', color: 'red', date: new Date(2017, 2) },
        { 'value': 0, 'name': 'bar', color: 'red', date: new Date(2017, 3) },
        { 'value': -40, 'name': 'baz', color: 'orange', date: new Date(2017, 4) },
        { 'value': -100, 'name': 'foobar', color: 'orange', date: new Date(2017, 5) },
    ],
    [
        { 'value': 30, 'name': 'Fun activities', color: 'blue', date: new Date(2017, 10) },
        { 'value': 65, 'name': 'Dog', color: 'green', date: new Date(2017, 11) },
        { 'value': -20, 'name': 'Foo', color: 'green', date: new Date(2017, 12) },
        { 'value': 10, 'name': 'Food', color: 'purple', date: new Date(2018, 1) },
        { 'value': 230, 'name': 'Car', color: 'gray', date: new Date(2018, 2) },
        { 'value': 20, 'name': 'Rent', color: 'red', date: new Date(2018, 3) },
        { 'value': 410, 'name': 'Misc', color: 'orange', date: new Date(2018, 4) },
    ],
]

const _progressData = [
    0.4,
    0.8,
    0.2,
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
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', height: 200 }}>
                            <YAxis
                                style={{ paddingBottom: 20, paddingRight: 5 }}
                                dataPoints={_multipleBarData[ 0 ].values}
                                labelStyle={{ color: 'grey' }}
                            />
                            <View style={{ flex: 1 }}>
                                <MultipleBarChart
                                    dataPoints={_multipleBarData}
                                    style={{ flex: 1 }}
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
                    <View style={styles.card}>
                        <ProgressCircle
                            style={{ height: 100 }}
                            progress={progress}
                        />
                    </View>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row', height: 200 }}>
                            <YAxis
                                style={{ paddingBottom: 20, paddingRight: 5 }}
                                dataPoints={data.map(data => data.value)}
                                labelStyle={{ color: 'grey' }}
                            />
                            <View style={{ flex: 1 }}>
                                <MultipleBarChart
                                    dataPoints={[ { values: data.map(data => data.value) } ]}
                                    style={{ flex: 1 }}
                                    spacing={0.05}
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
                        <View style={{ height: 200, flexDirection: 'row' }}>
                            <YAxis
                                dataPoints={data.map(data => data.value)}
                                style={{ marginBottom: 20 }}
                            />
                            <View style={{ flex: 1 }}>
                                <LineChart
                                    style={{ flex: 1, marginLeft: 5 }}
                                    dataPoints={data.map(data => data.value)}
                                    dashSize={5}
                                    showPoints={true}
                                    shadowColor={'rgba(34, 182, 176, 0.2)'}
                                    contentInset={{ bottom: 10, left: 10, right: 10, top: 10 }}
                                />
                                <XAxis
                                    chartType={XAxis.Type.BAR}
                                    spacing={0.05}
                                    style={{ height: 20, justifyContent: 'center', marginHorizontal: -10 }}
                                    values={data.map(data => data.date)}
                                    formatLabel={date => dateFns.format(date, 'MMM')}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={[ styles.card, { alignItems: 'center' } ]}>
                        <PieChart
                            style={{ height: 200, width: 100 }}
                            dataPoints={data}
                            width={100}
                            height={200}
                            innerRadius={40}
                        />
                    </View>
                    <View style={styles.card}>
                        <View style={{ flexDirection: 'row' }}>
                            <YAxis
                                dataPoints={data.map(data => data.value)}
                                style={{ paddingRight: 10, marginBottom: 20 }}
                                numberOfTicks={data.length / 2}
                            />
                            <View style={{ flex: 1 }}>
                                <AreaChart
                                    dataPoints={data.map(data => data.value)}
                                    style={{ height: 200, paddingHorizontal: 5 }}
                                    showPoints={true}
                                    contentInset={{ bottom: 10, right: 10, left: 10, }}
                                />
                                <XAxis
                                    style={{ height: 20, marginHorizontal: 0 }}
                                    values={data.map(data => data.date)}
                                    formatLabel={date => dateFns.format(date, 'MMM')}
                                />
                            </View>
                        </View>
                    </View>
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
        backgroundColor: '#F5FCFF',
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
})

export default App
