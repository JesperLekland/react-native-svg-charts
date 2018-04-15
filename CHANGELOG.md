
Version 5.0 is a major overhaul to the "decorator" and "extras" pattern.
We've simplified the API, made it declarative and added support for
rendering order.

All charts and axes now support React children. Meaning that your decorators
and extras should now be placed as direct children to the chart in question.
This is a breaking change but a very easy one to migrate (I migrated all storybooks in a matter of minutes),
see the [examples repo](https://github.com/JesperLekland/react-native-svg-charts-examples)
and read the [docs](https://github.com/JesperLekland/react-native-svg-charts#react-native-svg-charts) for inspiration.

I want to thank everyone who is contributing by submitting issues and joining
in on discussions. A special thanks to @narciero, @Sprit3Dan and @RoarRain for
contributing with PRs.

## Breaking Changes
* **Extras and Decorators have been removed**

    Extras and decorators should now be passed in as children to the chart in question.
    Each child will be called with similar arguments as before. See
    [README](https://github.com/JesperLekland/react-native-svg-charts#react-native-svg-charts)
    for more info.

    Migrating an extra is as simple as just moving it from the `extras` array to a child of the chart.
    The `decorators` are nearly as easy to migrate. Create a wrapper component around
    your decorator that accepts the `data` prop, now you yourself can map this array and return as many decorators as you want.


* **renderGrid and gridProps have been removed**

    A grid show now be rendered through as a child. We still expose a default `Grid`
    component as part of the API but this must no manually be added to all charts that want to display a grid.

    As a result of this the following props are deprecated:
    * `showGrid`
    * `gridProps`
    * `renderGrid`


* **Grids are consolidate into one**

    Before we hade `Grid.Vertical`,`Grid.Horizontal` and `Grid.Both`,
    now we simply have `Grid` with a `direction` property. See [README](https://github.com/JesperLekland/react-native-svg-charts#react-native-svg-charts)
    for more info


