import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import BarChartComponent from './horizontal-labeled-bar-chart-component'

class HorizontalLabeledBarChart extends PureComponent {

    constructor(props) {
        super(props)

        this._resetAnimations(props.dataPoints)
    }

    _resetAnimations(dataPoints) {
        this.animations = dataPoints.map(obj => new Animated.Value(300 * -Math.sign(obj.value)))
    }

    componentWillReceiveProps(props) {
        if (props.dataPoints !== this.props.dataPoints) {
            this._resetAnimations(props.dataPoints)
            this._animate()
        }
    }

    componentDidMount() {
        this._animate()
    }

    _animate() {
        Animated.parallel(
            this.animations.map(animation =>
                Animated.timing(animation, {
                    toValue: 0,
                    easing: Easing.bounce,
                    duration: this.props.animationDuration,
                    useNativeDriver: true,
                }),
            ),
        ).start()
    }

    render() {
        const {
                  style,
                  dataPoints,
                  barStyle,
                  maxValue,
              } = this.props

        if (dataPoints.length === 0) {
            return <View style={ style }/>
        }

        const negativeValues = dataPoints.filter(obj => obj.value < 0)
        const positiveValues = dataPoints.filter(obj => obj.value >= 0)

        const max = maxValue ? maxValue : Math.max(...dataPoints.map(obj => Math.abs(obj.value)))
        const ratios = dataPoints.map(obj => Math.abs(obj.value / max))

        const hasDifferentSigns = negativeValues.length > 0 && positiveValues.length > 0

        return (
            <View style={style}>
                <BarChartComponent
                    ratios={ratios}
                    hasDifferentSigns={hasDifferentSigns}
                    animations={this.animations}
                    barStyle={[ barStyle, styles.bar ]}
                    {...this.props}
                />
            </View>
        )
    }
}

HorizontalLabeledBarChart.propTypes = {
    dataPoints: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        renderValue: PropTypes.func,
        renderLabel: PropTypes.func,
    })).isRequired,
    style: PropTypes.any,
    barStyle: PropTypes.any,
    spacing: PropTypes.number,
    animationDuration: PropTypes.number,
    maxValue: PropTypes.number,
}

HorizontalLabeledBarChart.defaultProps = {
    spacing: 4,
    animationDuration: 1000,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bar: {
        borderRadius: 5,
        height: 10,
    },
    surface: {
        backgroundColor: 'transparent',
    },
})

export default HorizontalLabeledBarChart
