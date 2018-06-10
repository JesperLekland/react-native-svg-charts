import React from 'react'
import { Button, View } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'

class ProgressCircleExample extends React.PureComponent {

    state = {
        progress: 0.3,
    }

    _onPress = () => {
        this.setState(state => ({
            progress: 1 - state.progress,
        }))
    }

    render() {

        return (

            <View>
                <ProgressCircle
                    style={{ height: 200 }}
                    progress={ this.state.progress }
                    progressColor={ 'rgb(134, 65, 244)' }
                    animate={ true }
                />
                <Button
                    title={ 'animate' }
                    onPress={ this._onPress }
                />
            </View>
        )
    }

}

export default ProgressCircleExample
