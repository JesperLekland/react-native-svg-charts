import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { G, Line } from 'react-native-svg'

class Grid extends PureComponent {

    render() {

        const {
                  ticks,
                  y,
                  gridProps,
              } = this.props

        return (
            <G>
                {
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
            </G>
        )
    }
}

Grid.propTypes = {
    y: PropTypes.func.isRequired,
    ticks: PropTypes.array.isRequired,
    gridProps: PropTypes.object,
}

Grid.defaultProps = {
    gridProps: {},
}

export default Grid
