import React from 'react'
import BarChart from './bar-chart'
import BarChartGrouped from './bar-chart-grouped'

const BarChartGate = (props) => {
    const { data } = props

    if (data[0] && data[0].hasOwnProperty('data')) {
        return React.createElement(BarChartGrouped, props)
    }

    return React.createElement(BarChart, props)
}

export default BarChartGate
//# sourceMappingURL=index.js.map
