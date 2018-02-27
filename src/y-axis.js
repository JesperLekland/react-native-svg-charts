import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import { Svg, Text as SVGText } from 'react-native-svg'
import * as scale from 'd3-scale'
import * as array from 'd3-array'

class YAxis extends PureComponent {

    state = {
        height: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { height } } } = event
        this.setState({ height })
    }

    render() {

        const {
            style,
            data,
            scale,
            yAccessor,
            numberOfTicks,
            formatLabel,
            contentInset: {
                top = 0,
                bottom = 0,
            },
            min,
            max,
            svg,
        } = this.props

        const { height } = this.state

        if (data.length === 0) {
            return <View style={style}/>
        }

        const values = data.map(item => yAccessor({ item }))

        const extent = array.extent([ ...values, min, max ])
        const ticks = array.ticks(extent[ 0 ], extent[ 1 ], numberOfTicks)

        //invert range to support svg coordinate system
        const y = scale()
            .domain(extent)
            .range([ height - bottom, top ])

        const longestValue = ticks
            .map(value => formatLabel(value))
            .reduce((prev, curr) => prev.toString().length > curr.toString().length ? prev : curr, '')

        return (
            <View style={[ style ]}>
                <View
                    style={{ flexGrow: 1 }}
                    onLayout={event => this._onLayout(event)}
                >
                    {/*invisible text to allow for parent resizing*/}
                    <Text
                        style={{ color: 'transparent', fontSize: svg.fontSize }}
                    >
                        {longestValue}
                    </Text>
                    <Svg style={StyleSheet.absoluteFill}>
                        {
                            // don't render labels if width isn't measured yet,
                            // causes rendering issues
                            height > 0 &&
                            ticks.map((value, index) => {
                                return (
                                    <SVGText
                                        originY={y(value)}
                                        textAnchor={'middle'}
                                        x={'50%'}
                                        alignmentBaseline={'middle'}
                                        {...svg}
                                        key={index}
                                        y={y(value)}
                                    >
                                        {formatLabel(value, index)}
                                    </SVGText>
                                )
                            })
                        }
                    </Svg>
                </View>
            </View>
        )
    }
}

YAxis.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.arrayOf(PropTypes.number),
    ]).isRequired,
    svg: PropTypes.object,
    style: PropTypes.any,
    numberOfTicks: PropTypes.number,
    formatLabel: PropTypes.func,
    contentInset: PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
    }),
    min: PropTypes.number,
    max: PropTypes.number,
    yAccessor: PropTypes.func,
    scale: PropTypes.func,
}

YAxis.defaultProps = {
    numberOfTicks: 10,
    contentInset: {},
    svg: {},
    scale: scale.scaleLinear,
    formatLabel: value => value && value.toString(),
    yAccessor: ({ item }) => item,
}

export default YAxis
