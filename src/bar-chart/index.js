import React from 'react'
import BarChart from './bar-chart'
import BarChartGrouped from './bar-chart-grouped'

const BarChartGate = (props) => {
    const { data } = props

    if (data[0] && data[0].hasOwnProperty('data')) {
        return <BarChartGrouped {...props} />
    }

    return <BarChart {...props} />
}

export default BarChartGate
