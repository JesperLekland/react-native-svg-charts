# react-native-svg-charts

[![version](https://img.shields.io/npm/v/react-native-svg-charts.svg)](https://www.npmjs.com/package/react-native-svg-charts)
[![downloads](https://img.shields.io/npm/dm/react-native-svg-charts.svg)](https://www.npmjs.com/package/react-native-svg-charts)
![circleci](https://circleci.com/gh/JesperLekland/react-native-svg-charts.svg?style=shield&circle-token=1a809ccdfbd0df3ed425a08f09c558401f794140)
[![license](https://img.shields.io/npm/l/react-native-svg-charts.svg)](https://www.npmjs.com/package/react-native-svg-charts)

In order to not bloat this README to much we've moved some examples over to 
[`react-native-svg-charts-examples`](https://github.com/JesperLekland/react-native-svg-charts-examples#extras).
There we will try to showcase the really cool things you can do with this library. 
This README will try to keep things as simple as possible so that everybody can get up and running as fast as possible.  

### version 3 now available!
Better API, greater extensibility and customisation!
A lot of breaking changes are introduced in this version but we've taken great care to make sure migrating is easy. 
See [releases](https://github.com/JesperLekland/react-native-svg-charts/releases) for more information


## Prerequisites

This library uses [react-native-svg](https://github.com/react-native-community/react-native-svg)
to render its graphs. Therefore this library needs to be installed **AND** linked into your project to work.

Other than the above dependency this library uses pure javascript and supports both iOS and Android

## Motivation

Creating beautiful graphs in React Native shouldn't be hard or require a ton of knowledge.
We use [react-native-svg](https://github.com/react-native-community/react-native-svg) in order to render our SVG's and to provide you with great extensibility.
We utilize the very popular [d3](https://d3js.org/) library to create our SVG paths and to calculate the coordinates.

We built this library to be as extensible as possible while still providing you with the most common charts and data visualization tools out of the box.
The Line-, Bar-, Area- and Waterfall -charts can all be extended with "decorators" and "extras".
The `renderDecorator` prop is called on each passed `dataPoint` and allows you to simply add things such as points or other decorators to your charts.
The `extras` and `renderExtra` prop is used to further decorate your charts with e.g intersections and projections, see the examples for more info.

Feedback and PR's are more than welcome 🙂

## Running

If you want to test out the library you can clone this repository and run it.
We suggest that you test out the [storybooks](https://github.com/storybooks/storybook) that we've implemented.
Most of the charts are implemented with [knobs](https://github.com/storybooks/storybook/tree/master/addons/knobs) so that you can tweak most properties and see their behavior live.

Clone the repo and run the following:

```bash
yarn

# for iOS
(cd ios && pod install)
react-native run-ios

# for Android
react-native run-android

yarn storybook

# and then reload your device
```




## Common Props

| Property | Default | Description |
| --- | --- | --- |
| data | **required** | An array of arbitrary data - use prop `xAccessor`/`yAccessor`to tell the chart about the data structure|
| yAccessor | ({ item }) => item | A function that takes each entry of `data` (named "item") as well as the index and returns the y-value of that entry |
| xAccessor | ({ index }) => index | Same as `yAccessor` but returns the x-value of that entry|
| yScale | d3Scale.scaleLinear | A function that determines the scale of said axis (only tested with scaleLinear, scaleTime & scaleBand )| 
| xScale | d3Scale.scaleLinear | Same as `yScale` but for the x axis |
| svg | `{}` | an object containing  all the props that should be passed down to the underlying `react-native-svg` component. [See available props](https://github.com/react-native-community/react-native-svg#common-props)|
| animate | true | PropTypes.bool |
| animationDuration | 300 | PropTypes.number |
| style | undefined | Supports all [ViewStyleProps](https://facebook.github.io/react-native/docs/viewstyleproptypes.html) |
| curve | d3.curveLinear | A function like [this](https://github.com/d3/d3-shape#curves) |
| contentInset | { top: 0, left: 0, right: 0, bottom: 0 } | An object that specifies how much fake "margin" to use inside of the SVG canvas. This is particularly helpful on Android where `overflow: "visible"` isn't supported and might cause clipping. Note: important to have same contentInset on axis's and chart |
| numberOfTicks | 10 | We use [d3-array](https://github.com/d3/d3-array#ticks) to evenly distribute the grid and dataPoints on the yAxis. This prop specifies how many "ticks" we should try to render. Note: important that this prop is the same on both the chart and on the yAxis |
| showGrid | true | Whether or not to show the grid lines |
| gridMin | undefined | Normally the graph tries to draw from edge to edge within the view bounds. Using this prop will allow the grid to reach further than the actual dataPoints. [Example](#gridmin/max) |
| gridMax | undefined | The same as "gridMin" but will instead increase the grids maximum value |
| renderGrid | `Grid.Horizontal` | A function that returns the component to be rendered as the grid |
| extras | undefined | An array of whatever data you want to render. Each item in the array will call `renderExtra`. [See example](#extras) |
| renderDecorator | `() => {}`| Called once for each entry in `dataPoints` and expects a component. Use this prop to render e.g points (circles) on each data point. [See example](#decorator) |
| renderGrid | `defaultGrid`| A function that renders the grid, see source for argumments |

## Components

This library currently provides the following components
* [Area](#areachart)
* [StackedAreaChart](#stackedareachart)
* [Bar](#barchart)
* [StackedBarChart](#stackedbarchart)
* [Line](#linechart)
* [Pie](#piechart)
* [Progress- Circle / Gauge](#progresschart)
* [YAxis](#yaxis)
* [XAxis](#xaxis)

Also see [other examples](#other-examples)
* [Gradient](#gradient)
* [Decorator](#decorator)
* [Extras](#extras)
* [GridMin/Max](#gridminmax)
* [Layered Charts](#layered-charts)
* [PieChart with labels](#piechart-with-labels)
* [Custom Grid](#custom-grid)
* [Partial Chart](#partial-charts)

### AreaChart

![Area chart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/area-chart.png)

#### Example

```javascript
import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class AreaChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <AreaChart
                style={ { height: 200 } }
                data={ data }
                contentInset={ { top: 30, bottom: 30 } }
                curve={shape.curveNatural}
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
            />
        )
    }
}
```

#### Props

See [Common Props](#common-props)

| Property | Default | Description |
| --- | --- | --- |
| start | 0 | The value of which the area should start (will always end on the data point)  |

### StackedAreaChart

Very similar to an area chart but with multiple sets of data stacked together. Notice that the `dataPoints` prop has changed to `data` and have a different signature.
We suggest that you read up on [d3 stacks](https://github.com/d3/d3-shape#stacks) in order to better understand this chart and its props
See [Area stack chart with Y axis](#area-stack-chart-with-yaxis) to see how to use a YAxis with this component

![Stacked area chart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/area-stack.png)

#### Example

```javascript
import React from 'react'
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class StackedAreaExample extends React.PureComponent {

    render() {

        const data = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ]

        const colors = [ '#8800cc', '#aa00ff', '#cc66ff', '#eeccff' ]
        const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ]

        return (
            <StackedAreaChart
                style={ { height: 200, paddingVertical: 16 } }
                data={ data }
                keys={ keys }
                colors={ colors }
                curve={ shape.curveNatural }
                showGrid={ false }
            />
        )
    }
}

```

#### Props

| Property | Default | Description |
| --- | --- | --- |
| data | **required** | An array of the data entries  |
| keys | **required** | This array should contain the object keys of interest (see above example)
| colors | **required** | An array of equal size as `keys` with the color for each key |
| order | [d3.stackOrderNone](https://github.com/d3/d3-shape#stackOrderNone) | The order in which to sort the areas |
| offset | [d3.stackOffsetNone](https://github.com/d3/d3-shape#stackOffsetNone) | A function to determine the offset of the areas |

Also see [Common Props](#common-props)

### BarChart
![Bar chart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/bar-chart.png)

#### Example (single set data)
```javascript
import React from 'react'
import { BarChart } from 'react-native-svg-charts'

class BarChartExample extends React.PureComponent {

    render() {

        const data    = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const barData = [
            {
                values: data,
                positive: {
                    fill: fillColor,
                    // other react-native-svg supported props
                },
                negative: {
                    fill: fillColorNegative,
                    // other react-native-svg supported props
                },
            },
        ]

        return (
            <BarChart
                style={ { height: 200 } }
                data={ barData }
                contentInset={ { top: 30, bottom: 30 } }
            />
        )
    }

}

```

![Grouped bar chart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/grouped-bar-chart.png)

#### Example (multiple set data - grouped)
```javascript
import React from 'react'
import { BarChart } from 'react-native-svg'

class GroupedBarChartExample extends React.PureComponent {

    render() {

        const data1 = [ 14, -1, 100, -95, -94, -24, -8, 85, -91, 35, -53, 53, -78, 66, 96, 33, -26, -32, 73, 8 ]
        const data2 = [ 24, 28, 93, 77, -42, -62, 52, -87, 21, 53, -78, -62, -72, -6, 89, -70, -94, 10, 86, 84 ]

        const barData = [
            {
                values: data1,
                positive: {
                    fill: 'rgb(134, 65, 244)',
                },
                negative: {
                    fill: 'rgba(134, 65, 244, 0.2)',
                },
            },
            {
                values: data2,
                positive: {
                    fill: 'rgb(244, 115, 65)',
                },
                negative: {
                    fill: 'rgb(244, 115, 65, 0.2)',
                },
            },
        ]

        return (
            <BarChart
                style={ { height: 200 } }
                data={ barData }
                contentInset={ { top: 30, bottom: 30 } }
            />
        )
    }

}

```

### Props
Also see [Common Props](#common-props)

| Property | Default | Description |
| --- | --- | --- |
| data | **required** | Slightly different than other charts since we allow for grouping of bars. This array should contain at least one object with the following shape `{values: array, positive: object, negative: object}` where `positive` and `negative` are objects that contain [svg props](https://github.com/react-native-community/react-native-svg#common-props) to be used depending on the value of the bar  |
| spacing | 0.05 | Spacing between the bars (or groups of bars). Percentage of one bars width. Default = 5% of bar width |
| contentInset | `{ top: 0, left: 0, right: 0, bottom: 0 }` | PropTypes.shape |

### StackedBarChart

The same as the [StackedAreaChart](#stackedareachart) except with bars.
We suggest that you read up on [d3 stacks](https://github.com/d3/d3-shape#stacks) in order to better understand this chart and its props

![Stacked bar chart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/bar-stack.png)

#### Example

```javascript
import React from 'react'
import { StackedBarChart } from 'react-native-svg-charts'

class StackedBarChartExample extends React.PureComponent {

    render() {

        const data = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
                oranges: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ]

        const colors = [ '#7b4173', '#a55194', '#ce6dbd', '#de9ed6' ]
        const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ]

        return (
            <StackedBarChart
                style={ { height: 200 } }
                keys={ keys }
                colors={ colors }
                data={ data }
                showGrid={ false }
                contentInset={ { top: 30, bottom: 30 } }
            />
        )
    }

}

```

#### Props

| Property | Default | Description |
| --- | --- | --- |
| data | **required** | An array of the data entries  |
| keys | **required** | This array should contain the object keys of interest (see above example)
| colors | **required** | An array of equal size as `keys` with the color for each key |
| order | [d3.stackOrderNone](https://github.com/d3/d3-shape#stackOrderNone) | The order in which to sort the areas |
| offset | [d3.stackOffsetNone](https://github.com/d3/d3-shape#stackOffsetNone) | A function to determine the offset of the areas |

Also see [Common Props](#common-props)

### LineChart
![Line chart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/line-chart.png)

#### Example

```javascript
import React from 'react'
import { LineChart } from 'react-native-svg-charts'

class LineChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <LineChart
                style={ { height: 200 } }
                data={ data }
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={ { top: 20, bottom: 20 } }
            />
        )
    }

}

```

#### Props
See [Common Props](#common-props)

### PieChart
![Pie chart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/pie-chart.png)

#### Example
```javascript
import React from 'react'
import { PieChart } from 'react-native-svg-charts'

class PieChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                color: randomColor(),
                key: `pie-${index}`,
                onPress: () => console.log(`${index} slice pressed`),
            }))

        return (
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
            />
        )
    }

}
```

#### Props

| Property | Default | Description |
| --- | --- | --- |
| data | **required** | Slightly different than `dataPoints` because we allow for custom coloring of slices and onPress callback. The array should contain objects of the following shape: `{key: 'string|number', color: 'string', value: 'number', onPress?: function}` |
| outerRadius | "100%" | The outer radius, use this to tweak how close your pie is to the edge of it's container. Takes either percentages or absolute numbers (pixels) |
| innerRadius | "50%" | The inner radius, use this to create a donut. Takes either percentages or absolute numbers (pixels) |
| labelRadius | undefined | The radius of the circle that will help you layout your labels. Takes either percentages or absolute numbers (pixels) |
| padAngle | |  The angle between the slices |
| renderDecorator | `() => {}` | PropTypes.func |
| sort | `(a,b) => b.value - a.value` | Like any normal sort function it expects either 0, a positive or negative return value. The arguments are each an object from the `dataPoints` array |


### ProgressCircle
![Progress circle](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/progress-circle.png)

#### Example
```javascript
import React from 'react'
import { ProgressCircle }  from 'react-native-svg-charts'

class ProgressCircleExample extends React.PureComponent {

    render() {

        return (
            <ProgressCircle
                style={ { height: 200 } }
                progress={ 0.7 }
                progressColor={'rgb(134, 65, 244)'}
            />
        )
    }

}

```


![Progress gauge](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/progress-gauge.png)

#### Example (Gauge variant)
```javascript
import React from 'react'
import { ProgressCircle } from 'react-native-svg-charts'

class ProgressGaugeExample extends React.PureComponent {

    render() {

        return (
            <ProgressCircle
                style={ { height: 200 } }
                progress={ 0.7 }
                progressColor={ 'rgb(134, 65, 244)' }
                startAngle={ -Math.PI * 0.8 }
                endAngle={ Math.PI * 0.8 }
            />
        )
    }

}

```

#### Props

| Property | Default | Description |
| --- | --- | --- |
| progress | **required** | PropTypes.number.isRequired |
| progressColor | 'black' | PropTypes.any |
| startAngle | `0` | PropTypes.number |
| endAngle | `Math.PI * 2` |  PropTypes.number |

### YAxis

![Y-axis](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/y-axis.png)

A helper component to layout your Y-axis labels on the same coordinates as your chart.
It's very important that the component has the exact same view bounds (preferably wrapped in the same parent view) as the chart it's supposed to match.
If the chart has property `contentInset` set it's very important that the YAxis has the same vertical contentInset.

#### Example
```javascript
import React from 'react'
import { LineChart, YAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

class YAxisExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const contentInset = { top: 20, bottom: 20 }

        return (
            <View style={ { height: 200, flexDirection: 'row' } }>
                <YAxis
                  data={data}
                  contentInset={ contentInset }
                  svg={{
                      fill: 'grey',
                      fontSize: 10,
                  }}
                  formatLabel={ value => `${value}ºC` }
                />
                <LineChart
                    style={ { flex: 1, marginLeft: 16 } }
                    data={data}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                    contentInset={ contentInset }
                />
            </View>
        )
    }

}

```

#### Props

(see [Common Props](#common-props))

| Property | Default | Description |
| --- | --- | --- |
| scale | `d3Scale.scaleLinear`| Should be the same as passed into the charts `yScale` |
| svg | `{}` | supports all svg props an svg text normally supports |
| formatLabel | `value => {}` | A utility function to format the text before it is displayed, e.g `value => "$" + value |
| contentInset | { top: 0, bottom: 0 } | Used to sync layout with chart (if same prop used there) |
| min | undefined | Used to sync layout with chart (if gridMin is used there) |
| max | undefined | Used to sync layout with chart (if gridMax is used there) |


### XAxis

![Line chart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/x-axis.png)

A helper component to layout your X-axis labels on the same coordinates as your chart.
It's very important that the component has the exact same view bounds (preferably wrapped in the same parent view) as the chart it's supposed to match.
If the chart has property `contentInset` set it's very important that the YAxis has the same horizontal contentInset.

#### Example
```javascript
import React from 'react'
import { LineChart, XAxis } from 'react-native-svg-charts'
import { View } from 'react-native'

class XAxisExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <View style={{ height: 200, padding: 20 }}>
                <LineChart
                    style={{ flex: 1 }}
                    data={data}
                    gridMin={0}
                    contentInset={{ top: 10, bottom: 10 }}
                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                />
                <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={ data }
                    formatLabel={ (value, index) => index }
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10 }}
                />
            </View>
        )
    }
}

```


#### Props

| Property | Default | Description |
| --- | --- | --- |
| values | **required** | An array of values to render on the xAxis. Should preferably have the same length as the chart's dataPoints. |
| scale | `d3Scale.scaleLinear`| Should be the same as passed into the charts `xScale` |
| spacing | 0.05 | Only applicable if `scale=d3Scale.scaleBand` and should then be equal to `spacing` prop on the actual BarChart.   |
| svg | `{}` | supports all svg props an svg text normally supports |
| formatLabel | `(value, index) => index}` | A utility function to format the text before it is displayed, e.g `value => "day" + value |
| contentInset | { left: 0, right: 0 } | Used to sync layout with chart (if same prop used there) |



## Other Examples

### Gradient
Gradients are supported by the `AreaChart`, `LineChart` and `BarChart` and is used with the `renderGradient` prop according to the example below.
`renderGradient` is similar to `renderDecorator` and `renderExtra`. To get more information on exactly what arguments are passed take a look in the source code (shouldn't be too complicated)
You can read more about the available gradients [here](https://github.com/react-native-community/react-native-svg#lineargradient)

![Gradient AreaChart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/gradient.png)
![Gradient LineChart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/gradient-line.png)
![Gradient BarChart](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/gradient-bar.png)

```javascript
import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop } from 'react-native-svg'

class GradientExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const Gradient = ({ index }) => (
            <Defs key={index}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} stopOpacity={0.8}/>
                    <Stop offset={'100%'} stopColor={'rgb(134, 65, 244)'} stopOpacity={0.2}/>
                </LinearGradient>
            </Defs>
        )

        return (
            <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 20, bottom: 20 }}
                extras={[ Gradient ]}
                svg={{ fill: 'url(#gradient)' }}
            />
        )
    }

}

```

### Decorator

The `renderDecorator` prop allow for decorations on each of the provided data points. The `renderDecorator` is very similar to the `renderItem` of a [FlatList](https://facebook.github.io/react-native/docs/flatlist.html)
and is a function that is called with an object as an arguments to help the layout of the extra decorator. The content of the argument object is as follows:

```javascript
{
    value: number, // the value of the data points. Pass to y function to get y coordinate of data point
    index: number, // the index of the data points. Pass to x function to get x coordinate of data point
    x: function, // the function used to calculate the x coordinate of a specific data point index
    y: function, // the function used to calculate the y coordinate of a specific data point value
}
```

Remember that all components returned by `renderDecorator` must be one that is renderable by the [`<Svg/>`](https://github.com/react-native-community/react-native-svg#svg) element, i.e all components supported by [react-native-svg](https://github.com/react-native-community/react-native-svg)

![Decorator](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/decorators.png)

```javascript
import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import { Circle } from 'react-native-svg'

class DecoratorExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <AreaChart
                style={ { height: 200 } }
                data={ data }
                svg={ { fill: 'rgba(134, 65, 244, 0.2)' } }
                contentInset={ { top: 20, bottom: 30 } }
                renderDecorator={ ({ x, y, index, value }) => (
                    <Circle
                        key={ index }
                        cx={ x(index) }
                        cy={ y(value) }
                        r={ 4 }
                        stroke={ 'rgb(134, 65, 244)' }
                        fill={ 'white' }
                    />
                ) }
            />
        )
    }

}
```
### Extras
The `extras` prop allow for arbitrary decorators on your chart.
and is a function that is called with an object as an arguments to help the layout of the extra decorator. The content of the argument object is as follows:

```javascript
{
    item: any, // the entry of the 'extras' array
    x: function, // the function used to calculate the x coordinate of a specific data point index
    y: function, // the function used to calculate the y coordinate of a specific data point value
    index: number, // the index of the item in the 'extras' array
    width: number, // the width of the svg canvas,
    height: number, // the number fo the svg canvas,
}
```
There might be additional parameters sent to the `extras` functions as well, depending on the chart type.

The `LineChart` passes the svg path data that rendered the line. (argument name `line`)

The `AreaChart` passes both the area svg path as well as the 
svg path for the line following the upper bounds of the area. 
(argument name `area` and `line` respectively)

See [Partial Chart](#partial-chart) for use case for this.

Remember that all components returned by an `extras` function must be one that is renderable by the [`<Svg/>`](https://github.com/react-native-community/react-native-svg#svg) element, i.e all components supported by [react-native-svg](https://github.com/react-native-community/react-native-svg)

![Extras](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/extras.png)

#### Example

```javascript
import React from 'react'
import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text } from 'react-native-svg'

class ExtrasExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        /**
         * Both below functions should preferably be their own React Components
         */

        const HorizontalLine = (({ y }) => (
            <Line
                key={ 'zero-axis' }
                x1={ '0%' }
                x2={ '100%' }
                y1={ y(50) }
                y2={ y(50) }
                stroke={ 'grey' }
                strokeDasharray={ [ 4, 8 ] }
                strokeWidth={ 2 }
            />
        ))

        const Tooltip = ({ x, y }) => (
            <G
                x={ x(5) - (75 / 2) }
                key={ 'tooltip' }
                onPress={ () => console.log('tooltip clicked') }
            >
                <G y={ 50 }>
                    <Rect
                        height={ 40 }
                        width={ 75 }
                        stroke={ 'grey' }
                        fill={ 'white' }
                        ry={ 10 }
                        rx={ 10 }
                    />
                    <Text
                        x={ 75 / 2 }
                        dy={20}
                        alignmentBaseline={'middle'}
                        textAnchor={ 'middle' }
                        stroke={ 'rgb(134, 65, 244)' }
                    >
                        { `${data[5]}ºC` }
                    </Text>
                </G>
                <G x={ 75 / 2 }>
                    <Line
                        y1={ 50 + 40 }
                        y2={ y(data[ 5 ]) }
                        stroke={ 'grey' }
                        strokeWidth={ 2 }
                    />
                    <Circle
                        cy={ y(data[ 5 ]) }
                        r={ 6 }
                        stroke={ 'rgb(134, 65, 244)' }
                        strokeWidth={2}
                        fill={ 'white' }
                    />
                </G>
            </G>
        )

        return (
            <LineChart
                style={ { height: 200 } }
                data={ data }
                svg={{
                    stroke: 'rgb(134, 65, 244)',
                    strokeWidth: 2,
                }}
                contentInset={ { top: 20, bottom: 20 } }
                curve={ shape.curveLinear }
                extras={ [ HorizontalLine, Tooltip ] }
            />
        )
    }

}
```

### gridMin/Max
Charts normally render edge to edge, if this is not the wanted behaviour it can easily be altered with the `gridMin` and `gridMax` props. Just compare the below example with the example for the regular [AreaChart](#areachart)

![Grid Min Max](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/grid-min-max.png)

#### Example
```javascript
import React from 'react'
import { AreaChart, Path } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

class GridMinMaxExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <AreaChart
                style={{ height: 200 }}
                data={data}
                svg={{ fill: 'rgba(134, 65, 244, 0.2)' }}
                curve={shape.curveNatural}
                gridMax={500}
                gridMin={-500}
                extras={[
                    ({ line }) => (
                        <Path
                            key={'line '}
                            d={line}
                            stroke={'rgb(134, 65, 244)'}
                            fill={'none'}
                        />
                    ),
                ]}
            />
        )
    }

}
```

### StackedAreaChart with YAxis
Since the `<StackedAreaChart>` uses a different data structure and can be affected by both the `order` and `offset` prop it's not obvious how to extra the dataPoints for the YAxis.
The remedy this the AreaStackChart exposes a static API with a function `extractDataPoints` where you must pass in the same `data`,  `keys` ( as well as  `order` and `offset` if other than default is used) as the props to the component itself

![Area stack chart with YAxis](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/area-stack-with-y-axis.png)

```javascript
import React from 'react'
import { StackedAreaChart, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { View } from 'react-native'

class AreaStackWithAxisExample extends React.PureComponent {

    render() {

        const data = [
            {
                month: new Date(2015, 0, 1),
                apples: 3840,
                bananas: 1920,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 1, 1),
                apples: 1600,
                bananas: 1440,
                cherries: 960,
                dates: 400,
            },
            {
                month: new Date(2015, 2, 1),
                apples: 640,
                bananas: 960,
                cherries: 3640,
                dates: 400,
            },
            {
                month: new Date(2015, 3, 1),
                apples: 3320,
                bananas: 480,
                cherries: 640,
                dates: 400,
            },
        ]

        const colors = [ 'rgb(138, 0, 230, 0.8)', 'rgb(173, 51, 255, 0.8)', 'rgb(194, 102, 255, 0.8)', 'rgb(214, 153, 255, 0.8)' ]
        const keys   = [ 'apples', 'bananas', 'cherries', 'dates' ]

        return (
            <View style={ { flexDirection: 'row', height: 200 } }>
                <StackedAreaChart
                    style={ { flex: 1 } }
                    contentInset={ { top: 10, bottom: 10 } }
                    data={ data }
                    keys={ keys }
                    colors={ colors }
                    curve={ shape.curveNatural }
                    { ...this.props }
                />
                <YAxis
                    style={ { position: 'absolute', top: 0, bottom: 0 }}
                    data={ StackedAreaChart.extractDataPoints(data, keys) }
                    contentInset={ { top: 10, bottom: 10 } }
                    svg={ {
                        fontSize: 8,
                        fill: 'white',
                        stroke: 'black',
                        strokeWidth: 0.1,
                        alignmentBaseline: 'baseline',
                        baselineShift: '3',
                    } }
                />
            </View>
        )
    }
}

```

### Layered Charts
This library supports layering/composing out of the box with simple styling. As long as the layered charts share the same container and are correctly positioned everything will work as expected.
If your data sets don't share the same max/min data make sure to utilize the `gridMin/gridMax` prop to align the charts.

![Stacked Charts](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/stacked-charts.png)

#### Example
```javascript
import React from 'react'
import { AreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { StyleSheet, View } from 'react-native'

class LayeredChartsExample extends React.PureComponent {

    render() {

        const data  = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
        const data2 = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ].reverse()

        return (
            <View style={ { height: 200 } }>
                <AreaChart
                    style={ { flex: 1 } }
                    data={ data }
                    svg={{ fill: 'rgba(134, 65, 244, 0.5)' }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                />
                <AreaChart
                    style={ StyleSheet.absoluteFill }
                    data={ data2 }
                    svg={{ fill: 'rgba(34, 128, 176, 0.5)' }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={ shape.curveNatural }
                />
            </View>
        )
    }

}
```

### PieChart with labels
The PieChart as well as most of the charts support decorators.
In the case of the PieChart you get `pieCentroid` and `labelCentroid` instead of the `x` and `y` as arguments in the `renderDecorator` callback.
This will allow you to render labels aligned with your pie slices. Experiment with `outerRadius` and `labelRadius` to layout your labels in relation to your chart

![PieChart with labels](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/pie-chart-with-labels.png)

### Example
```javascript
import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'

class PieChartWithLabelExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91 ]

        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const pieData = data
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                color: randomColor(),
                key: `pie-${index}`,
            }))

        return (
            <PieChart
                style={ { height: 200 } }
                data={ pieData }
                spacing={ 0 }
                innerRadius={ 20 }
                outerRadius={ 55 }
                labelRadius={ 80 }
                renderDecorator={ ({ item, pieCentroid, labelCentroid, index }) => (
                    <G key={ index }>
                        <Line
                            x1={ labelCentroid[ 0 ] }
                            y1={ labelCentroid[ 1 ] }
                            x2={ pieCentroid[ 0 ] }
                            y2={ pieCentroid[ 1 ] }
                            stroke={ item.color }
                        />
                        <Circle
                            cx={ labelCentroid[ 0 ] }
                            cy={ labelCentroid[ 1 ] }
                            r={ 15 }
                            fill={ item.color }
                        />
                    </G>
                ) }

            />
        )
    }

}
```


### Custom grid
The default grid is just a collection of horizontal `Line`s. If you simply want to change the direction or styling look at the `renderGrid` & `gridProps` prop.
Some projects might require more control of the grid ( direction, different distributions etc), therefore all affected components support the `renderGrid` prop.
The `renderGrid` prop takes a function and provides the `x`, `y`, `ticks` and `dataPoints` arguments. Use them as in the example below

![Custom grid](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/custom-grid.png)

### Example
```javascript
import React from 'react'
import { LineChart } from 'react-native-svg-charts'
import { View } from 'react-native'
import { G, Line } from 'react-native-svg'

class CustomGridExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const CustomGrid = ({ x, y, data, ticks }) => (
            <G>
                {
                    // Horizontal grid
                    ticks.map(tick => (
                        <Line
                            key={ tick }
                            x1={ '0%' }
                            x2={ '100%' }
                            y1={ y(tick) }
                            y2={ y(tick) }
                            stroke={ 'rgba(0,0,0,0.2)' }
                        />
                    ))
                }
                {
                    // Vertical grid
                    data.map((_, index) => (
                        <Line
                            key={ index }
                            y1={ '0%' }
                            y2={ '100%' }
                            x1={ x(index) }
                            x2={ x(index) }
                            stroke={ 'rgba(0,0,0,0.2)' }
                        />
                    ))
                }
            </G>
        )

        return (
            <View style={ { height: 200, flexDirection: 'row' } }>
                <LineChart
                    style={ { flex: 1 } }
                    data={ data }
                    svg={ {
                        stroke: 'rgb(134, 65, 244)',
                    } }
                    renderGrid={ CustomGrid }
                />
            </View>
        )
    }

}

```

### Partial Charts
Here's another example of how the `extras` property can be used to create highly customizable charts. 

![Partial Charts](https://raw.githubusercontent.com/jesperlekland/react-native-svg-charts/master/screenshots/partial-charts.png)

### Example (LineChart)
```javascript
import React from 'react'
import { ClipPath, Defs, Rect } from 'react-native-svg'
import { LineChart, Path } from 'react-native-svg-charts'

class PartialLineChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const indexToClipFrom = 10

        const Clips = ({ x, width }) => (
            <Defs key={'clips'}>
                <ClipPath id="clip-path-1">
                    <Rect x={'0'} y={'0'} width={x(indexToClipFrom)} height={'100%'}/>
                </ClipPath>
                <ClipPath id={'clip-path-2'}>
                    <Rect x={x(indexToClipFrom)} y={'0'} width={width - x(indexToClipFrom)} height={'100%'}/>
                </ClipPath>
            </Defs>
        )

        // Line extras:
        const DashedLine = ({ line }) => (
            <Path
                key={'line-1'}
                d={line}
                stroke={'rgb(134, 65, 244)'}
                strokeWidth={2}
                fill={'none'}
                strokeDasharray={[ 4, 4 ]}
                clipPath={'url(#clip-path-2)'}
            />
        )

        const Shadow = ({ line }) => (
            <Path
                y={3}
                key={'shadow-1'}
                d={line}
                stroke={'rgba(134, 65, 244, 0.2)'}
                strokeWidth={5}
                fill={'none'}
            />
        )

        return (
            <LineChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 20, bottom: 20 }}
                svg={{
                    stroke: 'rgb(134, 65, 244)',
                    strokeWidth: 2,
                    clipPath: 'url(#clip-path-1)',
                }}
                extras={[
                    Clips,
                    Shadow,
                    DashedLine,
                ]}
            />
        )
    }
}

```

### Example (AreaChart)
```javascript
import React from 'react'
import { ClipPath, Defs, LinearGradient, Rect, Stop } from 'react-native-svg'
import { AreaChart, Path } from 'react-native-svg-charts'

class PartialAreaChartExample extends React.PureComponent {
    render() {
        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        const indexToClipFrom = 10

        const Gradient = () => (
            <Defs key={'defs'}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} stopOpacity={0.8}/>
                    <Stop offset={'100%'} stopColor={'rgb(134, 65, 244)'} stopOpacity={0.2}/>
                </LinearGradient>
            </Defs>
        )

        const Clips = ({ x, width }) => (
            <Defs key={'clips'}>
                <ClipPath id={'clip-path-1'} key={'0'}>
                    <Rect x={0} y={'0'} width={x(indexToClipFrom)} height={'100%'}/>
                </ClipPath>
                <ClipPath id="clip-path-2" key={'1'}>
                    <Rect x={x(indexToClipFrom)} y={'0'} width={width - x(indexToClipFrom)} height={'100%'}/>
                </ClipPath>
            </Defs>
        )

        const Line = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'green'}
                fill={'none'}
                clipPath={'url(#clip-path-1)'}
            />
        )

        const DashedLine = ({ line }) => (
            <Path
                key={'dashed-line'}
                stroke={'green'}
                d={line}
                fill={'none'}
                clipPath={'url(#clip-path-2)'}
                strokeDasharray={[ 4, 4 ]}
            />
        )

        return (
            <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 30, bottom: 30 }}
                svg={{
                    fill: 'url(#gradient)',
                    clipPath: 'url(#clip-path-1)',
                }}
                extras={[
                    Gradient,
                    Clips,
                    Line,
                    DashedLine,
                ]}
            />
        )
    }
}

```

## License
[MIT](./LICENSE)
