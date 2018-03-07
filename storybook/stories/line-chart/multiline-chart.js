import React from 'react'
import { MultiLineChart } from 'react-native-svg-charts'

class MultiLine extends React.PureComponent {

    render() {

      const data = [
        [20,50,30],
        [40,10,60],
        [10,80, 0]
      ],
      colors = ["red", "green", "blue"];

        return (
          <MultiLineChart
              style={{
                height: 320,
              }}
              data={ data }
              colors={colors}
          />
        )
    }

}

export default MultiLine;
