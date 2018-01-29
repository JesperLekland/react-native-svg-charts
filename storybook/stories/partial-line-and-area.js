import React from 'react'
import { View, Text } from 'react-native'
import LineChart from '../../src/line-chart'
import AreaChart from '../../src/area-chart'
import * as shape from 'd3-shape'
import { ClipPath, Rect, LinearGradient, Stop } from 'react-native-svg'

class PartialLineAndAreaExample extends React.PureComponent {
    render() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const indexToClipFrom = 10

        const ClipPath1 = ({ x, width }) => (
            <ClipPath id={'clip-path-1'} key={'0'}>
                <Rect x={x(indexToClipFrom)} y={'0'} width={width - x(indexToClipFrom)} height={'100%'} />
            </ClipPath>
        )
        const ClipPath2 = ({ x }) => (
            <ClipPath id="clip-path-2" key={'1'}>
                <Rect x={'0'} y={'0'} width={x(indexToClipFrom)} height={'100%'} />
            </ClipPath>
        )
        const clipPaths = [ ClipPath1, ClipPath2 ]

        return (
            <View>
                <Text>Line Chart</Text>
                <LineChart
                    style={ { height: 200 } }
                    dataPoints={ data }
                    svg={ {
                        stroke: 'rgb(134, 65, 244)',
                        strokeDasharray: [ 4, 4 ],
                        clipPath: 'url(#clip-path-1)',
                    } }
                    shadowSvg={ {
                        stroke: 'rgba(134, 65, 244, 0.2)',
                        strokeWidth: 5,
                        strokeDasharray: [ 4, 4 ],
                        clipPath: 'url(#clip-path-1)',
                    } }
                    overlayLineSvg={ {
                        stroke: 'rgb(134, 65, 244)',
                        clipPath: 'url(#clip-path-2)',
                    } }
                    overlayLineShadowSvg={ {
                        stroke: 'rgba(134, 65, 244, 0.2)',
                        strokeWidth: 5,
                        clipPath: 'url(#clip-path-2)',
                    } }
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={shape.curveCardinal}
                    clipPathDefs={ clipPaths }
                    renderClipPathDef={({ item, ...args }) => item(args)}
                    { ...this.props }
                />

                <Text>Area Chart</Text>
                <AreaChart
                    style={ { height: 200 } }
                    dataPoints={ data }
                    contentInset={ { top: 30, bottom: 30 } }
                    curve={shape.curveNatural}
                    svg={{
                        fill: 'transparent',
                        stroke: 'rgb(134, 65, 244)',
                        strokeDasharray: [ 4, 4 ],
                        clipPath: 'url(#clip-path-1)',
                    }}
                    overlayAreaSvg={ {
                        fill: 'rgba(134, 65, 244, 0.2)',
                        clipPath: 'url(#clip-path-2)',
                    } }
                    overlayLineSvg={ {
                        fill: 'rgba(134, 65, 244, 0.2)',
                        stroke: 'rgb(134, 65, 244)',
                        clipPath: 'url(#clip-path-2)',
                    } }
                    renderOverlayGradient={ ({ id }) => (
                        <LinearGradient id={ id } x1={ '0%' } y={ '0%' } x2={ '0%' } y2={ '100%' }>
                            <Stop offset={ '0%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.8 }/>
                            <Stop offset={ '100%' } stopColor={ 'rgb(134, 65, 244)' } stopOpacity={ 0.2 }/>
                        </LinearGradient>
                    ) }
                    clipPathDefs={ clipPaths }
                    renderClipPathDef={({ item, ...args }) => item(args)}
                    { ...this.props }
                />
            </View>
        )
    }
}

export default PartialLineAndAreaExample
