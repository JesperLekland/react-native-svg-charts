# react-native-svg-charts

[![npm version](https://img.shields.io/npm/v/react-native-svg-charts.png)](https://www.npmjs.com/package/react-native-svg-charts)
[![npm](https://img.shields.io/npm/dm/react-native-svg-charts.svg)](https://www.npmjs.com/package/react-native-svg-charts)

## Prerequisites

This library uses [react-native-svg](https://github.com/react-native-community/react-native-svg) to render its graphs. Therefore this library is listed as a `peerDependency` and needs to be installed **AND** linked into your project to work.

## Motivation

Creating beautiful graphs in React Native shouldn't be hard or require a ton of knowledge.
With react-native-svg-charts we utilize the very popular [d3](https://d3js.org/) library to create our SVG paths and to calculate all coordinates.

## Components

This library currently provides the following chart components
* [YAxis](#yaxis)
* [XAxis](#xaxis)
* [Area](#areachart)
* [Bar](#barchart)
* [Line](#linechart)
* [Pie](#piechart)
* [Progress- Circle / Gauge](#progresschart)
* [Waterfall](#waterfallchart)

### YAxis

![Line chart](./screenshots/axis-chart.png)

A helper component to layout your Y-axis labels on the same coordinates as your chart.
It's very important that the component has the exact same view bounds (preferably wrapped in the same parent view) as the chart it's supposed to match.
If the chart has property `contentInset` set it's very important that the YAxis has the same vertical contentInset.
#### Example

```javascript
import { YAxis } from 'react-native-svg-charts'

const foo = () => (
<View style={{ height: 200 }}>
    <YAxis
        dataPoints={data}
        style={{ width: 40 }}
        contentInset={{ bottom: 10, top: 10 }}
        labelStyle={{ color: 'red' }}
    />
    <FooChart
        style={{ flex: 1 }}
        dataPoints={data}
        contentInset={{ bottom: 10, left: 15, top: 10, right: 15 }}
    />
</View>

```

#### Props

| Property | Default | Description |
| --- | --- | --- |
| dataPoints | **required** | PropTypes.arrayOf(PropTypes.number).isRequired |
| style | | PropTypes.any |
| labelStyle | | PropTypes.any |
| numberOfTicks | 10 | PropTypes.number |
| formatLabel | `value => {}` | PropTypes.func |
| contentInset | |  PropTypes.shape({ top: PropTypes.number, bottom: PropTypes.number,}) |

### XAxis

![Line chart](./screenshots/axis-chart.png)

A helper component to layout your X-axis labels on the same coordinates as your chart.
It's very important that the component has the exact same view bounds (preferably wrapped in the same parent view) as the chart it's supposed to match.
If the chart has property `contentInset` set it's very important that the YAxis has the same horizontal contentInset.
The XAxis has a special property `chartType` that should match the type of the chart in order to layout the labels correctly
#### Props

| Property | Default | Description |
| --- | --- | --- |
| values | **required** | PropTypes.array.isRequired |
| chartType | `XAxis.Type.LINE`| PropTypes.oneOf([ XAxis.Type.LINE, XAxis.Type.BAR ]) |
| style | | PropTypes.any |
| spacing | 0.05 | PropTypes.number |
| labelStyle | | PropTypes.any |
| numberOfTicks | 10 | PropTypes.number |
| formatLabel | `value => {}` | PropTypes.func |
| contentInset | |  PropTypes.shape({ left: PropTypes.number, right: PropTypes.number,}) |

### AreaChart

![Area chart](./screenshots/area-chart.png)

#### Example

```javascript
import { AreaChart } from 'react-native-svg-charts'

const chart = () => (
    <AreaChart
        style={styles.flex1}
        dataPoints={data.map(data => data.value)}
        showPoints={false}
        strokeColor={'white'}
        strokeWidth={2}
        renderGradient={({ id }) => (
            <LinearGradient id={id} x1={'0'} y={'0'} x2={'0'} y2={`50%`}>
                <Stop offset={'0'} stopColor={'blue'} stopOpacity={0.9}/>
                <Stop offset={`1`} stopColor={'blue'} stopOpacity={0.3}/>
            </LinearGradient>
        )}
        contentInset={{ bottom: 10, left: 15, top: 10, right: 15 }}
    />
)
```

#### Props

| Property | Default | Description |
| --- | --- | --- |
| dataPoints | **required** | An array of integers - the data points you want plotted |
| strokeColor | 'black' | PropTypes.string |
| strokeWidth | 1 | PropTypes.number |
| fillColor | 'none' | PropTypes.string |
| dashArray | [ 5, 5] | PropTypes.arrayOf(PropTypes.number) |
| showPoints | true |  PropTypes.bool |
| pointColor | 'white' | PropTypes.string |
| renderGradient | `() => {}` | PropTypes.func (see [this](https://github.com/react-native-community/react-native-svg#lineargradient) for more info) |
| pointSize | 5 | PropTypes.number |
| pointWidth | 5 | PropTypes.number |
| animate | true | PropTypes.bool |
| animationDuration | 300 | PropTypes.number |
| style | undefined | PropTypes.any |
| curve | foo | PropTypes.func |
| contentInset | `{ top: 0, left: 0, right: 0, bottom: 0 }` | PropTypes.shape |
| numberOfTicks | 9 | PropTypes.number |
| showGrid | true | PropTypes.bool |
| gridMin | undefined | PropTypes.number |
| gridMax | undefined | PropTypes.number |
| intersections | [ ] | PropTypes.arrayOf(PropTypes.number) |
| renderIntersection | `() => {}` | PropTypes.func |

### BarChart
![Bar chart](./screenshots/bar-chart.png)

#### Example
```javascript
import { BarChart } from 'react-native-svg-charts'

const foo = () => (
    <BarChart
        style={FLEX_1}
        dataPoints={[
            {
                ...colors,
                values: [5,3,2,3]
            },
            {
                ...colors,
                values: [-5,2,5,-3]
            }
        ]}
        spacing={0.3}
    />
)
```

| Property | Default | Description |
| --- | --- | --- |
| dataPoints | **required** | dataPoints: PropTypes.arrayOf(PropTypes.shape({ <br> fillColor: PropTypes.string, <br> strokeColor: PropTypes.string, <br> strokeColorNegative: PropTypes.string, <br>fillColorNegative: PropTypes.string, <br>values: PropTypes.arrayOf(PropTypes.number).isRequired, <br>})).isRequired, |
| spacing | 0.05 | PropTypes.number |
| strokeColor | 'black' | PropTypes.string |
| strokeWidth | 1 | PropTypes.number |
| fillColor | 'none' | PropTypes.string |
| renderGradient | `() => {}` | PropTypes.func (see [this](https://github.com/react-native-community/react-native-svg#lineargradient) for more info) |
| animate | true | PropTypes.bool |
| animationDuration | 300 | PropTypes.number |
| style | undefined | PropTypes.any |
| curve | foo | PropTypes.func |
| contentInset | `{ top: 0, left: 0, right: 0, bottom: 0 }` | PropTypes.shape |
| numberOfTicks | 9 | PropTypes.number |
| showGrid | true | PropTypes.bool |
| gridMin | undefined | PropTypes.number |
| gridMax | undefined | PropTypes.number |
| intersections | [ ] | PropTypes.arrayOf(PropTypes.number) |
| renderIntersection | `() => {}` | PropTypes.func |

### LineChart
![Line chart](./screenshots/line-chart.png)

#### Example

```javascript
import { LineChart } from 'react-native-svg-charts'

const foo = () => (
    <LineChart
        style={{ height: 200 }}
        dataPoints={data}
        dashArray={[ 5, 5 ]}
        showPoints={true}
        shadowColor={'rgba(34, 182, 176, 0.2)'}
        contentInset={{ bottom: 10, left: 15, right: 15, top: 10 }}
    />
)
```

#### Props

| Property | Default | Description |
| --- | --- | --- |
| dataPoints | **required** | An array of integers - the data points you want plotted |
| strokeColor | 'black' | PropTypes.string |
| strokeWidth | 1 | PropTypes.number |
| shadowColor | 'black' | PropTypes.string |
| fillColor | 'none' | PropTypes.string |
| dashArray | [ 5, 5] | PropTypes.arrayOf(PropTypes.number) |
| showPoints | true |  PropTypes.bool |
| pointSize | 5 | PropTypes.number |
| animate | true | PropTypes.bool |
| animationDuration | 300 | PropTypes.number |
| style | undefined | PropTypes.any |
| curve | foo | PropTypes.func |
| contentInset | `{ top: 0, left: 0, right: 0, bottom: 0 }` | PropTypes.shape |
| numberOfTicks | 9 | PropTypes.number |
| showGrid | true | PropTypes.bool |
| gridMin | undefined | PropTypes.number |
| gridMax | undefined | PropTypes.number |
| intersections | [ ] | PropTypes.arrayOf(PropTypes.number) |
| renderIntersection | `() => {}` | PropTypes.func |


### PieChart
![Pie chart](./screenshots/pie-chart.png)

#### Example
```javascript
import { PieChart } from 'react-native-svg-charts'

const foo = () => (
    <PieChart
        style={{height: 200}
        dataPoints={[
            {
                key: 'foo',
                color: 'blue',
                value: 40,
            },
            {
                key: 'bar',
                color: 'green',
                value: 60,
            },
        ]}
        innerRadius={0.7}
        labelSpacing={40}
        renderLabel={item => (
            <TouchableOpacity onPress={() => console.log('clicked!', item)}>
                <Image source={Label}/>
            </TouchableOpacity>
        )}
    />
)
```

#### Props

| Property | Default | Description |
| --- | --- | --- |
| dataPoints | **required** | PropTypes.arrayOf(PropTypes.shape({ color: PropTypes.string.isRequired, key: PropTypes.string.isRequired, value: PropTypes.number.isRequired, })).isRequired |
| innerRadius | 0.5 | PropTypes.number |
| padAngle | |  PropTypes.number |
| animate | true |  PropTypes.bool |
| animationDuration | 300 | PropTypes.number |
| style | | PropTypes.any |
| renderLabel | `() => {}` | PropTypes.func |
| labelSpacing | 0 | PropTypes.number |

### ProgressGauge
![Progress gauge](./screenshots/progress-gauge.png)

#### Example
```javascript
import { ProgressCircle } from 'react-native-svg-charts'

const foo = () => (
    <ProgressCircle
        style={{ height: 200 }}
        progress={0.4}
    />
)
```

#### Props

| Property | Default | Description |
| --- | --- | --- |
| progress | **required** | PropTypes.number.isRequired |
| style | | PropTypes.any |
| progressColor | 'black' | PropTypes.any |
| startAngle | `-Math.PI * 0.8` | PropTypes.number |
| endAngle | `Math.PI * 0.8` |  PropTypes.number |
| animate | true | PropTypes.bool |
| animateDuration | 300 | PropTypes.number |

### WaterfallChart
![Waterfall chart](./screenshots/waterfall-chart.png)

#### Example
```javascript
import { WaterfallChart } from 'react-native-svg-charts'

const foo = () => (
    <WaterfallChart
        style={{ height: 200 }}
        dataPoints={[ 0, -10, 50, 30, 60, 70, 30, 30}
        dashArray={[ 3, 5 ]}
    />
)

```

#### Props

| Property | Default | Description |
| --- | --- | --- |
| dataPoints | **required** | dataPoints: PropTypes.arrayOf(PropTypes.shape({ <br> fillColor: PropTypes.string, <br> strokeColor: PropTypes.string, <br> strokeColorNegative: PropTypes.string, <br>fillColorNegative: PropTypes.string, <br>values: PropTypes.arrayOf(PropTypes.number).isRequired, <br>})).isRequired, |
| spacing | 0.05 | PropTypes.number |
| strokeColor | 'black' | PropTypes.string |
| strokeWidth | 1 | PropTypes.number |
| fillColor | 'none' | PropTypes.string |
| renderGradient | `() => {}` | PropTypes.func (see [this](https://github.com/react-native-community/react-native-svg#lineargradient) for more info) |
| animate | true | PropTypes.bool |
| animationDuration | 300 | PropTypes.number |
| style | undefined | PropTypes.any |
| curve | foo | PropTypes.func |
| contentInset | `{ top: 0, left: 0, right: 0, bottom: 0 }` | PropTypes.shape |
| numberOfTicks | 9 | PropTypes.number |
| showGrid | true | PropTypes.bool |
| gridMin | undefined | PropTypes.number |
| gridMax | undefined | PropTypes.number |
| intersections | [ ] | PropTypes.arrayOf(PropTypes.number) |
| renderIntersection | `() => {}` | PropTypes.func |
