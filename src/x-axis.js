import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import * as d3Scale from 'd3-scale'
import * as array from 'd3-array'
import Svg, { Text as SVGText, TSpan } from 'react-native-svg'

class XAxis extends PureComponent {
    state = {
        width: 0,
        height: 0,
    };

    _onLayout(event) {
        const {
            nativeEvent: {
                layout: { width, height },
            },
        } = event

        if (width !== this.state.width) {
            this.setState({ width, height })
        }
    }

    _getX(domain) {
        const {
            scale,
            spacingInner,
            spacingOuter,
            contentInset: { left = 0, right = 0 },
        } = this.props

        const { width } = this.state

        const x = scale()
            .domain(domain)
            .range([ left, width - right ])

        if (scale === d3Scale.scaleBand) {
            x.paddingInner([ spacingInner ]).paddingOuter([ spacingOuter ])

            //add half a bar to center label
            return value => x(value) + x.bandwidth() / 2
        }

        return x
    }

    _getTick({ value, x, index }) {
        const { splitOnLineBreaks, formatLabel, svg } = this.props
        const formattedValue = formatLabel(value, index)

        if (splitOnLineBreaks) {
            return formattedValue.split('\n').map((line, lineIndex) => (
                <TSpan
                    key={ line }
                    textAnchor="middle"
                    x={ x(value) }
                    dy={ lineIndex ? svg.fontSize * 1.2 : 0 }>
                    {line}
                </TSpan>
            ))
        }

        return formattedValue
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
            children,
            min,
            max,
        } = this.props

        const { height, width } = this.state

        if (data.length === 0) {
            return <View style={ style } />
        }

        const values = data.map((item, index) => xAccessor({ item, index }))
        const extent = array.extent(values)
        const domain =
            scale === d3Scale.scaleBand
                ? values
                : [ min || extent[0], max || extent[1] ]

        const x = this._getX(domain)
        const ticks = numberOfTicks ? x.ticks(numberOfTicks) : values

        return (
            <View style={ style }>
                <View
                    style={
                        height && width
                            ? {
                                height,
                                width,
                            }
                            : { flexGrow: 1 }
                    }>
                    {/*invisible text to allow for parent resizing*/}
                    {!height &&
                        !width && (
                        <Text
                            onLayout={ event => this._onLayout(event) }
                            style={{ color: 'transparent', fontSize: svg.fontSize }}>
                            {formatLabel(ticks[0], 0)}
                        </Text>
                    )}
                    {height > 0 &&
                        width > 0 && (
                        <Svg
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height,
                                width,
                            }}>
                            {children}
                            {// don't render labels if width isn't measured yet,
                                // causes rendering issues
                                width > 0 &&
                                    ticks.map((value, index) => {
                                        const { svg: valueSvg = {} } = data[index] || {}

                                        return (
                                            <SVGText
                                                textAnchor={ 'middle' }
                                                originX={ x(value) }
                                                alignmentBaseline={ 'hanging' }
                                                { ...svg }
                                                { ...valueSvg }
                                                key={ index }
                                                x={ x(value) }>
                                                {this._getTick({ value, x, index })}
                                            </SVGText>
                                        )
                                    })}
                        </Svg>
                    )}
                </View>
            </View>
        )
    }
}

XAxis.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.oneOfType([ PropTypes.number, PropTypes.object ]),
    ).isRequired,
    spacingInner: PropTypes.number,
    spacingOuter: PropTypes.number,
    formatLabel: PropTypes.func,
    contentInset: PropTypes.shape({
        left: PropTypes.number,
        right: PropTypes.number,
    }),
    scale: PropTypes.oneOf([
        d3Scale.scaleTime,
        d3Scale.scaleLinear,
        d3Scale.scaleBand,
    ]),
    numberOfTicks: PropTypes.number,
    xAccessor: PropTypes.func,
    svg: PropTypes.object,
    min: PropTypes.any,
    max: PropTypes.any,
    splitOnLineBreaks: PropTypes.bool,
}

XAxis.defaultProps = {
    spacingInner: 0.05,
    spacingOuter: 0.05,
    contentInset: {},
    svg: {},
    xAccessor: ({ index }) => index,
    scale: d3Scale.scaleLinear,
    formatLabel: value => value,
    splitOnLineBreaks: false,
}

export default XAxis
