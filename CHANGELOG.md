# 5.3.0

### Contributions

-   update README ([@andrewdazs](https://github.com/andrewdazs) and [@iammosespaulr](https://github.com/iammosespaulr))
-   fix crash in Axis component ([@krzysztof-miemiec](https://github.com/krzysztof-miemiec) - [#238](https://github.com/JesperLekland/react-native-svg-charts/pull/238))
-   Introduce grouped LineChart ([@alburdette619](https://github.com/alburdette619) - [#240](https://github.com/JesperLekland/react-native-svg-charts/pull/240))
-   Introduce grouped StackedBarChart ([@alburdette619](https://github.com/alburdette619) - #239)
-   Fix 'transparent' color for X-Axis and Y-Axis in RN 0.57 ([@denieler](https://github.com/denieler) - #256)
-   Added extra props to axis children ([@alburdette619](https://github.com/alburdette619) - #276)
-   Create interaction handle during animation ([@Jyrno42](https://github.com/Jyrno42) - #314)
-   Stacked Area Chart: Pass `areas` down to children ([@attitude](https://github.com/attitude) - #316)
-   Added more props to axis children ([@buschco](https://github.com/buschco) - #326)
-   Fix blinking animation ([@andycloke](https://github.com/andycloke) - #329)
-   Fix YAxis using Unnecessary max/min value before definition ([@saji-ryu](https://github.com/saji-ryu) - #354)
-   prevent crash on undefined data ([@usrbowe](https://github.com/usrbowe) - #355)

*   remove eslint formatting in favor of prettier (easier to contribute)
*   remove circleci checks as they didn't add any value (easier to contribute)

# 5.2.0

-   Add `x(Min|Max)` and `y(Min|Max)`
-   Add `clamp(X|Y)` to use in conjunction with above props (default `false`)
-   Add xScale to StackedAreaChart along with (x|y)Accessor
