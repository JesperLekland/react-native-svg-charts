import LineChartExample from './index'
import React from 'react'
import { boolean, color, number, object, select } from '@storybook/addon-knobs'
import * as shape from 'd3-shape'

const LineChartWithKnobs = () => {

    const strokeColor = color('stroke', 'rgb(134, 65, 244)')
    const shadowColor = color('stroke', 'rgb(134, 65, 244, 0.2)')

    const strokeWidth   = number('strokeWidth', 2)
    const shadowWidth   = number('strokeWidth', 5)
    const numberOfTicks = number('numberOfTicks', 10)

    const showGrid = boolean('showGrid', true)

    const gridMin = number('gridMin', undefined)
    const gridMax = number('gridMax', undefined)

    const contentInset = object('contentInset', {
        top: 30,
        left: 0,
        right: 0,
        bottom: 30,
    })

    const curve = select(
        'curve',
        [
            'Natural',
            'Cardinal',
            'CatmullRom',
            'Linear',
        ],
        'Natural'
    )

    return (
        <LineChartExample
            shadowColor={ shadowColor }
            strokeColor={ strokeColor }
            curve={ shape[ `curve${curve}` ] }
            contentInset={ contentInset }
            strokeWidth={ strokeWidth }
            numberOfTicks={ numberOfTicks }
            showGrid={ showGrid }
            gridMin={gridMin}
            gridMax={gridMax}
            shadowWidth={shadowWidth}
        />
    )
}

export default LineChartWithKnobs
