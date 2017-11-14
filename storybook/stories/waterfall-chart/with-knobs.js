import WaterfallChartExample from './index'
import React from 'react'
import { array, boolean, number, object } from '@storybook/addon-knobs'

const BarChartWithKnobs = () => {

    const dashArray = array('dashArray', [ 5, 5 ])

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
        <WaterfallChartExample
            contentInset={ contentInset }
            numberOfTicks={ numberOfTicks }
            dashArray={ dashArray.map(string => parseInt(string) || 0) }
            showGrid={ showGrid }
            gridMin={ gridMin }
            gridMax={ gridMax }
            spacing={ spacing }
        />
    )
}

export default BarChartWithKnobs
