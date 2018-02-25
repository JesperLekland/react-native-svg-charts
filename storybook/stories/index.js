import React from 'react'

import { storiesOf } from '@storybook/react-native'

import AreaChart from './area-chart'
import ShowcaseCard from './decorators/showcase-container'
import LineChart from './line-chart'

import BarChart from './bar-chart'
import MultipleBarChart from './bar-chart/grouped-bar-chart'

import PieChart from './pie-chart'
import PieChartWithLabels from './pie-chart/with-labels'

import ProgressCircle from './progress-circle'
import ProgressGauge from './progress-gauge'

import LayeredCharts from './layered-charts'
import Decorators from './decorator'
import Extras from './extras'

import XAxisScaleBandExample from './x-axis/scale-band'
import XAxisScaleTimeExample from './x-axis/scale-time'
import XAxisScaleLinearExample from './x-axis/scale-linear'

import YAxisExample from './y-axis'

import WaterfallChartExample from './waterfall-chart'
import GradientExample from './gradient'

import AreaStack from './area-stack'
import AreaStackWithAxisExample from './area-stack/with-y-axis'
import StackedBarChartExample from './bar-stack/index'
import GradientLineExample from './gradient-line'
import GradientBarExample from './gradient-bar'

import GridMinMax from './grid-min-max'
import CustomGrid from './custom-grid'
import PartialAreaChart from './partial-chart/area-chart'
import PartialLineChart from './partial-chart/line-chart'

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
    .add('Multiple data set', () => <MultipleBarChart/>)
    .add('Stacked', () => <StackedBarChartExample/>)

storiesOf('PieChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <PieChart/>)
    .add('With labels', () => <PieChartWithLabels/>)
    .add('With labels', () => <PieChartWithLabels/>)

storiesOf('WaterfallChart', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <WaterfallChartExample/>)

storiesOf('ProgressCircle', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('Standard', () => <ProgressCircle/>)
    .add('Gauge', () => <ProgressGauge/>)

storiesOf('Axes', module)
    .addDecorator(getStory => <ShowcaseCard>{ getStory() }</ShowcaseCard>)
    .add('YAxis', () => <YAxisExample/>)
    .add('XAxis - scaleLinear', () => <XAxisScaleLinearExample/>)
    .add('XAxis - scaleTime', () => <XAxisScaleTimeExample/>)
    .add('XAxis - scaleBand', () => <XAxisScaleBandExample/>)

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
