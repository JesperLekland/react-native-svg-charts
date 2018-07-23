import React from 'react'
import { StackedBarChart, Grid } from 'react-native-svg-charts'

class StackedBarChartExample extends React.PureComponent {
    render() {
        const data = [
            {
                data: [
                    {
                        month: new Date(2015, 0, 1),
                        apples: 3840,
                        bananas: 1920,
                        cherries: 960,
                        dates: 1240,
                        oranges: 4780,
                    },
                    {
                        month: new Date(2015, 1, 1),
                        apples: 1600,
                        bananas: 1440,
                        cherries: 960,
                        dates: 3240,
                        oranges: 3300,
                    },
                    {
                        month: new Date(2015, 2, 1),
                        apples: 640,
                        bananas: 960,
                        cherries: 3640,
                        dates: 1900,
                        oranges: 800,
                    },
                    {
                        month: new Date(2015, 3, 1),
                        apples: 3320,
                        bananas: 480,
                        cherries: 640,
                        dates: 650,
                        oranges: 2000,
                    }],
            },
            {
                data: [
                    {
                        month: new Date(2015, 0, 1),
                        apples: 3840,
                        bananas: 1920,
                        cherries: 960,
                        dates: 1240,
                        oranges: 4780,
                    },
                    {
                        month: new Date(2015, 1, 1),
                        apples: 1600,
                        bananas: 1440,
                        cherries: 960,
                        dates: 3240,
                        oranges: 3300,
                    },
                    {
                        month: new Date(2015, 2, 1),
                        apples: 640,
                        bananas: 960,
                        cherries: 3640,
                        dates: 1900,
                        oranges: 800,
                    },
                    {
                        month: new Date(2015, 3, 1),
                        apples: 3320,
                        bananas: 480,
                        cherries: 640,
                        dates: 650,
                        oranges: 2000,
                    }],
            },
            {
                data: [
                    {
                        month: new Date(2015, 0, 1),
                        apples: 3840,
                        bananas: 1920,
                        cherries: 960,
                        dates: 1240,
                        oranges: 4780,
                    },
                    {
                        month: new Date(2015, 1, 1),
                        apples: 1600,
                        bananas: 1440,
                        cherries: 960,
                        dates: 3240,
                        oranges: 3300,
                    },
                    {
                        month: new Date(2015, 2, 1),
                        apples: 640,
                        bananas: 960,
                        cherries: 3640,
                        dates: 1900,
                        oranges: 800,
                    },
                    {
                        month: new Date(2015, 3, 1),
                        apples: 3320,
                        bananas: 480,
                        cherries: 640,
                        dates: 650,
                        oranges: 2000,
                    }],
            },
        ]

        const colors = [[ '#8800cc', '#aa00ff', '#dd99ff' ], [ '#cc66ff' ], [ '#eeccff' ]]
        const keys = [[ 'apples', 'cherries', 'bananas' ], [ 'dates' ], [ 'oranges' ]]

        return (
            <StackedBarChart
                style={{ height: 200 }}
                keys={ keys }
                colors={ colors }
                data={ data }
                showGrid={ false }
                contentInset={{ top: 30, bottom: 30 }}
                horizontal
            >
                <Grid direction={ Grid.Direction.VERTICAL } />
            </StackedBarChart >
        )
    }
}

export default StackedBarChartExample
