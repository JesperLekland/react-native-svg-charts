# v.3.0.0

## Breaking changes

### XAxis & YAxis

* Axes are now rendered with `react-native-svg`'s [Text](https://github.com/react-native-community/react-native-svg#text), 
    allowing for better alignment and a more streamligned api.
* `svg` prop added to customize each `<Text>`
* `values`/`dataPoints` renamed to `data` to better reflect rest of component api (supports complex data)
* (XAxis) `xAccessor` prop added to extract correct value from `data` array
* (YAxis) `yAccessor` prop added to extract correct value from `data` array
* `scale` prop added to customize scale of axis

### `renderExtra` is removed
Seeing how `renderExtra` was almost always used to just call 
the function that was passed in as `extras` we decided to remove this step 
and simply call the `extra` entry as a function directly, passing in the same props as before

In order to allow for the above change each entry in `extras`
must now be a function that renders a component. See documentation for examples

### LineChart

* `dataPoints` is now `data`
* `data` supports complex data structures
* `xAccessor` and `yAccessor` added to support extraction of values from complex data structure
* `xScale` and `yScale` prop added to allow for custom scales
* `renderExtra` is removed - See above
* `extra` now passes `line` as an extra argument property. This is the line svg path
    and can be used to render e.g line shadows.
* no longer renders a shadow by default. Use `extras` instead
* `renderGradient` is removed and can now be rendered via `extra`. See documentation for example
* `shadowSvg` and `shadowOffset` is now removed. Render your own shadow using `renderExtra

### AreaChart
* `dataPoints` is now `data`
* `data` supports complex data structures
* `xAccessor` and `yAccessor` added to support extraction of values from complex data structure
* `xScale` and `yScale` prop added to allow for custom scales
* `renderExtra` is removed - See above
* `extra` now passes `area` and `line` as extra argument property. 
    This is the area svg path as well as the path of line that follows the area's upper bound. See docs for example usage
* `renderGradient` is removed and can now be rendered via `extra`. See documentation for example
* no longer renders "top" line, use `extras` for this (see docs for example)

### WaterfallChart
* deprecated - will be removed in future versions (due to low usage poor maintenance)
 
### `animate` default is now `false`
We figured opt-in is better than opt-out considering how poorly the animations are working at the moment

## Comments

Due to the inherent nature of a bar chart consisting of many areas the `BarChart` component has not yet been migrated to the new APIs  
