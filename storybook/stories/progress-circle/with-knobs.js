import ProgressCircle from './index'
import React from 'react'
import { color, number } from '@storybook/addon-knobs'

const ProgressCircleWithKnobs = () => {

    const progress      = number('progress', 0.7)
    const progressColor = color('progressColor', 'rgb(134, 65, 244)')

    return (
        <ProgressCircle
            progress={ progress }
            progressColor={ progressColor }
        />
    )
}

export default ProgressCircleWithKnobs
