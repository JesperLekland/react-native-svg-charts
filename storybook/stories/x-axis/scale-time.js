import React from 'react'
import { AreaChart, XAxis } from 'react-native-svg-charts'
import { View } from 'react-native'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import dateFns from 'date-fns'

class XAxisScaleTimeExample extends React.PureComponent {

    render() {

        const data = [
            {
                y: 50,
                x: dateFns.setHours(new Date(2018, 0, 0), 6),
            },
            {
                y: 10,
                x: dateFns.setHours(new Date(2018, 0, 0), 9),
            },
            {
                y: 150,
                x: dateFns.setHours(new Date(2018, 0, 0), 15),
            },
            {
                y: 10,
                x: dateFns.setHours(new Date(2018, 0, 0), 18),
            },
            {
                y: 100,
                x: dateFns.setHours(new Date(2018, 0, 0), 21),
            },
            {
                y: 20,
                x: dateFns.setHours(new Date(2018, 0, 0), 24),
            },
        ]

        return (
            <View style={{ height: 200, padding: 20 }}>
                <AreaChart
                  style={{ flex: 1 }}
                  data={data}
                  xScale={scale.scaleTime}
                  contentInset={{ top: 10, bottom: 10 }}
                  svg={{ fill: 'rgba(134, 65, 244, 0.5)' }}
                  curve={shape.curveLinear}
                />
                <XAxis
                  values={data}
                  svg={{
                      translate: '30',
                      fill: 'black',
                      fontSize: 8,
                      fontWeight: 'bold',
                      rotation: 20,
                      originY: 30,
                  }}
                  scale={scale.scaleTime}
                  numberOfTicks={6}
                  style={{ marginHorizontal: -15, height: 20 }}
                  contentInset={{ left: 10, right: 25 }}
                  formatLabel={(value) => dateFns.format(value, 'HH:mm')}
                />
            </View>
        )
    }

}

export default XAxisScaleTimeExample
