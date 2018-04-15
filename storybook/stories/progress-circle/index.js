import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'

class ProgressCircleExample extends React.PureComponent {

    render() {

        return (
            <ProgressCircle
                style={{ height: 200 }}
                progress={ 0.4 }
                progressColor={ 'rgb(134, 65, 244)' }
            />
        )
    }

}

export default ProgressCircleExample
