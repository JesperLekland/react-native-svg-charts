import React from 'react'
import WaterfallChart from '../../../src/waterfall-chart'
import * as shape from 'd3-shape'

class WaterfallChartExample extends React.PureComponent {

    render() {

        const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]

        return (
            <WaterfallChart
                style={ { height: 200 } }
                dataPoints={ data }
                contentInset={ { top: 20, bottom: 20 } }
                dashArray={ [ 2, 4 ] }
                spacing={ 0.2 }
                curve={ shape.curveCatmullRom }
                { ...this.props }
            />
        )
    }

}

export default WaterfallChartExample
