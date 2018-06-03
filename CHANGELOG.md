5.x.0

* Added `cornerRadius` to progressCircle
* Adhere to `Svg` api with `height` and `width` instead of `flex: 1`
* StackedBarChart now supports `svg` prop for each data entry! Allowing onPress among other things.
* StackedAreaChart now supports `svg` prop for each area! Allowing onPress among other things
    * The two above changes does remove the other "svg" props from the charts, for example `renderGradient`
    that is now replaces with the same gradient API as the other charts (i.e children).
* PieChart supports `(start|end)Angle`



