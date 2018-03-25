import React from 'react'
import { Text } from 'react-native-svg'
import { ProgressCircle } from 'react-native-svg-charts'

class ProgressCircleWithCenterTextExample extends React.PureComponent {

    render() {

        const titleText = () => {
            return (
                <Text
                    key="title"
                    textAnchor="middle"
                    alignmentBaseline="text-bottom"
                    fontSize="20"
                    fontWeight="bold">
                    Progress Title
                </Text>
            )
        }

        const subtitleText = () => {
            return (
                <Text
                    key="subtitle"
                    textAnchor="middle"
                    alignmentBaseline="text-top">
                    This is a subtitle
                </Text>
            )
        }

        return (
            <ProgressCircle
                style={{ height: 200 }}
                progress={ 0.7 }
                progressColor={ 'rgb(134, 65, 244)' }
                extras={ [ titleText, subtitleText ] }
            />
        )
    }

}

export default ProgressCircleWithCenterTextExample
