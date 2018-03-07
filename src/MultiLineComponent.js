import React from 'react'
import * as shape from 'd3-shape'
import MultiLineChart from './multiline-chart';

class MultiLineComponent extends React.PureComponent {

    _createPaths = ({ data, x, y }) => {
        const { curve } = this.props

        let path="";
        let lines = [];
        data.map(item => {
          let line = shape.line()
              .x((d) => x(d.x))
              .y(d => y(d.y))
              .defined(item => typeof item.y === 'number')
              .curve(curve)
              (item);
            lines.push(line)
          path+=line
        })

        return {
            path: path,
            line: lines,
            color: this.props.colors
        }
    }

    render() {

        return (
            <MultiLineChart
                createPaths={this._createPaths}
                {...this.props}
            />
        )
    }
}

MultiLineComponent.propTypes = {
    ...MultiLineChart.propTypes,
}

MultiLineComponent.defaultProps = {
    ...MultiLineChart.defaultProps,
}

export default MultiLineComponent;
