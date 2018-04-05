import React from 'react'

import { storiesOf } from '@storybook/react-native'

import AreaChart from './area-chart'
import ShowcaseCard from './decorators/showcase-container'
import LineChart from './line-chart'

import BarChart from './bar-chart'
import BarChartHorizontal from './bar-chart/horizontal'
import BarChartHorizontalGrouped from './bar-chart/horizontal-grouped'
import BarChartGrouped from './bar-chart/grouped'

import PieChart from './pie-chart'
import PieChartWithLabels from './pie-chart/with-labels'
import PieChartWithCenterText from './pie-chart/with-center-text'

import ProgressCircle from './progress-circle'
import ProgressCircleWithCenterTextExample from './progress-circle/with-center-text'
import ProgressGauge from './progress-gauge'

import LayeredCharts from './layered-charts'
import Decorators from './decorator'
import Extras from './extras'

import XAxisScaleBandExample from './x-axis/scale-band'
import XAxisScaleTimeExample from './x-axis/scale-time'
import XAxisScaleLinearExample from './x-axis/scale-linear'
import XAxisDataObjectExample from './x-axis/data-object'

import YAxisExample from './y-axis'

import GradientExample from './gradient'

import AreaStack from './area-stack'
import AreaStackWithAxisExample from './area-stack/with-y-axis'
import StackedBarChartExample from './bar-stack/index'
import StackedBarChartHorizontalExample from './bar-stack/horizontal'
import GradientLineExample from './gradient-line'
import GradientBarExample from './gradient-bar'

import GridMinMax from './grid-min-max'
import CustomGrid from './custom-grid'
import PartialAreaChart from './partial-chart/area-chart'
import PartialLineChart from './partial-chart/line-chart'

import OrderExample from './order'

storiesOf('AreaChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <AreaChart/>)
    .add('Stack', () => <AreaStack/>)
    .add('Stack with axis', () => <AreaStackWithAxisExample/>)

storiesOf('LineChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <LineChart/>)

storiesOf('BarChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <BarChart/>)
    .add('Horizontal', () => <BarChartHorizontal/>)
    .add('Grouped', () => <BarChartGrouped/>)
    .add('Grouped - Horizontal', () => <BarChartHorizontalGrouped/>)
    .add('Stacked', () => <StackedBarChartExample/>)
    .add('Stacked - Horizontal', () => <StackedBarChartHorizontalExample/>)

storiesOf('PieChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <PieChart/>)
    .add('With labels', () => <PieChartWithLabels/>)
    .add('With center text', () => <PieChartWithCenterText/>)

storiesOf('ProgressCircle', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <ProgressCircle/>)
    .add('Gauge', () => <ProgressGauge/>)
    .add('With center text', () => <ProgressCircleWithCenterTextExample/>)

storiesOf('Axes', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('YAxis', () => <YAxisExample/>)
    .add('XAxis - scaleLinear', () => <XAxisScaleLinearExample/>)
    .add('XAxis - scaleTime', () => <XAxisScaleTimeExample/>)
    .add('XAxis - scaleBand', () => <XAxisScaleBandExample/>)
    .add('XAxis - data object', () => <XAxisDataObjectExample />)

storiesOf('Others', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Layered charts', () => <LayeredCharts/>)
    .add('Decorators', () => <Decorators/>)
    .add('Extras', () => <Extras/>)
    .add('Gradient', () => <GradientExample/>)
    .add('Gradient Line', () => <GradientLineExample/>)
    .add('Gradient Bar', () => <GradientBarExample/>)
    .add('Grid Min/Max', () => <GridMinMax/>)
    .add('Custom Grid', () => <CustomGrid/>)
    .add('Partial Area Chart', () => <PartialAreaChart/>)
    .add('Partial Line Chart', () => <PartialLineChart/>)
    .add('Ordering', () => <OrderExample/>)
