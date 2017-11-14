import BarChartExample from './index'
import React from 'react'
import { boolean, color, number, object } from '@storybook/addon-knobs'

const BarChartWithKnobs = () => {

    const fillColor         = color('fillColor', 'rgb(134, 65, 244)')
    const fillColorNegative = color('fillColorNegative', 'rgb(134, 65, 244, 0.2)')

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

    return (
        <BarChartExample
            fillColor={ fillColor }
            fillColorNegative={ fillColorNegative }
            contentInset={ contentInset }
            numberOfTicks={ numberOfTicks }
            showGrid={ showGrid }
            gridMin={ gridMin }
            gridMax={ gridMax }
            spacing={ spacing }
        />
    )
}

export default BarChartWithKnobs
