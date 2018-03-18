import React from 'react'
import { View } from 'react-native'
import XAxis from './x-axis'
import YAxis from './y-axis'

class Foo extends React.PureComponent {

    state = {
        yAxisWidth: 0,
        xAxisHeight: 0,
        chartHeight: 0,
        chartWidth: 0,
    }

    _onYAxisLayout = (event) => {
        const { nativeEvent: { layout: { width } } } = event
        this.setState({ yAxisWidth: width })
    }

    _onChartLayout = (event) => {
        const { nativeEvent: { layout: { width, height } } } = event
        this.setState({
            chartHeight: height,
            chartWidth: width,
        })
    }

    _onXAxisLayout = (event) => {
        const { nativeEvent: { layout: { height } } } = event
        this.setState({ xAxisHeight: height })
    }

    render() {

        const { children, style } = this.props
        const { chartWidth, chartHeight } = this.state

        const _children = React.Children.toArray(children)

        const yAxis = _children.find(child => child.type === YAxis)
        const xAxis = _children.find(child => child.type === XAxis)
        const chart = _children.find(child =>
            child.type !== XAxis &&
            child.type !== YAxis,
        )

        return (
            <View style={style}>
                <View style={{ flexGrow: 1, flexDirection: 'row' }}>
                    {
                        React.cloneElement(yAxis, {
                            onLayout: this._onYAxisLayout,
                            style: {
                                ...yAxis.props.style,
                                height: chartHeight,
                            },
                        })
                    }
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        {
                            React.cloneElement(chart, {
                                onLayout: this._onChartLayout,
                            })
                        }
                        {
                            React.cloneElement(xAxis, {
                                onLayout: this._onXAxisLayout,
                                contentInset: { left: 10, right: 10 },
                                style: {
                                    marginHorizontal: -10,
                                    ...chart.props.style,
                                    height: undefined,
                                    ...xAxis.props.style,
                                },
                            })
                        }
                    </View>
                </View>
            </View>
        )
    }
}

export default Foo
