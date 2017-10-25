import React from 'react'
import { Animated, View } from 'react-native'

const BarChartComponent = ({ dataPoints, spacing, hasDifferentSigns, barStyle, ratios, animations }) => {
    return (
        <View style={{ flex: 1 }}>
            {dataPoints.map((obj, index) => (
                <View
                    key={obj.key}
                    style={{ marginVertical: spacing }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        {
                            hasDifferentSigns && obj.value >= 0 &&
                            <View style={{ flex: 1 }}/>
                        }
                        <View style={{ flex: 1 }}>
                            <View style={{ alignSelf: obj.value < 0 ? 'flex-end' : 'flex-start' }}>
                                {obj.renderLabel && obj.renderLabel()}
                            </View>
                            <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
                                {
                                    obj.value < 0 &&
                                    <View style={{ flex: 1 - ratios[ index ] }}/>
                                }
                                <Animated.View
                                    style={{
                                        flexGrow: ratios[ index ],
                                        overflow: 'hidden',
                                        transform: [ { translateX: animations[ index ] } ],
                                    }}
                                >
                                    <Animated.View style={[
                                        barStyle,
                                        {
                                            backgroundColor: obj.color,
                                            // alignSelf: obj.value < 0 ? 'flex-end' : 'flex-start',
                                        },
                                    ]}/>
                                    <View style={{ alignSelf: obj.value < 0 ? 'flex-start' : 'flex-end' }}>
                                        {obj.renderValue && obj.renderValue()}
                                    </View>
                                </Animated.View>
                                {
                                    obj.value > 0 &&
                                    <View style={{ flex: 1 - ratios[ index ] }}/>
                                }
                            </View>
                        </View>
                        {
                            hasDifferentSigns && obj.value < 0 &&
                            <View style={{ flex: 1 }}/>
                        }
                    </View>
                </View>
            ))}
        </View>
    )
}

export default BarChartComponent
