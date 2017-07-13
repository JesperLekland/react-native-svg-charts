// eslint-disable-next-line no-unused-vars
import React from 'react'
import { AppRegistry } from 'react-native'
import App from './app'

export { default as LineChart } from './line-chart'
export { default as PieChart } from './pie-chart'
export { default as AreaChart } from './area-chart'
export { default as BarChart } from './bar-chart'

AppRegistry.registerComponent('d3Playground', () => App)
