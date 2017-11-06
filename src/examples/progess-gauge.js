import React from 'react'
import ProgressCircle from '../progress-circle'

class ProgressGaugeExample extends React.PureComponent {

    render() {

        return (
            <ProgressCircle
                style={ { height: 200 } }
                progress={ 0.7 }
                progressColor={ 'rgb(134, 65, 244)' }
                startAngle={ -Math.PI * 0.8 }
                endAngle={ Math.PI * 0.8 }
            />
        )
    }

}

export default ProgressGaugeExample
