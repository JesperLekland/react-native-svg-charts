import MultipleBarChartExample from './grouped-bar-chart'
import React from 'react'
import { boolean, color, number, object, select } from '@storybook/addon-knobs'
import * as shape from 'd3-shape'

const MultipleBarChartWithKnobs = () => {

    const fillColor1         = color('fillColor1', 'rgb(134, 65, 244)')
    const fillColorNegative1 = color('fillColorNegative1', 'rgb(134, 65, 244, 0.2)')

    const fillColor2         = color('fillColor2', 'rgb(244, 115, 65)')
    const fillColorNegative2 = color('fillColorNegative2', 'rgb(244, 115, 65, 0.2)')

    const spacing = number('spacing', 0.05)

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
        <MultipleBarChartExample
            fillColor1={ fillColor1 }
            fillColorNegative1={ fillColorNegative1 }
            fillColor2={fillColor2}
            fillColorNegative2={fillColorNegative2}
            curve={ shape[ `curve${curve}` ] }
            contentInset={ contentInset }
            numberOfTicks={ numberOfTicks }
            showGrid={ showGrid }
            gridMin={ gridMin }
            gridMax={ gridMax }
            spacing={spacing}
        />
    )
}

export default MultipleBarChartWithKnobs
