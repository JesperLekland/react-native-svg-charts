import React from 'react'
import { Text, View } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'

class ProgressCircleExample extends React.PureComponent {

    render() {

        return (
            <View>
                <ProgressCircle
                    style={{ height: 200, marginBottom: -200 * 0.35 }}
                    progress={0.7}
                    strokeWidth={10}
                    progressColor={'rgb(134, 65, 244)'}
                    startAngle={-Math.PI * 0.6}
                    endAngle={Math.PI * 0.6}
                />
                <Text style={{ textAlign: 'center' }}>
                    {'foobar'}
                </Text>
            </View>
        )
    }

}

export default ProgressCircleExample
