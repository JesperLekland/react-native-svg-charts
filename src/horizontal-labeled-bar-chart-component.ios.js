import React from 'react'
import { Animated, View } from 'react-native'

const BarChartComponent = ({ dataPoints, spacing, hasDifferentSigns, barStyle, ratios, animations }) => {
    return (
        <View style={{ flex: 1 }}>
            {dataPoints.map((obj, index) => (
                <View
                    key={obj.key}
                    style={{ marginVertical: spacing, direction: obj.value < 0 ? 'rtl' : 'ltr' }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        {
                            hasDifferentSigns &&
                            <View style={{ flex: 1 }}/>
                        }
                        <View style={{ flex: 1 }}>
                            {obj.renderLabel && obj.renderLabel()}
                            <View style={{ flexDirection: 'row', overflow: 'hidden' }}>
                                <Animated.View
                                    style={{
                                        flexGrow: ratios[ index ],
                                        overflow: 'hidden',
                                        transform: [ { translateX: animations[ index ] } ],
                                    }}
                                >
                                    <View style={[
                                        barStyle,
                                        {
                                            backgroundColor: obj.color,
                                        },
                                    ]}/>
                                    {obj.renderValue && obj.renderValue()}
                                </Animated.View>
                                <View style={{ flex: 1 - ratios[ index ] }}/>
                            </View>
                        </View>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default BarChartComponent
