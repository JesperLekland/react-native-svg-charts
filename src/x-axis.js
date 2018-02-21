import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import * as d3Scale from 'd3-scale'
import * as array from 'd3-array'
import Svg, { Text as SVGText } from 'react-native-svg'

class XAxis extends PureComponent {

    state = {
        width: 0,
        height: 0,
    }

    _onLayout(event) {
        const { nativeEvent: { layout: { width } } } = event

        if (width !== this.state.width) {
            this.setState({ width })
        }
    }

    _getX(domain) {
        const {
                  scale,
                  spacing,
                  contentInset: {
                      left  = 0,
                      right = 0,
                  },
              } = this.props

        const { width } = this.state

        if (scale === d3Scale.scaleBand) {

            // use index as domain identifier instead of value since
            // same value can occur at several places in dataPoints
            const x = scale()
                .domain(domain)
                .range([ left, width - right ])
                .paddingInner([ spacing ])
                .paddingOuter([ spacing ])

            //add half a bar to center label
            return (value) => x(value) + (x.bandwidth() / 2)
        }

        if (scale === d3Scale.scaleLinear) {
            return scale()
                .domain(domain)
                .range([ left, width - right ])
        }

        if (scale === d3Scale.scaleTime) {

            return scale()
                .domain(domain)
                .range([ left, width - right ])

        }
    }

    render() {

        const {
                  style,
                  scale,
                  data,
                  xAccessor,
                  formatLabel,
                  numberOfTicks,
                  svg,
              } = this.props

        const { width } = this.state

        if (data.length === 0) {
            return <View style={style}/>
        }

        const xValues = data.map((item, index) => xAccessor({ item, index }))
        const extent  = array.extent(xValues)
        const domain  = scale === d3Scale.scaleBand ? xValues : extent

        const x     = this._getX(domain)
        const ticks = numberOfTicks ? x.ticks(numberOfTicks) : xValues

        return (
            <View style={ style }>
                <View
                  style={{ flexGrow: 1 }}
                  onLayout={event => this._onLayout(event)}
                >
                    {/*invisible text to allow for parent resizing*/}
                    <Text style={{ color: 'transparent', fontSize: svg.fontSize }}>
                        { formatLabel(data[ 0 ], 0) }
                    </Text>
                    <Svg style={StyleSheet.absoluteFill}>
                        {
                            // don't render labels if width isn't measured yet,
                            // causes rendering issues
                            width > 0 &&
                            ticks.map((value, index) => {
                                return (
                                    <SVGText
                                      textAnchor={'middle'}
                                      originX={x(value)}
                                      alignmentBaseline={'hanging'}
                                      {...svg}
                                      key={index}
                                      x={x(value)}
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

XAxis.propTypes = {
    data: PropTypes.array.isRequired,
    labelStyle: PropTypes.any,
    spacing: PropTypes.number,
    formatLabel: PropTypes.func,
    contentInset: PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
    }),
    scale: PropTypes.oneOf([ d3Scale.scaleTime, d3Scale.scaleLinear, d3Scale.scaleBand ]),
    numberOfTicks: PropTypes.number,
    xAccessor: PropTypes.func,
    svg: PropTypes.object,
}

XAxis.defaultProps = {
    spacing: 0.05,
    contentInset: {},
    svg: {},
    xAccessor: ({ index }) => index,
    scale: d3Scale.scaleLinear,
    formatLabel: (value, index) => index,
}

export default XAxis
