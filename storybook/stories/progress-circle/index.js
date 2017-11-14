import React from 'react'
import ProgressCircle from '../../../src/progress-circle'

class ProgressCircleExample extends React.PureComponent {

    render() {

        const {
                  progress      = 0.7,
                  progressColor = 'rgb(134, 65, 244)',
              } = this.props

        return (
            <ProgressCircle
                style={ { height: 200 } }
                progress={ progress }
                progressColor={ progressColor }
            />
        )
    }

}

export default ProgressCircleExample
