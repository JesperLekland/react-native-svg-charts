## Awesome new BarChart (breaking changes)

The BarChart has been rewritten from the ground up. It works the same as before
but have a slightly different expectation on the `data` prop.

As before you can pass in an array of number - nothing weird there.

### Complex objects
But you can also pass in an array of complex objects! These objects can contain any data you want but you must also
pass in a `yAccessor` prop to tell the chart what the actual value for the item is (same as Line/AreaChart).
The entire object will be returned to you as `item` in the `renderDecorator` callback, allowing for nice label rendering.
The BarChart looks for a `svg` property on each entry, allowing you to set custom svg props for each bar (!!!).
The BarChart itself also takes an svg prop that will be passed to all bars (item specific svg properties will not be overriden)

If you use grouped BarChart you

### Horizontal support

`horizontal={true}`, how nice is that!? 😄 Supports both the standard barChart and the grouped one (multiple data sets).

### Extras support

BarChart now has first class support for the extras prop.
Render a clip path or a gradient in a specific bar, up to you!

### Spacing is replaced

We've replaced `spacing` with `spacingInner` and `spacingOuter` to give more control to the user. Same default as before - 0.05
This is true for all places where `spacing` was being used.

## YAxis supports scaleBand

In order to have a nice YAxis along with the horizontal BarChart we have now added support for `scale=d3.scaleBand` to the yAxis.

## PieChart

### Takes `svg` prop

PieChart has been upgraded to take the `svg` prop on each data entry, allowing you to customise your PieChart even further
We've also added the `valueAccessor` prop to allow you to use different dataStructures, not forcing you to name the value "value" and aligning with the other APIs.

### Takes `arc` prop

You can now customize your arcs on an individual level. Want one arc to be bigger than the reset? No problem!

## WaterfallChart is removed

Due to low usage and high maintenance the WaterfallChart is removed.

## Cleaned up README

The README is now more focused on the basic usage of this library. Any cool custom behavior has been moved to the [examples repo](https://github.com/JesperLekland/react-native-svg-charts-examples).
This is the go to place where you want inspiration on how to do cool things with your charts or if you've ever asked yourself "can I do this with react-native-svg-charts?"

We want to make sure that the README is concise and to the point. Here we want to explain the APIs and not much more.
All charts and their APIs will still be documented here, but as an MVP.




