import React from 'react'
import ProgressCircle from '../../../src/progress-circle'

class ProgressGaugeExample extends React.PureComponent {

    render() {

        const {
                  progress      = 0.7,
                  progressColor = 'rgb(134, 65, 244)',
                  startAngle    = -Math.PI * 0.8,
                  endAngle      = Math.PI * 0.8,
              } = this.props

        return (
            <ProgressCircle
                style={ { height: 200 } }
                progress={ progress }
                progressColor={ progressColor }
                startAngle={ startAngle }
                endAngle={ endAngle }
            />
        )
    }

}

export default ProgressGaugeExample
