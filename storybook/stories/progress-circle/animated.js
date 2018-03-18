import React from 'react'
import { Animated, Easing } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'

const Foo = Animated.createAnimatedComponent(ProgressCircle)

class ProgressCircleExample extends React.PureComponent {
    animation = new Animated.Value(0)

    componentDidMount() {
        Animated.timing(this.animation, {
            toValue: 0.7,
            duration: 2000,
            easing: Easing.easeInEaseOut,
            delay: 300,
        }).start()
    }

    render() {

        return (
            <Foo
                style={{ height: 200 }}
                progress={ this.animation }
                progressColor={ 'rgb(134, 65, 244)' }
            />
        )
    }

}

export default ProgressCircleExample
