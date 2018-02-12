import React from 'react'
import { View, Text } from 'react-native'
import { 
    LinearGradient, 
    Stop, 
    Defs, 
    ClipPath, 
    Rect, 
    Path, 
} from 'react-native-svg'
import AreaChart from '../../src/area-chart'
import LineChart from '../../src/line-chart'
import * as shape from 'd3-shape'

class PartialChartExample extends React.PureComponent {
    render() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const indexToClipFrom = 10

        const ExtraDefs = ({ x, width }) => (
            <Defs key={'defs-1'}>
                <LinearGradient id={ 'gradient' } x1={ '0%' } y={ '0%' } x2={ '0%' } y2={ '100%' }>
                    <Stop offset={ '0%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.8 }/>
                    <Stop offset={ '100%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.2 }/>
                </LinearGradient>
                <ClipPath id={'clip-path-1'} key={'0'}>
                    <Rect x={x(indexToClipFrom)} y={'0'} width={width - x(indexToClipFrom)} height={'100%'} />
                </ClipPath>
                <ClipPath id="clip-path-2" key={'1'}>
                    <Rect x={'0'} y={'0'} width={x(indexToClipFrom)} height={'100%'} />
                </ClipPath>
            </Defs>
        )

        // Line extras:
        const OverlayLine = ({ line }) => (
            <Path
                key={'line-1'}
                d={line}
                stroke={ 'rgb(134, 65, 244)' }
                strokeWidth={ 2 }
                fill={ 'none' }
                clipPath={ 'url(#clip-path-2)' }
            />
        )

        const OverlayShadowLine = ({ shadow }) => (
            <Path
                key={'shadow-1'}
                d={shadow}
                stroke={ 'rgba(134, 65, 244, 0.2)' }
                strokeWidth={ 5 }
                fill={ 'none' }
                clipPath={ 'url(#clip-path-2)' }
            />
        )

        const extrasForLineChart = [ ExtraDefs, OverlayLine, OverlayShadowLine ]

        // Area extras:
        const OverlayArea = ({ area }) => (
            <Path
                key={'area-1'}
                fill={ `url(#gradient)` }
                d={area}
                stroke={ 'none' }
                clipPath={ 'url(#clip-path-2)' }
            />
        )

        const OverlayLineForArea = ({ line, linearGradientId }) => (
            <Path
                key={'line-1'}
                stroke={ `url(#${linearGradientId})` }
                d={line}
                fill={ 'none' }
                clipPath={ 'url(#clip-path-2)' }
            />
        )

        const extrasForAreaChart = [ ExtraDefs, OverlayArea, OverlayLineForArea ]       

        return (
            <View>
                <Text>Line Chart</Text>
                <LineChart
                    style={ { height: 200 } }
                    data={ data }
                    contentInset={ { top: 20, bottom: 20 } }
                    svg={{
                        stroke: 'rgb(134, 65, 244)',
                        strokeWidth: 2,
                        clipPath: 'url(#clip-path-1)',
                        strokeDasharray: [ 4, 4 ],
                    }}
                    shadowSvg={{
                        stroke: 'rgba(134, 65, 244, 0.2)',
                        strokeWidth: 5,
                        clipPath: 'url(#clip-path-1)',
                        strokeDasharray: [ 4, 4 ],
                    }}
                    extras={ extrasForLineChart }
                    renderExtra={ ({ item, ...args }) => item(args) }
                />

                <Text>Area Chart</Text>
                <AreaChart
                    style={ { height: 200 } }
                    data={ data }
                    contentInset={ { top: 30, bottom: 30 } }
                    curve={shape.curveNatural}
                    svg={{
                        fill: 'transparent',
                        stroke: 'rgb(134, 65, 244)',
                        clipPath: 'url(#clip-path-1)',
                        strokeDasharray: [ 4, 4 ],
                    }}
                    renderLineGradient={ ({ id }) => (
                        <LinearGradient id={ id } x1={ '0%' } y={ '0%' } x2={ '0%' } y2={ '100%' }>
                            <Stop offset={ '0%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.8 }/>
                            <Stop offset={ '100%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.2 }/>
                        </LinearGradient>
                    ) }
                    extras={ extrasForAreaChart }
                    renderExtra={ ({ item, ...args }) => item(args) }
                />
            </View>
        )
    }
}

export default PartialChartExample
