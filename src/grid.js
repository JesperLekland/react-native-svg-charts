import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { G, Line } from 'react-native-svg'

class Grid extends PureComponent {

    render() {

        const {
                  ticks,
                  y,
                  x,
                  values,
                  gridProps,
                  gridDirection: direction,
              } = this.props

        return (
            <G>
                {
                    (direction === Grid.Direction.Horizontal || direction === Grid.Direction.Both) &&
                    ticks.map(tick => (
                        <Line
                            key={ tick }
                            x1={ '0%' }
                            x2={ '100%' }
                            y1={ y(tick) }
                            y2={ y(tick) }
                            strokeWidth={ 1 }
                            stroke={ 'rgba(0,0,0,0.2)' }
                            { ...gridProps }
                        />
                    ))
                }
                {
                    (direction === Grid.Direction.Vertical || direction === Grid.Direction.Both) &&
                    values && values.map((_, index) => (
                        <Line
                            key={ index }
                            y1={ y(ticks[ 0 ]) }
                            y2={ y(ticks[ ticks.length - 1 ]) }
                            x1={ x(index) }
                            x2={ x(index) }
                            strokeWidth={ 1 }
                            stroke={ 'rgba(0,0,0,0.2)' }
                            { ...gridProps }
                        />
                    ))
                }
            </G>
        )
    }
}

Grid.Direction = {
    Vertical: 'vertical',
    Horizontal: 'horizontal',
    Both: 'both',
}

Grid.propTypes = {
    y: PropTypes.func.isRequired,
    ticks: PropTypes.array.isRequired,
    gridProps: PropTypes.object,
    gridDirection: PropTypes.oneOf([ Grid.Direction.Horizontal, Grid.Direction.Vertical, Grid.Direction.Both ]),
}

Grid.defaultProps = {
    gridProps: {},
}

export default Grid
