import React from 'react'
import StackedBarChart from './stacked-bar-chart'
import StackedBarChartGrouped from './stacked-bar-grouped'

const StackedBarChartGate = (props) => {
    const { data } = props

    if (data[0] && data[0].hasOwnProperty('data')) {
        return React.createElement(StackedBarChartGrouped, props)
    }

    return React.createElement(StackedBarChart, props)
}

export default StackedBarChartGate
//# sourceMappingURL=index.js.map
