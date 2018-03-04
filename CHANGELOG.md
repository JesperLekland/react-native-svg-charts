### Awesome new BarChart

The BarChart has been rewritten from the ground up. It works the same as before
but have a slightly different expectation on the `data` prop.

As before you can pass in an array of number - nothing weird there.

#### Complex objects
But you can also pass in an array of complex objects! These objects can contain any data you want but you must also
pass in a `yAccessor` prop to tell the chart what the actual value for the item is (same as Line/AreaChart).
The entire object will be returned to you as `item` in the `renderDecorator` callback, allowing for nice label rendering.
The BarChart looks for a `svg` property on each entry, allowing you to set custom svg props for each bar (!!!).
The BarChart itself also takes an svg prop that will be passed to all bars (item specific svg properties will not be overriden)

If you use grouped BarChart you

#### Horizontal support

`horizontal={true}`, how nice is that!? 😄 Supports both the standard barChart and the grouped one (multiple data sets).

### YAxis supports scaleBand

In order to have a nice YAxis along with the horizontal BarChart we have now added support for `scale=d3.scaleBand` to the yAxis.
