import ProgressCircle from './index'
import React from 'react'
import { color, number } from '@storybook/addon-knobs'

const ProgressGaugeWithKnobs = () => {

    const progress      = number('progress', 0.7)
    const progressColor = color('progressColor', 'rgb(134, 65, 244)')

    const startAngle = number('startAngle', -Math.PI * 0.8,)
    const endAngle = number('endAngle', Math.PI * 0.8 )

    return (
        <ProgressCircle
            progress={ progress }
            progressColor={ progressColor }
            startAngle={startAngle}
            endAngle={endAngle}
        />
    )
}

export default ProgressGaugeWithKnobs
